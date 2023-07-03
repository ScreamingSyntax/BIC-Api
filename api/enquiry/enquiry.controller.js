const {
  viewAvailability: viewAvailabilityService,
  viewEnquiry: viewEnquiryService,
  submitEnquiry: submitEnquiryService,
  deleteEnquire: deleteEnquireService,
} = require("./enquiry.service");
const { json } = require("express").json();
const { mailTransporter, mailOptions } = require("../../mailer/mailer");
// const { options } = require('./enquiry.router');
const { fetchDateTime } = require("../../tools/date/date.time");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Kathmandu");
const { addRow }= require('../../tools/spreedsheets/spreed.sheet')



module.exports = {
  viewEnquiry: (req, res) => {
    viewEnquiryService((err, results) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error Fetching Enquiries",
        });
      } else if (results[0] === undefined) {
        return res.json({
          success: 0,
          message: "No Enquires to View",
        });
      }
        return res.json({
          date: date,
          time: time,
          success: 1,
          data: results,
        });
      });
  },
  submitEnquiry: (req, res) => {
    const data = req.body;
    fetchDateTime().then((value) => {
        current_date = moment(value).format("YYYY-MM-DD");
        current_time = moment(value).format("HH:mm");
    submitEnquiryService(data, current_date ,current_time, (err, result) => 
    {
      console.log(data);
      if (err) {
        return res.json({
          success: 0,
          message: "Error inserting values",
        });
      }
      addRow({
        name:data.name,
        phone:data.phone,
        email:data.email,
        sector:data.sector,
        referral:data.referral,
        Date:current_date,
        Time:current_time
      })
      const options = mailOptions(
        "whcloud91@gmail.com",
        "Enquiry Submission",
        `User Details :
Name: ${data.name}
Phone: ${data.phone},
Email: ${data.email},
Sector: ${data.sector},
Referral: ${data.referral}


These are the user details that a student filled up to inquire.
        `
      );
      mailTransporter(options);
      return res.json({
        success: 1,
        message: "Successfully Inserted",
      });
    }
    
    );
});
  },
  deleteEnquire: (req, res) =>
  {
    const data = req.body;
    viewAvailabilityService(data, (err, results) => {
      if (results[0] === undefined) {
        return res.json({
          success: 0,
          message: "The enquiry that you are trying to delete doesn't exist",
        });
      } else {
        deleteEnquireService(data, (err, results) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Error Deleting Enquiry",
            });
          }
          return res.json({
            success: 1,
            data: "Successfully Deleted",
          });
        });
      }
    });
  },
};
