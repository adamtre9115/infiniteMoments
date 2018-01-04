const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
var ejsLayouts = require("express-ejs-layouts");

const index = require('./routes/index');
const app = express();
const port = process.env.PORT || 80;

// view engine setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(port, function () {
    console.log("... server listening on port", port)
});

module.exports = app;