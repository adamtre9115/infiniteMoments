const express = require('express');
const router = express.Router();
const env = require('dotenv').config();
const key = process.env.Mail_Key;
const domain = process.env.Domain;

var mailgun = require("mailgun-js");
var mailgun = require('mailgun-js')({
    apiKey: key,
    domain: domain
});

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
    var data = {
        from: 'Infinite Moments Photography <infinitemomentphotos252@gmail>',
        to: 'infinitemomentphotos252@gmail.com',
        subject: 'New Response from IMP',
        text: 'Testing some Mailgun awesomness!',
        html: output,
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });




});






module.exports = router;