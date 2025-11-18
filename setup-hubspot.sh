#!/bin/bash

# HubSpot Configuration Setup Script
# This script helps you configure your HubSpot API credentials

echo "🔧 HubSpot Configuration Setup for Absolute App Labs Chatbot"
echo "============================================================"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Creating one..."
    touch .env
fi

echo "Please choose your HubSpot authentication method:"
echo "1) Private App Token (Recommended - More secure)"
echo "2) API Key (Legacy method)"
echo ""
read -p "Enter your choice (1 or 2): " choice

echo ""
if [ "$choice" = "1" ]; then
    echo "📝 Private App Token Setup"
    echo "-------------------------"
    echo "Your token should look like: pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    echo ""
    read -p "Paste your Private App Token: " token
    
    # Update or add HUBSPOT_API_KEY in .env
    if grep -q "HUBSPOT_API_KEY" .env; then
        # On macOS, use different syntax for sed
        sed -i '' "s/HUBSPOT_API_KEY=.*/HUBSPOT_API_KEY=$token/" .env
        echo "✅ Updated HUBSPOT_API_KEY in .env file"
    else
        echo "HUBSPOT_API_KEY=$token" >> .env
        echo "✅ Added HUBSPOT_API_KEY to .env file"
    fi
    
elif [ "$choice" = "2" ]; then
    echo "📝 API Key Setup"
    echo "---------------"
    echo "Your API key should look like: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    echo ""
    read -p "Paste your API Key: " apikey
    
    # Update or add HUBSPOT_API_KEY in .env
    if grep -q "HUBSPOT_API_KEY" .env; then
        sed -i '' "s/HUBSPOT_API_KEY=.*/HUBSPOT_API_KEY=$apikey/" .env
        echo "✅ Updated HUBSPOT_API_KEY in .env file"
    else
        echo "HUBSPOT_API_KEY=$apikey" >> .env
        echo "✅ Added HUBSPOT_API_KEY to .env file"
    fi
else
    echo "❌ Invalid choice. Please run the script again."
    exit 1
fi

echo ""
echo "✅ Configuration complete!"
echo ""
echo "Next steps:"
echo "1. Restart your backend server:"
echo "   cd /Users/hnai/Downloads/absolute-app-labs"
echo "   lsof -ti:8000 | xargs kill -9"
echo "   python3 backend/main.py > /tmp/backend.log 2>&1 &"
echo ""
echo "2. Test the integration by submitting a lead through the chatbot"
echo ""
echo "3. Check HubSpot Contacts to verify the lead was created:"
echo "   https://app.hubspot.com/contacts/"
echo ""
