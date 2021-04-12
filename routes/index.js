if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var router = express.Router();
var homepage = require('../services/homepage.js');
var quotes = require('../services/quotes.js');
var endorsements = require('../services/endorsements.js');
var FB = require('fb');
FB.setAccessToken(process.env.FB_TOKEN);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

router.use(function (req, res, next) {
  homepage.getHomepage().then(function (homepageCollection) {
    req.homepage = homepageCollection.items;

    FB.api(
      "/bobholdencitycouncil/published_posts?limit=3&date_format=U",
      { fields: ['full_picture', 'message', 'permalink_url', 'created_time'] },
      function (response) {
        console.log(response);
        if (response && !response.error) {
          req.facebook = response.data;
          console.log(req.facebook);
        }
        next();
      }
    );
  }).
  catch(function (err) {
    console.log('homepage.js - getHomepage (line 23) error:', JSON.stringify(err,null,2))
    next();
  });

  quotes.getQuotes().then(function (quotesCollection) {
    var num = Math.floor(Math.random() * quotesCollection.items.length);
    req.quotes = quotesCollection.items[num];
    req.allQuotes = shuffle(quotesCollection.items);

  }).
  catch(function (err) {
    console.log('quotes.js - getHomepage (line 23) error:', JSON.stringify(err,null,2))
    next();
  });

  endorsements.getEndorsements().then(function (endorsementsCollection) {
    req.endorsements = endorsementsCollection.items;
    console.log(req.endorsements);

  }).
  catch(function (err) {
    console.log('endorsements.js - getEndorsements (line 23) error:', JSON.stringify(err,null,2))
    next();
  });


});

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
  res.render('index', { 'endorsements': req.endorsements, 'facebook': req.facebook, 'homepage': req.homepage, 'allQuotes': req.allQuotes, 'quotes': req.quotes, 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': 'Re-Elect Robert Holden For City Council - District 30' });
});

module.exports = router;
