
const axios = require('axios');

let date;
let time;

async function fetchDateTime() {
    try {
       const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Kathmandu');
       const { datetime } = response.data;
    //    const formattedDate = moment(datetime).format('YYYY-MM-DD');
    //    const formattedTime = moment(datetime).format('HH:mm')
       return datetime
     } catch (error) {
       console.error('Error fetching date and time:', error.message);
      }
}

// fetchDateTime().then( ()=>{
//     module.exports = {date,time}
// })

module.exports = {fetchDateTime}

