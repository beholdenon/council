var client = require('./contentfulClient').client;

function getEvents (query) {
  query = query || {}
  query.content_type = 'events';
  query.include = 10;
  query.order = 'fields.date';
  return client.getEntries(query);
}
module.exports = {
  getEvents
}
