
//Variables
const express = require('express');
const chalk   = require('chalk')

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

//Middleware for the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Middleware for the static files located in public
app.use(express.static(path.join(__dirname, 'public')));

//Middleware for the partials
hbs.registerPartials(__dirname + "/views/partials");

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beer => res.render('random-beer', {beer}))
  ;
});







app.listen(3000, () => console.log(chalk.bgBlue('🏃‍ on port 3000')));
