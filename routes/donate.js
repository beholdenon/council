var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('donate', { title: 'Re-Elect Robert Holden For City Council - District 30' });

});

module.exports = router;
