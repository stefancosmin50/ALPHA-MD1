const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUhoSGg1R1V5ck9lN1FrOTZ3Vll1dHFHR3JFeklGaXBRQytiSkptUWZGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUlFRC92YTRYVHM4VEpDaFdyZ0VvZHh3QWM0QVlDem9TYStmaUdkbHZ4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQUlrOFNYWWY4M2JKemdOeFBIcm9GSDdXL3drMEpONXRXQmRKUENTS25NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNZ1hmOE9lTmZnMEZyWDVMc2NLMEJ1VURWb2QzQys1UGUxRHhhU0lIYTFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdGakNXNjBFQ2Q3d3lkL290YzdvblVEK1ZpUXp4L3lvdXdjZ2trckx0M289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBibDhDcWdLZ1NoZ3krZFA4OUdmdGZKNCthUjNLMmJWdlNEd09McGhUWDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9sMlJRYzZIZUt1cTluVUxGTzhIZ202dEJqVjY5enlQU2g2LzM1bVFIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTlLRWtXb2R3eC96bjhrcWVEMWtZMEpyTVNUbUM4NlBIZkpYc3hBQ3YwUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNejBYV2M4UVYzVG1nRUxyMnJaOGlLU3Z6a1BGRUJXS0JUYVI4QnVpSU1wS3hCU1dZZVJDbU5pQlZ3bzhLSGhvTTZkVldFTU9OVmZGWkVxK0d6SENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQsImFkdlNlY3JldEtleSI6Imx4blJEQVNXUC9YSVZCZytMeXdoQ0x5c1dNZkxUYWlLMWJ2TUFQZGpKSFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ilc2M1F2YXZ3UlNpN1JuNEttUEo4WUEiLCJwaG9uZUlkIjoiMmE1NGM2MDQtM2E3MS00MzI1LWJiY2EtZWUxZjk1ODkyODllIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB6bU5GeEVwNW55bzFvRHhERDdMcGRkUEFHUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5YzNZSXBoaU50bDZhV3BEWG9NYjBwWjFvRzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSDdXVzRSOEQiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5OjY2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdlbnwnZaU8J2VsvCdlobwnZaS8J2WivCdlbnwnZaU8J2Vt/Cdlo7wnZaL8J2WiiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnZ5dERBUTEvZXJ0d1lZQXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicVl2TjZ6SFdmVW1ISWpOcE4xcnZqY1pnelBWellFeHJGUVc3am9IUmpBZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieVBxZDVqM2JLSFRzczVROUZxQkdxQzdEU2Y4bmEzdE1icWxxSnlmcHYrOW9Ib00xdEozZURldVcxRzF1UGV6TEJpU2laazBnZk1RcHpmRFhYK2hzQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkRDdTFuQWJxT1MySlU3aVF0V0F1bm1yT3pJaHN5OGZsTjNoOHhJZ0dEbE0yNlgwUnZwZDZpbENnS3prT2tvWXNNSVMrYitKQmovNVVzN0gxbFpxWUJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6NjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYW1MemVzeDFuMUpoeUl6YVRkYTc0M0dZTXoxYzJCTWF4VUZ1NDZCMFl3SSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNjY3NTk0MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOQm8ifQ=='
    PREFIXE: process.env.PREFIX || "0770811929",
    OWNER_NAME: process.env.OWNER_NAME || "ANONIM",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "ANONIM",              
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
