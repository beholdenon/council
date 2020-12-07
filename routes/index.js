var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
	axios.get('https://reqres.in/api/products/3')
    .then(response => {
    	console.log(response.data);
        res.render('index', { data: response.data, title: 'Re-Elect Robert Holden For City Council - District 30' });

    })
    .catch(error => {
        console.log(error);
    });
});

module.exports = router;
