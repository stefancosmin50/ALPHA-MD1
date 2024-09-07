const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVB0c1M4U05rTnBmNms5QXRrRXA5QVA5ek1od2FyT0srS1Jxc20xZC9sTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1BoeFQrTWR0Z0hFOXl1MWpjL2FWcjBQdVIzekdYUFNsbnNuRG1NTnFGZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTTU4aTRCTzJrV0dtVUJZclE2RFh3R0pRSEQ4RUFRRDdsOHI1c0ppcWtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWQVdlaUdBcms3Q1RVZG9NL1pCZWNNSzZrSnFUeC9DUHVLVUJYRUFMN3dJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1NT2wxck82QStKcHFWZFZXMkpoS2hyem5RUmZqQVBsa1lGbnZ1WUF3bG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBNXNHdnRmU2oxVG5vaXdzQm5iUEhPNlNIekIxdFB4VzNKZ3AwQUFlQUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUhtTFg5TGFLemlDeGRGTFRmaGVBcjIzaTc4L3VHdTZ6YjJ3Q1pjaCtVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidERnOEJCajRHUExtNDlUVmpuV0g4UzRVaVY1RXhXNUVrVm1JSys1bFpSYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img5RFFCNC9YWGIra0NqT2xpbHZsbTV1cFgxMnpLYy9RUC84dFI2TXEwUGJJU1d3VDJxNTQ5VHdrUi9uU0FIcTNPVE04SDUybU16MTFVOGhLOXlESmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQzLCJhZHZTZWNyZXRLZXkiOiJJWFJWalBKdkkxTGtNZFpBZW9TaklwQzRQTDBTbnZBRm5LYkZzU0prMm1FPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJwbEI2Y2NSdVFoNjVqRlNtbFJrb3pBIiwicGhvbmVJZCI6ImVhMjhmZDZhLTU3YjktNGRiZS1iMTZjLTc1NGRhZWRjZDFkNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzYzhYejVFRUYxRG5HeG4wRG9xcVA2a0RJWXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVTIrUmRndFB1ZXVRUnZ6Zi8xY1U4M3IxZVlzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhNVkVORU5SIiwibWUiOnsiaWQiOiI0MDc3MDgxMTkyOTo1NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZW58J2WlPCdlbLwnZaG8J2WkvCdlorwnZW58J2WlPCdlbfwnZaO8J2Wi/CdlooifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pYeXREQVErOC95dGdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFZdk42ekhXZlVtSElqTnBOMXJ2amNaZ3pQVnpZRXhyRlFXN2pvSFJqQWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBMNlNnSWRJSnZHdmtnMDhBSUQ5UWFhZ1ZDejc0bFBNdjlmZGF0Sys2SVVsdEorZTdNUEttUVVMbnpZM0RUaXZ0SFN6QXA0TFBRSzhlKy9jMktSZURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHM1BJcy9XNFNVaFFITzB4aWNJRjBRVEpGMmpHQW5iZnpUOXM0VUNTOEppUjBmbXhkS05sVlVLN1gyZFo0T0d5cW91YkRNU2N5L3NONXpPNWx3NENoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQwNzcwODExOTI5OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFtTHplc3gxbjFKaHlJemFUZGE3NDNHWU16MWMyQk1heFVGdTQ2QjBZd0kifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjU3MzY5NjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTkJvIn0=',
    PREFIXE: process.env.PREFIX || "0770811929",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
