const express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.listen(3000);

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "https://cdn.jsdelivr.net"],
            "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            "script-src-elem": ["'self'", "https://cdn.jsdelivr.net"],
            "img-src": ["'self'", "data:"],
        },
    })
);

app.use('/css', express.static(__dirname + '/css'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));


// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${res.get('location')}&lon=${geoLng}&units=imperial&appid=${api}`;
// const api = "3e38aab197a9815156e4c68dac537867aaaaaa";
// async function getWeather(url) {
//     try {
//         const weather = await fetch(url).json();
//         console.info(weather);
//         return weather;
//     } catch (err) {
//         console.error("error:", err);
//     }
// }



title = {
    page: 'Home Page - Benchmark',
    tech: 'Express JS'
};
app.get('/', (req, res) => {

    res.render('index', { title });
});
app.use((req, res) => {
    res.status(404).render('index');
});