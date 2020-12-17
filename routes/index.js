var express = require('express');
var router = express.Router();
var news = require('../services/news.js')

router.use(function (req, res, next) {
  news.getNews().then(function (newsCollection) {
    req.news = newsCollection.items;
    next();
  }).catch(function (err) {
    console.log('news.js - getNews (line 23) error:', JSON.stringify(err,null,2))
    next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.news);
	res.render('index', { 'news': req.news, 'title': 'Re-Elect Robert Holden For City Council - District 30' });
});

module.exports = router;
