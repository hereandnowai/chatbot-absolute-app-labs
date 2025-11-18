"""
Lead Collection Orchestrator
Manages the structured lead collection flow with product selection and HubSpot integration
"""
from typing import Dict, List, Optional, Tuple
from conversation_state import ConversationState, ConversationStage
from hubspot_integration import hubspot_client
import re


class LeadCollector:
    """Orchestrates the lead collection conversation flow"""
    
    def __init__(self, state: ConversationState):
        """Initialize lead collector with conversation state"""
        self.state = state
    
    def process_message(
        self, 
        user_message: str
    ) -> Tuple[str, List[Dict], List[Dict]]:
        """
        Process user message and return structured response
        
        Returns:
            Tuple of (response_text, quick_replies, actions)
        """
        quick_replies = []
        actions = []
        
        # Handle product selection FIRST (before showing bubbles again)
        if self.state.stage == ConversationStage.INITIAL and not self.state.product_type:
            # Check if message matches a product
            product_id = self._extract_product_selection(user_message)
            if product_id:
                self.state.update(product_type=product_id)
                self.state.advance_to_next_stage()
                
                product_name = self._get_product_name(product_id)
                text = (f"Great choice! {product_name} is one of our specialties. "
                       "What kind of app or solution are you planning to build?")
                return text, quick_replies, actions
        
        # Check if we should show product bubbles (no product selected yet)
        if self.state.should_show_product_bubbles():
            text = ("👋 Welcome to Absolute App Labs! We build intelligent products "
                   "that scale. What are you looking to build?")
            quick_replies = self.state.get_product_bubbles()
            return text, quick_replies, actions
        
        # Handle product-selected stage
        if self.state.stage == ConversationStage.PRODUCT_SELECTED:
            # Extract project goal from message
            if user_message and len(user_message) > 10:
                self.state.update(project_goal=user_message)
            
            self.state.advance_to_next_stage()
            
            # Start lead capture
            text = ("Perfect! To provide you with a tailored solution and connect you "
                   "with the right expert, I need a few details.\n\n"
                   "First, what's your name?")
            return text, quick_replies, actions
        
        # Lead collection flow
        if self.state.should_collect_lead():
            return self._handle_lead_collection(user_message)
        
        # Lead complete - send to HubSpot
        if self.state.stage == ConversationStage.LEAD_COMPLETE:
            return self._handle_hubspot_submission()
        
        # Default: allow general Q&A
        return None, quick_replies, actions
    
    def _handle_lead_collection(
        self, 
        user_message: str
    ) -> Tuple[str, List[Dict], List[Dict]]:
        """Handle step-by-step lead information collection"""
        quick_replies = []
        actions = []
        
        # Collecting name
        if self.state.stage == ConversationStage.COLLECTING_NAME:
            if self._is_valid_name(user_message):
                self.state.update(name=user_message.strip())
                self.state.advance_to_next_stage()
                
                text = (f"Nice to meet you, {self.state.name}! 👋\n\n"
                       "What's your WhatsApp number? (so we can reach you easily)")
                return text, quick_replies, actions
            else:
                self.state.increment_attempt("name")
                text = "Please provide your full name so we can personalize your experience."
                return text, quick_replies, actions
        
        # Collecting phone
        if self.state.stage == ConversationStage.COLLECTING_PHONE:
            if ConversationState.validate_phone(user_message):
                clean_phone = ConversationState.clean_phone(user_message)
                self.state.update(whatsapp_number=clean_phone)
                self.state.advance_to_next_stage()
                
                text = "Great! What's your email address?"
                return text, quick_replies, actions
            else:
                self.state.increment_attempt("whatsapp_number")
                if self.state.attempts.get("whatsapp_number", 0) > 1:
                    text = ("Please provide a valid phone number (e.g., +91 98765 43210 or "
                           "9876543210). We need this to connect you with our team.")
                else:
                    text = "Please provide a valid phone number."
                return text, quick_replies, actions
        
        # Collecting email
        if self.state.stage == ConversationStage.COLLECTING_EMAIL:
            if ConversationState.validate_email(user_message):
                self.state.update(email=user_message.strip().lower())
                self.state.advance_to_next_stage()
                
                # If we don't have project goal yet, ask for it
                if not self.state.project_goal:
                    text = ("Perfect! One last thing - can you briefly describe your "
                           "project or what you're trying to build?")
                    return text, quick_replies, actions
                else:
                    # We have everything, move to completion
                    self.state.stage = ConversationStage.LEAD_COMPLETE
                    return self._handle_hubspot_submission()
            else:
                self.state.increment_attempt("email")
                if self.state.attempts.get("email", 0) > 1:
                    text = ("Please provide a valid email address (e.g., name@company.com). "
                           "We'll use this to send you project details.")
                else:
                    text = "Please provide a valid email address."
                return text, quick_replies, actions
        
        # Collecting project goal (if still needed)
        if self.state.stage == ConversationStage.COLLECTING_PROJECT_GOAL:
            if user_message and len(user_message) > 10:
                self.state.update(project_goal=user_message)
                self.state.stage = ConversationStage.LEAD_COMPLETE
                return self._handle_hubspot_submission()
            else:
                text = "Please tell us a bit more about your project requirements."
                return text, quick_replies, actions
        
        return None, quick_replies, actions
    
    def _handle_hubspot_submission(self) -> Tuple[str, List[Dict], List[Dict]]:
        """Submit lead to HubSpot CRM"""
        actions = []
        quick_replies = []
        
        if not hubspot_client:
            # HubSpot not configured
            actions.append({
                "type": "hubspot_upsert",
                "status": "error",
                "message": "HubSpot integration not configured"
            })
            
            text = (f"Thank you, {self.state.name}! 🎉\n\n"
                   f"We've received your information:\n"
                   f"📧 {self.state.email}\n"
                   f"📱 {self.state.whatsapp_number}\n"
                   f"💡 Project: {self.state.project_goal}\n\n"
                   "Our team will reach out to you within 24 hours to discuss your project!")
        else:
            # Submit to HubSpot
            success, contact_id, error = hubspot_client.upsert_lead(
                name=self.state.name,
                email=self.state.email,
                phone=self.state.whatsapp_number,
                project_goal=self.state.project_goal,
                product_type=self.state.product_type
            )
            
            if success:
                self.state.update(hubspot_contact_id=contact_id)
                actions.append({
                    "type": "hubspot_upsert",
                    "status": "success",
                    "contact_id": contact_id
                })
                
                text = (f"Thank you, {self.state.name}! 🎉\n\n"
                       f"We've saved your information and our team will reach out "
                       f"to you within 24 hours via WhatsApp ({self.state.whatsapp_number}) "
                       f"or email ({self.state.email}).\n\n"
                       f"Is there anything else you'd like to know about Absolute App Labs?")
                
                # Move to general Q&A mode
                self.state.stage = ConversationStage.GENERAL_QA
            else:
                actions.append({
                    "type": "hubspot_upsert",
                    "status": "error",
                    "message": error
                })
                
                text = (f"Thank you, {self.state.name}! We've received your information. "
                       f"Our team will reach out shortly. "
                       f"\n\nIs there anything else you'd like to know?")
                
                # Still move to Q&A even if HubSpot fails
                self.state.stage = ConversationStage.GENERAL_QA
        
        return text, quick_replies, actions
    
    def _extract_product_selection(self, message: str) -> Optional[str]:
        """Extract product selection from user message"""
        message_lower = message.lower()
        
        # Check for exact bubble matches first
        for product in ConversationState.PRODUCTS:
            if product["id"] in message_lower or product["label"].lower() in message_lower:
                return product["id"]
        
        # Check for keywords
        if any(word in message_lower for word in ["mobile", "android", "ios", "app"]):
            return "mobile_app"
        if any(word in message_lower for word in ["web", "website", "webapp"]):
            return "web_app"
        if "mvp" in message_lower or "minimum viable" in message_lower:
            return "mvp"
        if "ecommerce" in message_lower or "e-commerce" in message_lower or "shop" in message_lower:
            return "ecommerce"
        if "ai" in message_lower or "artificial intelligence" in message_lower:
            return "ai_integration"
        
        return None
    
    def _get_product_name(self, product_id: str) -> str:
        """Get product display name from ID"""
        for product in ConversationState.PRODUCTS:
            if product["id"] == product_id:
                return product["label"]
        return "This product"
    
    def _is_valid_name(self, name: str) -> bool:
        """Validate name input"""
        if not name or len(name.strip()) < 2:
            return False
        
        # Should contain at least some letters
        if not re.search(r'[a-zA-Z]', name):
            return False
        
        return True
    
    def handle_off_topic(self) -> Tuple[str, List[Dict], List[Dict]]:
        """Handle off-topic messages during lead collection"""
        quick_replies = []
        actions = []
        
        next_field = self.state.get_next_missing_field()
        
        if next_field == "name":
            text = "I can help you with that later! First, what's your name?"
        elif next_field == "whatsapp_number":
            text = "I can help you with that later! What's your WhatsApp number?"
        elif next_field == "email":
            text = "I can help you with that later! What's your email address?"
        elif next_field == "project_goal":
            text = "I can help you with that later! Tell me about your project first."
        else:
            # Show product bubbles if nothing is selected
            if not self.state.product_type:
                text = "Let's start with what you're looking to build. Which service interests you?"
                quick_replies = self.state.get_product_bubbles()
            else:
                return None, quick_replies, actions
        
        return text, quick_replies, actions
