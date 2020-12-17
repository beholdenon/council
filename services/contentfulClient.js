if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log(process.env.CONTENTFUL_API_TOKEN);

var contentful = require('contentful')
var config = require('../package.json').config || {}

var client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID
})

exports.client = client