const express = require('express');
const morgan = require('morgan');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = new express();

const environment = 'dev';
let morgan_mode = 'dev';
app.locals.pretty = true;

if (process.env.NODE_ENV === 'production') {
    environment = 'production';
    morgan_mode = 'tiny';
    app.lodals.pretty = false;
}

app.use(morgan(morgan_mode));

app.modules = {};
app.modules.csrfProtection = csrf({ cookie: true })
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// charger moment avec la locale francaise
app.locals.moment = require('./moment-locale');
app.set('view engine', 'pug');

// servir les fichiers statics avant les routes
require('./static-file')(app);

// chargement des services dans app
require('./services')(app);
// chargement des controllers dans app
require('./controllers')(app);
// enregistrement des routes
require('./routes')(app);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port} on environment: ${environment}`)
});