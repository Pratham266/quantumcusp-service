# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your contact form.

## Prerequisites

- A Google account
- A Google Sheet where you want to store contact form submissions

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - Name: `contact-form-service`
   - Description: `Service account for contact form submissions`
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Select **JSON** format
5. Click **Create** - this will download a JSON file
6. **Keep this file secure!** It contains your credentials

## Step 5: Share Your Google Sheet

1. Open your Google Sheet
2. Click the **Share** button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it **Editor** permissions
5. Click **Send**

## Step 6: Get Your Sheet ID

The Sheet ID is in your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

## Step 7: Set Up Your Google Sheet

Create a sheet with the following columns in Row 1:
- Column A: **Timestamp**
- Column B: **Name**
- Column C: **Email**
- Column D: **Message**

## Step 8: Configure Environment Variables

Add these variables to your `.env` file:

```bash
# Google Sheets Configuration
GOOGLE_SHEET_ID=your-sheet-id-from-step-6
GOOGLE_SHEET_RANGE=Sheet1!A:D
GOOGLE_SERVICE_ACCOUNT_KEY=paste-entire-json-content-from-step-4-here
```

**Important Notes:**
- For `GOOGLE_SERVICE_ACCOUNT_KEY`, paste the **entire JSON content** from the downloaded file as a single line
- Make sure the JSON is properly formatted (no extra line breaks)
- The range `Sheet1!A:D` means it will append to columns A through D in Sheet1

## Example .env Configuration

```bash
GOOGLE_SHEET_ID=1abc123def456ghi789jkl
GOOGLE_SHEET_RANGE=Sheet1!A:D
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"my-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...your key here...\n-----END PRIVATE KEY-----\n","client_email":"contact-form-service@my-project.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs/contact-form-service%40my-project.iam.gserviceaccount.com"}
```

## Testing

1. Restart your server: `npm run dev`
2. Submit a test contact form
3. Check your Google Sheet - you should see a new row with the submission data!

## Troubleshooting

### Error: "The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- Verify the service account has Editor permissions

### Error: "Unable to parse range"
- Check that your `GOOGLE_SHEET_RANGE` matches your sheet name
- Default is `Sheet1!A:D` - adjust if your sheet has a different name

### Error: "Invalid credentials"
- Verify the entire JSON is copied correctly in `GOOGLE_SERVICE_ACCOUNT_KEY`
- Make sure there are no extra spaces or line breaks
- The JSON should be on a single line in the .env file

## Security Notes

- **Never commit your `.env` file** to version control
- Keep your service account JSON file secure
- Only share the Google Sheet with the service account email
- Regularly rotate your service account keys for better security
