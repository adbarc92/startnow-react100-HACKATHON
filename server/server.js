const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

require('dotenv').config();

app.get('/quote', (req, res) => {
  axios({
    method: 'post',
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY
    }
  })
    .then(response => res.send(response.data))
})

app.get('/image', (req, res) => {
  console.log('Query:', req.query);
  axios({
    method: 'get',
    url: 'https://contextualwebsearch-search-image-v1.p.mashape.com/api/Search/ImageSearchAPI?autocorrect=true&count=1&q=' + req.query.author,
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY
    }
  })
    .then(response => res.send(response.data))
})

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

module.exports = app;
