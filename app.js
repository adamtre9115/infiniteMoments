const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const Cookies = require('cookies');
const PrismicConfig = require('./prismic-configuration');
const Onboarding = require('./onboarding');
const app = require('./config');
const key = process.env.Mail_Key;
const domain = process.env.Domain;

var mailgun = require("mailgun-js");
var mailgun = require('mailgun-js')({
    apiKey: key,
    domain: domain
});

const PORT = app.get('port');

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

app.get('/', (req,res) =>{
  const uid = process.env.UID;
  
   // We are using the function to get a document by its uid field
   req.prismic.api.getByUID('home', uid)
   .then((document) => {

       // document is a document object, or null if there is no match
       if (document) {

           // Render the 'page' pug template file (page.pug)
           res.render('page', { document });
          // console.log(document.data.body)

        } else {
            res.status(404).send('404 not found');
        }
    })
    .catch((error) => {
        next(`error when retriving page ${error.message}`);
    });
})
/*
 * Route with documentation to build your project with prismic
 */
app.get('/', (req, res) => {
  res.redirect('/help');
});

// This route will handle emails to IMP
app.post('/mail', (req, res) => {
  // capture all data from the client
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let session = req.body.session;
  let message = req.body.message;
  // configure the email
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

  // pass the data to an object
  var data = {
      from: 'Infinite Moments Photography <infinitemomentphotos252@gmail>',
      to: 'infinitemomentphotos252@gmail.com',
      subject: 'New Response from IMP',
      text: 'Testing some Mailgun awesomness!',
      html: output,
  };

  // send the email
  mailgun.messages().send(data, function (error, body) {
      console.log(body);
  });
})

/*
 * Prismic documentation to build your project with prismic
 */
app.get('/help', (req, res) => {
  const repoRegexp = /^(https?:\/\/([-\w]+)\.[a-z]+\.(io|dev))\/api(\/v2)?$/;
  const [_, repoURL, name, extension, apiVersion] = PrismicConfig.apiEndpoint.match(repoRegexp);
  const { host } = req.headers;
  const isConfigured = name !== 'your-repo-name';
  res.render('help', {
    isConfigured,
    repoURL,
    name,
    host,
  });
});

/*
 * Preconfigured prismic preview
 */
app.get('/preview', (req, res) => {
  const { token } = req.query;
  if (token) {
    req.prismic.api.previewSession(token, PrismicConfig.linkResolver, '/').then((url) => {
      const cookies = new Cookies(req, res);
      cookies.set(Prismic.previewCookie, token, { maxAge: 30 * 60 * 1000, path: '/', httpOnly: false });
      res.redirect(302, url);
    }).catch((err) => {
      res.status(500).send(`Error 500 in preview: ${err.message}`);
    });
  } else {
    res.send(400, 'Missing token from querystring');
  }
});
