# Contact Form - Google Sheets Integration

## Summary of Changes

The contact form has been updated to store submissions in Google Sheets instead of sending email notifications to the admin.

### What Changed

1. **Removed**: Email notification to admin
2. **Added**: Google Sheets integration to store contact form data
3. **Kept**: Thank you email sent to users who submit the form

### New Files Created

1. **`sheetsConfig.js`** - Google Sheets API configuration and helper functions
2. **`GOOGLE_SHEETS_SETUP.md`** - Complete setup guide for Google Sheets integration

### Modified Files

1. **`routes.js`** - Updated to use Google Sheets instead of admin email
2. **`.env.example`** - Added Google Sheets configuration variables
3. **`package.json`** - Added `googleapis` dependency

### How It Works

When a user submits the contact form:

1. ✅ Form data is validated
2. 📊 Data is appended to your Google Sheet (Timestamp, Name, Email, Message)
3. 📧 Thank you email is sent to the user
4. ✅ Success response is returned

### Data Structure in Google Sheet

| Timestamp | Name | Email | Message |
|-----------|------|-------|---------|
| 2025-12-23T10:35:54.000Z | John Doe | john@example.com | Hello, I'm interested... |

### Next Steps

1. Follow the setup guide in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Cloud project and enable Google Sheets API
3. Create a service account and download the JSON key
4. Share your Google Sheet with the service account email
5. Add the required environment variables to your `.env` file:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_RANGE`
   - `GOOGLE_SERVICE_ACCOUNT_KEY`
6. Restart your server and test!

### Environment Variables Required

```bash
# Google Sheets Configuration
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SHEET_RANGE=Sheet1!A:D
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

### Benefits

- ✅ Centralized data storage in Google Sheets
- ✅ Easy to view and manage submissions
- ✅ Can be easily exported or integrated with other tools
- ✅ No email inbox clutter
- ✅ Real-time data access
- ✅ Can share with team members easily
