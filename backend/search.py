"""
Google Custom Search integration for query augmentation
"""
import requests
from typing import List, Dict, Optional
from cachetools import TTLCache
from config import GOOGLE_API_KEY, GOOGLE_CSE_ID

# Cache search results for 30 minutes
search_cache = TTLCache(maxsize=100, ttl=1800)

def google_search(query: str, num_results: int = 5) -> List[Dict[str, str]]:
    """
    Perform Google Custom Search and return top results
    
    Args:
        query: Search query string
        num_results: Number of results to return (max 10)
    
    Returns:
        List of dicts with keys: title, snippet, link
    """
    # Check cache first
    cache_key = f"{query}:{num_results}"
    if cache_key in search_cache:
        return search_cache[cache_key]
    
    if not GOOGLE_CSE_ID:
        # Return empty if CSE not configured
        return []
    
    try:
        url = "https://www.googleapis.com/customsearch/v1"
        params = {
            "q": query,
            "key": GOOGLE_API_KEY,
            "cx": GOOGLE_CSE_ID,
            "num": min(num_results, 10)
        }
        
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        results = []
        for item in data.get("items", []):
            results.append({
                "title": item.get("title", ""),
                "snippet": item.get("snippet", ""),
                "link": item.get("link", "")
            })
        
        # Cache results
        search_cache[cache_key] = results
        return results
    
    except Exception as e:
        print(f"Error performing Google search: {e}")
        return []

def format_search_context(results: List[Dict[str, str]]) -> str:
    """
    Format search results into a concise context string
    
    Args:
        results: List of search results
    
    Returns:
        Formatted context string
    """
    if not results:
        return ""
    
    context_parts = ["Here are some relevant web search results:\n"]
    for i, result in enumerate(results, 1):
        context_parts.append(
            f"{i}. {result['title']}\n"
            f"   {result['snippet']}\n"
            f"   Source: {result['link']}\n"
        )
    
    return "\n".join(context_parts)
