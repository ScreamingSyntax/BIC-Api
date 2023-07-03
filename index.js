const express = require('express');
const app = express();
const pool = require('./config/database');
const path = require("path");
require('dotenv').config()
// const json = require('json');
const equiryRoutes = require('./api/enquiry/enquiry.router');
const contactRoutes = require('./api/contact/contact.router');
const postRoutes = require('./api/post/post.router');
const blogImagesPath = './images/blog/';
const adminRoutes = require('./api/admin/admin.router');
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use("/blog",express.static(blogImagesPath));
app.use("/api/enquiry",equiryRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/post',postRoutes);
app.use('/api/admin',adminRoutes)


app.listen(port,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
});