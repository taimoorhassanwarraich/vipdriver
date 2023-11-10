const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// // Configure CORS to allow requests from your frontend
// const corsOptions = {
//   origin: 'http://127.0.0.1:5500', // Update with the correct origin of your frontend
//   methods: 'POST',
// };

app.use(cors());

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static HTML file
app.use(express.static(__dirname));

// POST route to handle form submission
app.post(`/send`, (req, res) => {
    const { name, email, phone, date, time, drop, pickup } = req.body;
    console.log(req.body)
    // Create a nodemailer transporter using your email service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use the Gmail service
        auth: {
          user: 'taimoorwarch@gmail.com', // Your Gmail email address
          pass: 'vqag jjmv anzf ypvb', // Your Gmail password or an application-specific password
        },
      });

    const mailOptions = {
        from: email,
        to: 'taimoorwarchwork@gmail.com', // Enter the recipient's email address
        subject: 'New Booking Request',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nPickup: ${pickup}\nDropoff: ${drop}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error: Something went wrong while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Booking request sent successfully!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
