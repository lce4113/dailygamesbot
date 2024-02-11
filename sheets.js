import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import dotenv from 'dotenv'
dotenv.config()

const GOOGLE_AUTH = new JWT({
  email: "dailygamesbot@dailygamesbot-413416.iam.gserviceaccount.com",
  key: process.env.SHEETS_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const doc = new GoogleSpreadsheet(process.env.SHEETS_ID, GOOGLE_AUTH)

export async function addToSheet(date, user, id, game, time) {
  await doc.loadInfo(); // loads doc properties and worksheets
  const sheet = doc.sheetsById[616135473] // "data" sheet
  await sheet.addRow({ date, user, id, game, time, })
}