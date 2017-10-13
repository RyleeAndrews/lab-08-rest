'use strict';


const url = require('url');
const querystring = require('querystring');

module.exports = (req) => {
  return new Promise( (resolve,reject) => {
    resolve(req.url = url.parse(req.url));
    reject(err);
  }
);
};
