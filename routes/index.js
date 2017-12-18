var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer")

router.get('/', function (req, res, next) {
    res.render('pages/index');
});

router.post('/message', function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>

        <ul>
            <li> Name: ${req.body.name}</li>
            <li> Phone: ${req.body.phone}</li>
            <li> Email: ${req.body.email}</li>
        </ul>

        <h3>Message</h3>

        <p>${req.body.message}</p>
    `
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'who is your host?',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'enter admin email here', // generated ethereal user
                pass: 'enter password here' // generated ethereal password
            },
            rejectUnauthorized: false
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Node Server 👻" <enter admin email here>', // sender address
            to: 'who is this going to', // list of receivers
            subject: 'New Contact Request', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render(index, {
                msg: "Email successfully sent."
            })

        });
    });




});






module.exports = router;