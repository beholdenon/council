var express = require('express');
var router = express.Router();
var events = require('../services/events.js')

router.use(function (req, res, next) {
  events.getEvents().then(function (eventsCollection) {
    req.events = eventsCollection.items;
    console.log(JSON.stringify(req.events));
    next();
  }).catch(function (err) {
    console.log('events.js - getHomepage (line 23) error:', JSON.stringify(err,null,2))
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
	res.render('events', { 'events': req.events, 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': 'Events - Re-Elect Robert Holden For City Council - District 30' });
});

module.exports = router;
