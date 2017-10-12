'use strict';


const http = require('http');
const router = require('../lib/router.js');
const Sushi = require('../model/simpleResource.js');
const uuidv4 = require('uuid/v4');


var storageOfRouters = {};

router.post('/api/Sushi', (req,res) => {
  let body = req.body;
  if(!req.body.content){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
  let sushi = new Sushi();
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(sushi));
  res.end();
});

router.get
