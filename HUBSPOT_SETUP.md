# HubSpot Integration Guide

## 📊 Current Lead Storage

**Without HubSpot credentials configured:**
- Leads are stored locally in SQLite database: `backend/chat_sessions.db`
- You can view them with: `sqlite3 backend/chat_sessions.db "SELECT * FROM chat_sessions"`
- This is fine for testing, but you won't get leads in your CRM

**With HubSpot credentials configured:**
- Leads are automatically synced to HubSpot CRM
- They appear in your Contacts list at https://app.hubspot.com/contacts/
- Local database still stores the data as a backup

---

## 🔑 How to Get HubSpot API Credentials

### Method 1: Private App Token (⭐ Recommended)

**Why use this method?**
- More secure (scoped permissions)
- Better for production use
- Can be revoked easily
- Follows HubSpot's latest best practices

**Steps:**

1. **Login to HubSpot**
   ```
   https://app.hubspot.com/
   ```

2. **Go to Settings**
   - Click the ⚙️ **Settings** icon in the top navigation bar

3. **Navigate to Private Apps**
   - Left sidebar: **Integrations** → **Private Apps**
   - Or search for "Private Apps" in settings

4. **Create New Private App**
   - Click **"Create a private app"**
   
   **Basic Info Tab:**
   - Name: `Absolute App Labs Chatbot`
   - Description: `Lead capture from website chatbot`
   - Logo: (optional - upload your logo)

5. **Configure Scopes**
   Click the **Scopes** tab and enable:
   
   | Scope | Permission | Why Needed |
   |-------|-----------|------------|
   | `crm.objects.contacts.read` | Read | Search for existing contacts |
   | `crm.objects.contacts.write` | Write | Create/update contacts |
   | `crm.schemas.contacts.read` | Read | Read contact properties |

6. **Create & Copy Token**
   - Click **"Create app"**
   - A popup shows your Access Token
   - **⚠️ COPY IT NOW** - You won't see it again!
   - Format: `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

### Method 2: API Key (Legacy)

**Note:** HubSpot is phasing out API keys in favor of Private Apps. Use Method 1 if possible.

**Steps:**

1. **Login to HubSpot**
   ```
   https://app.hubspot.com/
   ```

2. **Go to Settings**
   - Click ⚙️ **Settings** in top navigation

3. **Find API Key Section**
   - Go to: **Integrations** → **API Key**
   - Or search for "API Key" in settings search bar

4. **Generate/View API Key**
   - If no key exists: Click **"Create key"**
   - If key exists: Click **"Show"** to reveal it
   - Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

5. **Copy the Key**
   - Copy the entire key string

---

## 💻 How to Configure Your Chatbot

### Option A: Use the Setup Script (Easiest)

```bash
cd /Users/hnai/Downloads/absolute-app-labs
./setup-hubspot.sh
```

The script will:
1. Prompt you to choose Private App or API Key
2. Ask you to paste your credentials
3. Automatically update your .env file
4. Show you next steps to restart the server

### Option B: Manual Configuration

1. **Open .env file**
   ```bash
   cd /Users/hnai/Downloads/absolute-app-labs
   nano .env
   # or
   code .env
   ```

2. **Add or update this line:**
   ```
   HUBSPOT_API_KEY=your-actual-token-here
   ```
   
   Replace `your-actual-token-here` with your token from HubSpot.

3. **Save the file**

4. **Restart backend server**
   ```bash
   # Kill existing server
   lsof -ti:8000 | xargs kill -9
   
   # Start new server with credentials
   cd /Users/hnai/Downloads/absolute-app-labs
   python3 backend/main.py > /tmp/backend.log 2>&1 &
   ```

---

## ✅ Verify It's Working

### 1. Test Lead Capture

1. Open your chatbot: http://localhost:3000/
2. Click the chat icon
3. Go through the lead capture flow:
   - Select a product (e.g., "Mobile App Development")
   - Answer the questions
   - Provide name, phone, email

### 2. Check Backend Logs

```bash
tail -f /tmp/backend-lead.log
# or
tail -f /tmp/backend.log
```

**Look for:**
- ✅ Success: `Creating new contact in HubSpot`
- ✅ Success: `Contact created successfully`
- ❌ Error: `401 Unauthorized` = Wrong/missing API key
- ❌ Error: `403 Forbidden` = Insufficient permissions (add more scopes)

### 3. Check HubSpot

1. Go to: https://app.hubspot.com/contacts/
2. Look for your test contact
3. Check the contact properties:
   - Name, Email, Phone should be populated
   - Lifecycle Stage should be "Lead"
   - Custom field `product_type` (if you created it)

---

## 🔧 Troubleshooting

### Error: "401 Unauthorized"

**Problem:** Invalid or missing API key

**Solutions:**
1. Double-check you copied the entire token (no extra spaces)
2. If using Private App: Make sure the app is enabled (not disabled)
3. Verify the token is in `.env` file correctly
4. Restart backend server after updating `.env`

### Error: "403 Forbidden"

**Problem:** Missing permissions/scopes

**Solutions:**
1. Go back to your Private App settings
2. Add the required scopes (see Method 1 above)
3. Click "Save" in HubSpot
4. Restart your backend server

### Error: Property 'product_type' does not exist

**Problem:** Custom property doesn't exist in HubSpot

**Solutions:**

**Option 1: Create the property**
1. Go to Settings → Properties → Contact Properties
2. Click "Create property"
3. Name: `product_type`
4. Label: "Product Type"
5. Type: "Single-line text"
6. Save

**Option 2: Remove from code**
The chatbot will still work - it just won't save product type.

### Leads Not Appearing in HubSpot

**Check:**
1. ✅ Backend server is running: `lsof -i:8000`
2. ✅ No errors in logs: `tail -30 /tmp/backend.log`
3. ✅ API key is set: `grep HUBSPOT_API_KEY .env`
4. ✅ Server was restarted after adding key
5. ✅ HubSpot account is active

---

## 📋 What Gets Synced to HubSpot

When a lead completes the chatbot flow, this data is sent:

| HubSpot Field | Source | Example |
|--------------|--------|---------|
| `firstname` | Extracted from name | "Ruthran" |
| `lastname` | Extracted from name | "Kumar" |
| `email` | User input | "ruthran@hereandnow.co.in" |
| `phone` | User input | "+918939561000" |
| `company` | Project goal | "I need a fitness tracking app" |
| `lifecyclestage` | Hardcoded | "lead" |
| `product_type` | User selection | "mobile_app" |

**Smart Matching:**
- If contact with same email exists → **Updates** existing contact
- If contact with same phone exists → **Updates** existing contact
- Otherwise → **Creates** new contact

---

## 🔒 Security Best Practices

1. **Never commit .env to Git**
   - Already in `.gitignore`
   - Double check: `cat .gitignore | grep .env`

2. **Use Private App instead of API Key**
   - More secure with scoped permissions
   - Can be revoked without affecting other integrations

3. **Rotate credentials periodically**
   - Create new Private App every 6-12 months
   - Delete old ones you're not using

4. **Monitor access**
   - Check HubSpot Activity Logs regularly
   - Review API usage in HubSpot Settings

---

## 📞 Need Help?

**View current leads in database:**
```bash
cd /Users/hnai/Downloads/absolute-app-labs/backend
sqlite3 chat_sessions.db "SELECT json_extract(conversation_state, '$.name') as name, json_extract(conversation_state, '$.email') as email, json_extract(conversation_state, '$.whatsapp_number') as phone FROM chat_sessions WHERE conversation_state != '{}'"
```

**Export leads to CSV:**
```bash
sqlite3 -header -csv chat_sessions.db "SELECT json_extract(conversation_state, '$.name') as name, json_extract(conversation_state, '$.email') as email, json_extract(conversation_state, '$.whatsapp_number') as phone, json_extract(conversation_state, '$.product_type') as product, json_extract(conversation_state, '$.project_goal') as goal FROM chat_sessions WHERE conversation_state != '{}'" > leads.csv
```

**Test HubSpot connection:**
```bash
curl -X GET "https://api.hubapi.com/crm/v3/objects/contacts?limit=1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

---

## 🚀 Next Steps After Setup

1. ✅ Configure HubSpot credentials
2. ✅ Restart backend server
3. ✅ Test lead capture
4. ✅ Verify in HubSpot
5. 📧 Set up email notifications (optional)
6. 📊 Create HubSpot workflows for lead follow-up (optional)
7. 🔗 Connect to Slack for real-time alerts (optional)

---

**Ready to get started?** Run the setup script:
```bash
cd /Users/hnai/Downloads/absolute-app-labs
./setup-hubspot.sh
```
