'use strict';


const url = require('url');
const querystring = require('querystring');

module.exports = (req) => {

return new Promise( (resolve, reject) => {

req.url = url.parse(req.url);
req.url.query = querystring.parse(req.url.query);
resolve(req);

reject();
})
};
