'use strict';


const url = require('url');
const querystring = require('querystring');
const urlParser = require('../lib/urlparser.js');

const requestParser = module.exports = (req,cb) => {
  return new Promise( (resolve,reject) => {

    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

    if(! (req.method === 'POST' || req.method === 'PUT')){
      resolve(req);

      let text = '';

      req.on('data', (buffer) => {
        text += buffer.toString();
      });

      req.on('end', (err) => {
        req.text = text;

        try{
          req.body = JSON.parse(text);
          cb(null);
        } catch(err) {
          cb(err);
        }
      });

      req.on('error', reject);
    }else{
      req.text = '',
      req.body = '',
      cb(null);
    }
  });
};
