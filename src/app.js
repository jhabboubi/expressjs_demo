
// Requires 

const express = require('express');
const env = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const _ = require('lodash');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

// Config env
env.config();
// App
const app = express();
app.listen(3000);
// Register views & engine
app.set('views', 'www/views');
app.set('view engine', 'ejs');

// Middleware & static files
app.use("/css", express.static('www/css'));
app.use("/assets", express.static('www/assets'));
app.use("/js", express.static('www/js'));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

// Config helmet security
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "https://cdn.jsdelivr.net"],
            "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            "script-src-elem": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            "img-src": ["'self'", "data:"],
        },
    })
);






title = {
    page: 'Home Page - Benchmark',
    tech: 'Express JS'
};

// Routes 
app.get('/', (req, res) => {

    res.render('index', { title });
});

app.get('/location/:lat/:lon', (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API}`;

    console.log(url);
    fetch(url)
    .then((res)=> res.json())
    .then((data)=>  res.json({ city: data.name, temp: Math.round(data.main.temp)+'\u2109'}))
    .catch((e)=>console.log(e));
   

});

app.post('/register', (req, res) => {
    console.log(req.body);
    let isSuccess = false;
    if (_.isEmpty(req.body)) {
        isSuccess = false;
    } else {
        isSuccess = true;
    }
    res.redirect('/');

});

app.use((req, res) => {
    res.status(404).render('index');
});