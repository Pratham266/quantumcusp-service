# QuantumCusp Email Service Setup Guide

This guide will help you configure the email functionality for your contact form.

## 📧 Email Configuration

The service uses **Nodemailer** to send emails. Follow these steps to set it up:

### Step 1: Choose Your Email Provider

You can use any SMTP email service. Here are the most common options:

#### Option A: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App-Specific Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update `.env` file**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=raotech@tafmail.com
   ```

#### Option B: SendGrid (Recommended for Production)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Update `.env` file:
   ```env
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   EMAIL_FROM=your-verified-sender@yourdomain.com
   EMAIL_TO=raotech@tafmail.com
   ```

#### Option C: Other Providers

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

**Custom SMTP:**
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Test the Configuration

Start your server:
```bash
npm run dev
```

Send a test request:
```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the contact form."
  }'
```

## 🛡️ Anti-Spam Features

The implementation includes several features to prevent spam:

1. **Email Validation**: Validates email format using regex
2. **Message Length Limits**: 
   - Minimum: 10 characters
   - Maximum: 5000 characters
3. **Required Fields**: All fields (name, email, message) are mandatory
4. **Proper Email Headers**: 
   - SPF, DKIM support (when using proper email providers)
   - Reply-To header set to sender's email
   - Professional HTML formatting
5. **Error Handling**: Comprehensive error handling with specific error messages

## 📝 Email Templates

The system sends **two emails** for each contact form submission:

### 1. Notification Email (to Admin)
Sent to `raotech@tafmail.com` and includes:

- **Professional HTML formatting** with gradient header
- **Sender's information**: Name and Email
- **Message content**: Full message from the contact form
- **Timestamp**: When the message was received
- **Reply-To header**: Allows direct reply to the sender

### 2. Thank You Email (to User)
Automatically sent to the person who submitted the form and includes:

- **Professional branded design** with QuantumCusp branding
- **Personalized greeting** with the user's name
- **Confirmation message** that their inquiry was received
- **Expected response time** (24-48 hours)
- **Professional signature** from the QuantumCusp Team
- **Automated disclaimer** to prevent confusion

This dual-email approach ensures:
- ✅ Admin gets notified of new inquiries
- ✅ Users receive immediate confirmation
- ✅ Professional communication experience
- ✅ Reduced support inquiries about submission status


## 🔒 Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use app-specific passwords** instead of your main email password
3. **Enable 2FA** on your email account
4. **Use environment variables** for all sensitive data
5. **Consider using a dedicated email service** like SendGrid for production

## 🚀 Production Deployment

For production, consider:

1. **Use a professional email service** (SendGrid, AWS SES, Mailgun)
2. **Set up SPF and DKIM records** for your domain
3. **Monitor email delivery rates**
4. **Implement rate limiting** to prevent abuse
5. **Add CAPTCHA** to your contact form

## 📊 Monitoring

Check your server logs for:
- ✓ Email sent successfully
- Message IDs
- Error messages with specific error codes

## 🐛 Troubleshooting

### "Authentication failed" error
- Check your EMAIL_USER and EMAIL_PASS in `.env`
- Ensure you're using an app-specific password (for Gmail)
- Verify 2FA is enabled

### "Connection failed" error
- Check your EMAIL_HOST and EMAIL_PORT
- Verify your firewall allows outbound SMTP connections
- Try using port 465 with `EMAIL_SECURE=true`

### Emails going to spam
- Use a professional email service (SendGrid, AWS SES)
- Set up SPF and DKIM records
- Avoid spam trigger words in your email content
- Ensure proper email formatting (HTML + text)

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [SendGrid Documentation](https://docs.sendgrid.com/)

## 🆘 Support

If you encounter any issues, check the server logs for detailed error messages.
