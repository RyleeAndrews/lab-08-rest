'use strict';


const url = require('url');
const querystring = require('querystring');
const urlParser = require('../lib/urlparser.js');

const requestParser = module.exports = (req) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  return new Promise( (resolve,reject) => {




    if(req.method === 'POST' || req.method === 'PUT'){


    let text = '';

    req.on('data', (data) => {
      text += data.toString();
    });

    req.on('end', () => {
      req.text = text;
      try {
        req.body = JSON.parse(text);

        resolve(req);
      }catch(e){
        reject(e);
      }
    });
    req.on('error', reject);

}
});
}
