var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');
	res.render('bio', { 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', title: 'Bio - Re-Elect Robert Holden For City Council - District 30' });

});

module.exports = router;
