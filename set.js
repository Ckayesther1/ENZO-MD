const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk9temJxTTFkbzVqTTBiZjc1c3pTOEF1Q2lnNE4rMHVaeHRVMTFxRzdGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZitmaGJhREhCVWZaTTlON0NpQThMZzBWMWtJZHNSVmtWMTQxeE85UzlGMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlR01hN3psS09FUkxnMkZ6d29sRGJwYkU5ME1nKys1Q01EdW1lY2VjRUdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuOGFvRmdCZWFWdVdteTdxZlFUY2FreFF6eDlaUnJZQmZOOWluMVdRdnhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKWkFiV0lWSWFMaytyeWRzVGpNY0F3bkFFSDRrTmFtLy9mMERrWDhlR1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZROXU3U000Z3IvUFBWK2hMY1dEclFyOTZmT212d3F4QTdxbkhJWk53V1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0phVm1pRTJmVVIrTVdSajdjWkQwZDlEVUZrWTJJRmRyVkN0OU1tL01sWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1dUWVErM1NEWXk4eWVJeWd0YmNUaGVZaXA4QjdRNEdjcDg5Q2VIUXNsTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJCZXM0b0ZGSWlBQ3NuQ2lzNy8ycVRybmYxQ2FmRXljMjMvUDFHTlBZYmpQZXZINk4xOXhPc253OVdzbFN6amJLSUloZnZCeGhERFpodWxTTXVWU2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzgsImFkdlNlY3JldEtleSI6IlBPZEIzVEQwN3FDMzZQUklIZmJFVVc4UkM5Tzhna2grS214YzBoVnlEdEE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkUwZmpKQ3RNUnZTcUViUWVIWkRkdGciLCJwaG9uZUlkIjoiYjE5Mzk4ZTYtYmU1Ni00Y2QzLTlmMjQtNTg0NjhkNjI1YTAwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFlRkJKZWJRZVliRXR2RE5YZlZJaVhabUNxTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5K0dwM0dxT2VYa0pTdHpuT1hXbHA0bHVHbXM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWUw1VzRHV1EiLCJtZSI6eyJpZCI6IjIzNDgwNjkwMTY0NzI6NDFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kvUW5jd0ZFSWlvc2JrR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImJBUzUrQUFMNnZSTzVnOUtlSnJ0YzYzVkpyUnFnOVhTaHhaUHRoUmFhWDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlYrdFJ4MXZQT0Q1ZmplTWxHenp3ZWpydWFHWXluSmxtNkxPUlRJQ0ZSWjhKQTNiemU2bFZyWDFLUEp5UE9HNjhsTlU1SGE3cTRCWVdvbkxzb0txakR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJlTFdESkd1Y3A0Z2IzQUsyTUhIbWVjVXNCRk45NHRvSE5lZDlPL2pMeVdNT203b0pLU1p6Yklnd1FoNDNZeHdmajBMbnFaT29LOGlyVEl5RCtneEVpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNjkwMTY0NzI6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV3dFdWZnQUMrcjBUdVlQU25pYTdYT3QxU2EwYW9QVjBvY1dUN1lVV21sKyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDk1ODM1OH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Č_ķãý",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Č_ķãý",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
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
