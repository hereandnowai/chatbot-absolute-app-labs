"""
HubSpot CRM Integration
Handles contact search, create, and update operations with retry logic
"""
import os
import time
import requests
from typing import Dict, Optional, Tuple
from config import HUBSPOT_API_KEY


class HubSpotClient:
    """Client for HubSpot CRM API operations"""
    
    BASE_URL = "https://api.hubapi.com"
    
    def __init__(self, api_key: str = None):
        """Initialize HubSpot client"""
        self.api_key = api_key or HUBSPOT_API_KEY
        if not self.api_key:
            raise ValueError("HubSpot API key is required")
        
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def search_contact_by_email(self, email: str) -> Optional[Dict]:
        """Search for contact by email"""
        url = f"{self.BASE_URL}/crm/v3/objects/contacts/search"
        
        payload = {
            "filterGroups": [{
                "filters": [{
                    "propertyName": "email",
                    "operator": "EQ",
                    "value": email
                }]
            }]
        }
        
        try:
            response = requests.post(url, json=payload, headers=self.headers, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if data.get("results"):
                return data["results"][0]
            return None
        
        except requests.exceptions.RequestException as e:
            print(f"Error searching contact by email: {e}")
            return None
    
    def search_contact_by_phone(self, phone: str) -> Optional[Dict]:
        """Search for contact by phone number"""
        url = f"{self.BASE_URL}/crm/v3/objects/contacts/search"
        
        payload = {
            "filterGroups": [{
                "filters": [{
                    "propertyName": "phone",
                    "operator": "EQ",
                    "value": phone
                }]
            }]
        }
        
        try:
            response = requests.post(url, json=payload, headers=self.headers, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if data.get("results"):
                return data["results"][0]
            return None
        
        except requests.exceptions.RequestException as e:
            print(f"Error searching contact by phone: {e}")
            return None
    
    def create_contact(self, contact_data: Dict) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Create a new contact in HubSpot
        
        Returns:
            Tuple of (success, contact_id, error_message)
        """
        url = f"{self.BASE_URL}/crm/v3/objects/contacts"
        
        payload = {
            "properties": contact_data
        }
        
        return self._make_request_with_retry("POST", url, payload)
    
    def update_contact(self, contact_id: str, contact_data: Dict) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Update an existing contact in HubSpot
        
        Returns:
            Tuple of (success, contact_id, error_message)
        """
        url = f"{self.BASE_URL}/crm/v3/objects/contacts/{contact_id}"
        
        payload = {
            "properties": contact_data
        }
        
        return self._make_request_with_retry("PATCH", url, payload)
    
    def _make_request_with_retry(
        self, 
        method: str, 
        url: str, 
        payload: Dict,
        max_retries: int = 3
    ) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Make API request with exponential backoff retry logic
        
        Returns:
            Tuple of (success, contact_id, error_message)
        """
        retry_delay = 1  # Start with 1 second
        
        for attempt in range(max_retries):
            try:
                if method == "POST":
                    response = requests.post(url, json=payload, headers=self.headers, timeout=10)
                elif method == "PATCH":
                    response = requests.patch(url, json=payload, headers=self.headers, timeout=10)
                else:
                    return False, None, f"Unsupported method: {method}"
                
                # Handle rate limiting (429)
                if response.status_code == 429:
                    if attempt < max_retries - 1:
                        print(f"Rate limited. Retrying in {retry_delay}s...")
                        time.sleep(retry_delay)
                        retry_delay *= 2  # Exponential backoff
                        continue
                    else:
                        return False, None, "Rate limit exceeded after retries"
                
                response.raise_for_status()
                data = response.json()
                contact_id = data.get("id")
                
                return True, contact_id, None
            
            except requests.exceptions.HTTPError as e:
                error_msg = f"HTTP error: {e}"
                if attempt < max_retries - 1 and response.status_code >= 500:
                    # Retry on server errors
                    print(f"Server error. Retrying in {retry_delay}s...")
                    time.sleep(retry_delay)
                    retry_delay *= 2
                    continue
                return False, None, error_msg
            
            except requests.exceptions.RequestException as e:
                return False, None, f"Request error: {e}"
        
        return False, None, "Max retries exceeded"
    
    def upsert_lead(
        self, 
        name: str,
        email: str,
        phone: str,
        project_goal: str,
        product_type: str = None
    ) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Create or update a lead contact in HubSpot
        
        Search by email first, then phone. Update if found, create if not.
        
        Returns:
            Tuple of (success, contact_id, error_message)
        """
        # Prepare contact properties
        properties = {
            "firstname": name,
            "email": email,
            "phone": phone,
            "project_goal": project_goal,
            "lifecyclestage": "lead"
        }
        
        if product_type:
            properties["product_interest"] = product_type
        
        # Search by email first
        existing_contact = self.search_contact_by_email(email)
        
        if existing_contact:
            contact_id = existing_contact["id"]
            print(f"Found existing contact by email: {contact_id}")
            success, updated_id, error = self.update_contact(contact_id, properties)
            return success, updated_id or contact_id, error
        
        # Search by phone if not found by email
        existing_contact = self.search_contact_by_phone(phone)
        
        if existing_contact:
            contact_id = existing_contact["id"]
            print(f"Found existing contact by phone: {contact_id}")
            success, updated_id, error = self.update_contact(contact_id, properties)
            return success, updated_id or contact_id, error
        
        # Create new contact if not found
        print("Creating new contact in HubSpot")
        return self.create_contact(properties)


# Initialize global HubSpot client
try:
    hubspot_client = HubSpotClient()
    print("✓ HubSpot client initialized")
except ValueError as e:
    print(f"⚠️  HubSpot client not initialized: {e}")
    hubspot_client = None
