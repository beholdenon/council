var client = require('./contentfulClient').client;

function getQuotes (query) {
  query = query || {}
  query.content_type = 'quotes';
  query.include = 10;
  return client.getEntries(query);
}
module.exports = {
  getQuotes
}
