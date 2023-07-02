const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config()
const fs = require('fs');
const RESPONSES_SHEET_ID = process.env.SHEET_ID;
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const {resolve} = require('path');
const absolutePath = resolve('./lunar-gradient-314602-3083799d6d73.json')
console.log(absolutePath);
const CREDENTIALS = JSON.parse(fs.readFileSync(absolutePath));

const addRow = async (rows) => {
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];
    await sheet.addRow(rows);
};

// addRow({
//     name: 'email@email.com',
//     phone: 'ramesh',
//     email: 'abcd@1234',
//     sector:'BIT',
//     referral:'Me',
//     Date:"date",
//     Time:'time'
// });

module.exports = {addRow}