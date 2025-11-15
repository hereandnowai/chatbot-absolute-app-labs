#!/usr/bin/env python3
"""
Script to download all assets from the Absolute App Labs website
"""
import os
import re
import urllib.request
import urllib.parse
from pathlib import Path
from html.parser import HTMLParser

class AssetExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = set()
    
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Extract CSS files
        if tag == 'link' and attrs_dict.get('rel') in ['stylesheet', 'icon', 'apple-touch-icon']:
            if 'href' in attrs_dict:
                self.assets.add(attrs_dict['href'])
        
        # Extract JavaScript files
        if tag == 'script' and 'src' in attrs_dict:
            self.assets.add(attrs_dict['src'])
        
        # Extract images
        if tag == 'img' and 'src' in attrs_dict:
            self.assets.add(attrs_dict['src'])
        
        # Extract background images from inline styles
        if 'style' in attrs_dict:
            style = attrs_dict['style']
            urls = re.findall(r'url\(["\']?([^"\']+)["\']?\)', style)
            self.assets.update(urls)

def download_file(url, output_path):
    """Download a file from URL to output_path"""
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Download file
        urllib.request.urlretrieve(url, output_path)
        print(f"✓ Downloaded: {url}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {url}: {e}")
        return False

def process_url(url, base_url='https://absoluteapplabs.com'):
    """Convert relative URLs to absolute URLs"""
    if url.startswith('http'):
        return url
    elif url.startswith('//'):
        return 'https:' + url
    elif url.startswith('/'):
        return base_url + url
    else:
        return base_url + '/' + url

def main():
    script_dir = Path(__file__).parent
    html_file = script_dir / 'original' / 'index.html'
    output_dir = script_dir / 'original'
    
    print("Reading HTML file...")
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    print("Extracting asset URLs...")
    parser = AssetExtractor()
    parser.feed(html_content)
    
    print(f"Found {len(parser.assets)} unique assets")
    
    # Download each asset
    for asset_url in parser.assets:
        full_url = process_url(asset_url)
        
        # Parse URL to get path
        parsed = urllib.parse.urlparse(full_url)
        path = parsed.path.lstrip('/')
        
        # Skip external CDN files we want to keep as CDN
        if any(cdn in full_url for cdn in ['googleapis.com', 'cloudflare.com', 'bootstrapcdn.com', 'jsdelivr.net', 'unpkg.com']):
            print(f"Skipping CDN: {full_url}")
            continue
        
        # Create local path
        local_path = output_dir / path
        
        # Download
        download_file(full_url, str(local_path))
    
    print("\nDownload complete!")

if __name__ == '__main__':
    main()
