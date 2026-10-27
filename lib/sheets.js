// lib/sheets.js  (server-only: import from pages/api/* only)
import { google } from "googleapis";

function getCredentials() {
  // Preferred: the whole service-account JSON in one env var.
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (raw) {
    const json = JSON.parse(raw);
    return {
      email: json.client_email,
      key: String(json.private_key || "").replace(/\\n/g, "\n"),
    };
  }
  // Fallback: separate variables.
  return {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  };
}

function getSheetsClient() {
  const { email, key } = getCredentials();
  if (!email || !key || !process.env.GOOGLE_SHEET_ID) {
    throw new Error("Google Sheets environment variables are not configured");
  }
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

/**
 * Appends one row to the given tab. Writes the header row first if the tab is empty.
 * valueInputOption RAW stores everything as plain values, so text such as "=SUM(1)"
 * is never evaluated as a formula.
 */
export async function appendRow(tab, headers, row) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const first = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A1:A1`,
  });
  if (!first.data.values || first.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
