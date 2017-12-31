var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer")

router.get('/', function (req, res, next) {
    res.render('pages/index');
});

router.post('/message', function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let session = req.body.session;
    let message = req.body.message;
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>

        <ul>
            <li> Name: ${req.body.name}</li>
            <li> Email: ${req.body.email}</li>
            <li> Phone: ${req.body.phone}</li>
            <li> Session Type: ${req.body.session}</li>
        </ul>

        <h3>Message</h3>

        <p>${req.body.message}</p>
    `
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'infinitemomentphotos252@gmail.com',
                pass: 'paglskcjlqqmzjywW'
            },
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'infinitemomentphotos252@gmail.com', // sender address
            to: 'treadam9115@gmail.com', // list of receivers
            subject: 'New Contact Request from IMP', // Subject line
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