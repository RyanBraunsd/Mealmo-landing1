# GHL Tracking Setup Instructions

## Step 1: Create Webhook in GHL

1. **Go to Automation → Workflows**
   - Navigate to your GHL dashboard
   - Click "Automation" in the left sidebar
   - Click "Workflows"

2. **Create New Workflow**
   - Click "Create Workflow" button
   - Name it "Landing Page Tracker" 
   - Choose "From Scratch"

3. **Add Custom Webhook Trigger**
   - Click "Add New Trigger"
   - Select "Custom Webhook"
   - **COPY THE WEBHOOK URL** that appears

4. **Add Actions (Optional)**
   Add any of these actions to respond to page views:
   - **Create/Update Contact** - to log the visitor
   - **Add Note** - to record "Visited landing page"
   - **Add Tag** - like "Landing Page Visitor"
   - **Send Internal Notification** - to alert your team

## Step 2: Update Your Landing Page

1. **Open your landing page code**
   - Open `app/page.tsx`
   - Find this line: `const GHL_WEBHOOK_URL = "YOUR_GHL_WEBHOOK_URL_HERE"`

2. **Replace with your actual webhook URL**
   - Paste your GHL webhook URL between the quotes
   - Save the file

## Step 3: Deploy and Test

1. **Test locally first**
   - Run `npm run dev`
   - Visit your page
   - Check browser console for "Event tracked: page_view"

2. **Deploy your changes**
   - Commit and push to GitHub
   - Deploy to your hosting platform

3. **Verify in GHL**
   - Visit your live landing page
   - Check GHL workflow history for incoming webhook data

## What Gets Tracked

✅ **Page Views** - Every time someone visits your landing page  
✅ **Button Clicks** - Tracks which waitlist button was clicked:
   - `header` - Top navigation button
   - `hero_section` - Main hero area button  
   - `middle_section` - Middle section button
   - `bottom_cta` - Bottom call-to-action button

## Data Structure Sent to GHL

```json
{
  "event_type": "page_view",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "page_url": "https://yoursite.com",
  "page_title": "Mealmo Landing Page",
  "referrer": "https://google.com",
  "user_agent": "Mozilla/5.0...",
  "section": "landing_page",
  "visitor_type": "new_visitor"
}
```

## Troubleshooting

- **No data in GHL?** Check webhook URL is correct
- **Console errors?** Make sure webhook URL doesn't have extra characters
- **Still not working?** Try the webhook URL in a tool like Postman first

---

**Next Steps:** Once you have the webhook URL from GHL, update the `GHL_WEBHOOK_URL` variable in your code!
