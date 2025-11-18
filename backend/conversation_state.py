"""
Conversation State Management for Lead Collection Flow
Tracks product selection, lead capture progress, and conversation stage
"""
from typing import Dict, Optional, List
from enum import Enum
import re


class ConversationStage(str, Enum):
    """Stages in the conversation flow"""
    INITIAL = "initial"  # Show product bubbles
    PRODUCT_SELECTED = "product_selected"  # Product chosen, ask for details
    COLLECTING_NAME = "collecting_name"
    COLLECTING_PHONE = "collecting_phone"
    COLLECTING_EMAIL = "collecting_email"
    COLLECTING_PROJECT_GOAL = "collecting_project_goal"
    LEAD_COMPLETE = "lead_complete"  # All info collected, ready for HubSpot
    GENERAL_QA = "general_qa"  # Normal Q&A mode


class ConversationState:
    """Manages conversation state and lead collection progress"""
    
    # Product/Service options
    PRODUCTS = [
        {"id": "mobile_app", "label": "Mobile App Development"},
        {"id": "web_app", "label": "Web App Development"},
        {"id": "mvp", "label": "MVP Development"},
        {"id": "ecommerce", "label": "E-Commerce App"},
        {"id": "ai_integration", "label": "AI Integration"},
        {"id": "other", "label": "Other Services"}
    ]
    
    def __init__(self, session_data: Dict = None):
        """Initialize conversation state from session data"""
        self.data = session_data or {}
        
        # Core state fields
        self.stage = self.data.get("stage", ConversationStage.INITIAL)
        self.product_type = self.data.get("product_type")
        self.name = self.data.get("name")
        self.whatsapp_number = self.data.get("whatsapp_number")
        self.email = self.data.get("email")
        self.project_goal = self.data.get("project_goal")
        
        # Metadata
        self.attempts = self.data.get("attempts", {})  # Track validation attempts
        self.hubspot_contact_id = self.data.get("hubspot_contact_id")
    
    def to_dict(self) -> Dict:
        """Convert state to dictionary for storage"""
        return {
            "stage": self.stage,
            "product_type": self.product_type,
            "name": self.name,
            "whatsapp_number": self.whatsapp_number,
            "email": self.email,
            "project_goal": self.project_goal,
            "attempts": self.attempts,
            "hubspot_contact_id": self.hubspot_contact_id
        }
    
    def update(self, **kwargs):
        """Update state fields"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
    
    def is_lead_complete(self) -> bool:
        """Check if all required lead fields are collected"""
        return all([
            self.name,
            self.whatsapp_number,
            self.email,
            self.project_goal
        ])
    
    def get_next_missing_field(self) -> Optional[str]:
        """Get the next field to collect in the lead capture flow"""
        if not self.name:
            return "name"
        if not self.whatsapp_number:
            return "whatsapp_number"
        if not self.email:
            return "email"
        if not self.project_goal:
            return "project_goal"
        return None
    
    def advance_to_next_stage(self):
        """Move to the next stage in the conversation flow"""
        if self.stage == ConversationStage.INITIAL:
            if self.product_type:
                self.stage = ConversationStage.PRODUCT_SELECTED
        
        elif self.stage == ConversationStage.PRODUCT_SELECTED:
            # After product selection, start lead capture
            self.stage = ConversationStage.COLLECTING_NAME
        
        elif self.stage == ConversationStage.COLLECTING_NAME:
            if self.name:
                self.stage = ConversationStage.COLLECTING_PHONE
        
        elif self.stage == ConversationStage.COLLECTING_PHONE:
            if self.whatsapp_number:
                self.stage = ConversationStage.COLLECTING_EMAIL
        
        elif self.stage == ConversationStage.COLLECTING_EMAIL:
            if self.email:
                self.stage = ConversationStage.COLLECTING_PROJECT_GOAL
        
        elif self.stage == ConversationStage.COLLECTING_PROJECT_GOAL:
            if self.project_goal:
                self.stage = ConversationStage.LEAD_COMPLETE
    
    @staticmethod
    def validate_phone(phone: str) -> bool:
        """Validate phone number format (supports international)"""
        # Remove common separators
        phone_clean = re.sub(r'[\s\-\(\)]+', '', phone)
        
        # Check if it's a valid format (10-15 digits, optional +)
        pattern = r'^\+?[1-9]\d{9,14}$'
        return bool(re.match(pattern, phone_clean))
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))
    
    @staticmethod
    def clean_phone(phone: str) -> str:
        """Clean phone number for storage"""
        # Remove spaces, dashes, parentheses
        return re.sub(r'[\s\-\(\)]+', '', phone)
    
    def get_product_bubbles(self) -> List[Dict]:
        """Get product selection bubbles as quick replies"""
        return self.PRODUCTS
    
    def increment_attempt(self, field: str):
        """Track validation attempts for a field"""
        if field not in self.attempts:
            self.attempts[field] = 0
        self.attempts[field] += 1
    
    def should_show_product_bubbles(self) -> bool:
        """Check if we should show product bubbles"""
        return self.stage == ConversationStage.INITIAL and not self.product_type
    
    def should_collect_lead(self) -> bool:
        """Check if we're in lead collection mode"""
        return self.stage in [
            ConversationStage.COLLECTING_NAME,
            ConversationStage.COLLECTING_PHONE,
            ConversationStage.COLLECTING_EMAIL,
            ConversationStage.COLLECTING_PROJECT_GOAL
        ]
