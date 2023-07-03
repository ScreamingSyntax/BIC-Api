
const axios = require('axios');

let date;
let time;

async function fetchDateTime()
 {
    try {
       const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Kathmandu');
       const { datetime } = response.data;
       return datetime
      }
       catch (error) {
       console.error('Error fetching date and time:', error.message);
       return false;
      }
  }
module.exports = {fetchDateTime}

