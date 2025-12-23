const { google } = require('googleapis');


const GOOGLE_SERVICE_ACCOUNT_KEY={
  "type": process.env.G_TYPE,
  "project_id": process.env.G_PROJECT_ID,
  "private_key_id": process.env.G_PRIVATE_KEY_ID,
  "private_key": process.env.G_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": process.env.G_CLIENT_EMAIL,
  "client_id": process.env.G_CLIENT_ID,
  "auth_uri": process.env.G_AUTH_UR,
  "token_uri": process.env.G_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.G_AUTH_PROVIDER_UAL,
  "client_x509_cert_url": process.env.G_CLIENT_URL,
  "universe_domain": process.env.G_UNIVERSE_DOMAIN
}

/**
 * Creates and returns a Google Sheets API client
 * @returns {Object} Google Sheets API client
 */
function createSheetsClient() {
    // Check if the environment variable exists
    if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
        throw new Error(
            'GOOGLE_SERVICE_ACCOUNT_KEY is not set in environment variables. ' +
            'Please follow the setup guide in GOOGLE_SHEETS_SETUP.md'
        );
    }

    let credentials;
    try {
        // Parse the service account credentials from environment variable
        credentials =GOOGLE_SERVICE_ACCOUNT_KEY;
    } catch (error) {
        throw new Error(
            'GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON. ' +
            'Please ensure the entire JSON object is properly formatted. ' +
            'Original error: ' + error.message
        );
    }
    
    // Create auth client
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create and return sheets client
    return google.sheets({ version: 'v4', auth });
}

/**
 * Appends a new row to the Google Sheet
 * @param {string} name - Contact name
 * @param {string} email - Contact email
 * @param {string} message - Contact message
 * @returns {Promise<Object>} Result of the append operation
 */
async function appendToSheet(name, email, message) {
    const timestamp = new Date().toISOString();

    const sheets = createSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:D'; // Default to Sheet1, columns A-D

    const values = [
        [timestamp, name, email, message]
    ];

    const resource = {
        values,
    };

    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });

        console.log('✓ Data added to Google Sheet successfully!');
        console.log(`${result.data.updates.updatedCells} cells appended.`);
        
        return result.data;
    } catch (error) {
        console.error('Error appending to Google Sheet:', error.message);
        throw error;
    }
}

module.exports = {
    createSheetsClient,
    appendToSheet
};
