import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import CONFIG from './config.js'
const { SHEETS_ID, SHEETS_PRIVATE_KEY, SHEETS_EMAIL } = CONFIG

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  email: SHEETS_EMAIL,
  key: SHEETS_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const doc = new GoogleSpreadsheet(SHEETS_ID, serviceAccountAuth);

export async function read() {
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
}