if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var router = express.Router();
var homepage = require('../services/homepage.js');
var quotes = require('../services/quotes.js');
var FB = require('fb');
FB.setAccessToken(process.env.FB_TOKEN);

router.use(function (req, res, next) {
  homepage.getHomepage().then(function (homepageCollection) {
    req.homepage = homepageCollection.items;

    FB.api(
      "/bobholdencitycouncil/published_posts?limit=3&date_format=U",
      { fields: ['full_picture', 'message', 'permalink_url', 'created_time'] },
      function (response) {
        if (response && !response.error) {
          req.facebook = response.data;
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
    req.allQuotes = quotesCollection.items;
  }).
  catch(function (err) {
    console.log('quotes.js - getHomepage (line 23) error:', JSON.stringify(err,null,2))
    next();
  });


});

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
  res.render('index', { 'facebook': req.facebook, 'homepage': req.homepage, 'allQuotes': req.allQuotes, 'quotes': req.quotes, 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': 'Re-Elect Robert Holden For City Council - District 30' });
});

module.exports = router;
