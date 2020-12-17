var express = require('express');
var router = express.Router();
var homepage = require('../services/homepage.js')

router.use(function (req, res, next) {
  homepage.getHomepage().then(function (homepageCollection) {
    req.homepage = homepageCollection.items;
    console.log(JSON.stringify(req.homepage));
    next();
  }).catch(function (err) {
    console.log('homepage.js - getHomepage (line 23) error:', JSON.stringify(err,null,2))
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
	res.render('index', { 'homepage': req.homepage, 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/holden-feature-desktop.jpg', 'title': 'Re-Elect Robert Holden For City Council - District 30' });
});

module.exports = router;
