'use strict';


const http = require('http');
const router = require('../lib/router.js');
const Sushi = require('../model/simpleResource.js');
const uuidv4 = require('uuid/v4');
const urlParser = require('../lib/urlparser.js');
const requestParser = require('../lib/request-parser.js');

var storageOfRouters = {};


router.post('/api/Sushi', (req,res) => {
  let body = req.body;
  if(!req.body.content){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
    return;
  }
  let sushi = new Sushi();
  storageOfRouters[sushi.uuidv4] = sushi;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(sushi));
  res.end();
});

router.get('/api/Sushi', (req,res) => {
  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
    return;
  }
  if(!storageOfRouters[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('not found');
    res.end();
    return;
  }
  res.writeHead(200,{
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storageOfRouters[req.url.query.id]));
  res.end();
});

router.delete('/api/Sushi', (req,res) => {
  if(!req.url.query.id){
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('sushi was not found');
    res.end();
    return;
  }
  delete storageOfRouters[req.url.query.id];
  res.writeHead(204, {
    'Content-Type': 'text/plain',
  });
  res.write(JSON.stringify(storageOfRouters[req.url.query.id]));
  res.end();
});

const server = module.exports = http.createServer(router.route);
