# EasyChat CRM — Omnichannel Setup & Configuration Handbook

## 1. WhatsApp Cloud API Setup (Meta)

### Step 1: Create Meta Developer App
1. Navigate to `developers.facebook.com` and log in with your Meta Business account.
2. Click **Create App** and select **Business** as the app type.
3. Add the **WhatsApp** product to your app.

### Step 2: Configure Webhooks
1. In the WhatsApp product settings, locate the **Webhooks** section.
2. Set Callback URL: `https://api.easychat.io/v1/channels/whatsapp/webhook`
3. Set Verify Token: (Copy from EasyChat Channel Settings)
4. Subscribe to the following webhook fields:
   - `messages`
   - `message_deliveries`
   - `message_reads`
   - `message_template_status_update`

### Step 3: Production Phone Number Registration
1. Add a registered business phone number in **WhatsApp Accounts → Phone Numbers**.
2. Complete 2-step SMS/Voice verification with Meta.
3. Upload official business display name for green-badge verification review.

---

## 2. Twilio Programmable Voice & IVR Configuration

### Step 1: Provision Phone Number
1. In the Twilio Console, purchase an E.164 phone number supporting Voice and SMS.
2. Note your **Account SID** and **Auth Token**.

### Step 2: Configure Voice Webhook URL
1. Under **Phone Numbers → Manage → Active Numbers**, select your number.
2. In the Voice configuration section, set:
   - **A CALL COMES IN**: Webhook
   - **URL**: `https://api.easychat.io/v1/telephony/ivr/voice-inbound`
   - **HTTP Method**: `POST`

---

## 3. Custom Email Ingestion via SMTP & Webhooks

### Option A: SendGrid / Mailgun Inbound Parse Webhook
1. Configure MX records pointing to your email service provider (`mx.easychat.io`).
2. Set Inbound Parse destination URL to: `https://api.easychat.io/v1/channels/email/inbound-parse`
3. All inbound customer emails will automatically route to the unified agent inbox.

### Option B: Dedicated SMTP Gateway
Provide SMTP credentials in **Settings → Channels → Email**:
- Host: `smtp.sendgrid.net`
- Port: `587` (TLS)
- Username: `apikey`
- Password: `<Your SendGrid API Key>`
