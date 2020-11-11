const { render } = require('ejs')
const express = require('express')
//const { url } = require('inspector')
const path = require('path')
var url = require('url');

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .get('/postaldisplay', function (req, res) {
    var requestURL = url.parse(req.url, true);

    console.log("Query parameters: " + JSON.stringify(requestURL.query));

    var postalType = requestURL.query.postalType;
    var weight = requestURL.query.weight;

    var result = 0;

    if (postalType == "letterS") {
      result = lettersSCalc(weight);
    } else if (postalType == "lettersM") {
      result = lettersMCalc(weight);
    } else if (postalType == "envelopes") {
      result = envelopeCalc(weight);
    } else if ( postalType == "parcels") {
      result = parcelsCalc(weight);
    } 

    var params = {postalType: postalType, weight: weight, result: result};
    res.render('pages/postaldisplay', params);
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function lettersSCalc(weight) {
    var result;
    
    if (weight <= 1) {
      return result = 0.55;
    } else if (weight <= 2) { 
      return result = 0.70;
    } else if (weight <= 3) {
      return result = 0.85;
    } else if (weight <= 3.5) {
      return result = 1.00;
    } else {
      return result = -1;
    }
  }

  function lettersMCalc(weight) {
    var result;

    if (weight <= 1) {
      return result = 0.50;
    } else if (weight <= 2) { 
      return result = 0.65;
    } else if (weight <= 3) {
      return result = 0.80;
    } else if (weight <= 3.5) {
      return result = 0.95;
    } else {
      return result = -1;
    }
  }

  function envelopeCalc(weight){
    var result;

    if (weight <= 1) {
      return result = 1.00;
    } else if (weight <= 2) { 
      return result = 1.20;
    } else if (weight <= 3) {
      return result = 1.40;
    } else if (weight <= 4) {
      return result = 1.60;
    } else if (weight <= 5) {
      return result = 1.80;
    } else if (weight <= 6) {
      return result = 2.00;
    } else if (weight <= 7) {
      return result = 2.20;
    } else if (weight <= 8) {
      return result = 2.40;
    } else if (weight <= 9) {
      return result = 2.60;
    } else if (weight <= 10) {
      return result = 2.80;
    } else if (weight <= 11) {
      return result = 3.00;
    } else if (weight <= 12) {
      return result = 3.20;
    } else if (weight <= 13) {
      return result = 3.40;
    }
    else {
      return result = -1;
    }
  }

  function parcelsCalc(weight) {

    if (weight <= 4) {
      return result = 3.80;
    } else if (weight <= 5) { 
      return result = 4.60;
    } else if (weight <= 6) {
      return result = 4.85;
    } else if (weight <= 7) {
      return result = 4.60;
    } else if (weight <= 8) {
      return result = 4.80;
    } else if (weight <= 9) {
      return result = 5.30;
    } else if (weight <= 10) {
      return result = 5.20;
    } else if (weight <= 11) {
      return result = 5.40;
    } else if (weight <= 12) {
      return result = 5.60;
    } else if (weight <= 13) {
      return result = 5.80;
    } else {
      return result = -1;
    }
  }