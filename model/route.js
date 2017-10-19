'use strict';


const http = require('http');
const router = require('../lib/router.js');
const Sushi = require('../model/simpleResource.js');



var storageOfRouters = {};


router.post('/api/Sushi', (req,res) => {
  const { name, fish} = req.body;
  let sushi = new Sushi(name,fish);

      if(!(req.body.name && req.body.fish)){
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.write('bad request');
        res.end();
        return;
      }

  storageOfRouters[sushi.id] = sushi;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(sushi));
  res.end();
  return;
});

router.get('/api/Sushi', (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;
  console.log(req.url);
  console.log(storageOfRouters);
  let checkID = req.url.path.split('=')[1];
  console.log(checkID);
  if(!checkID){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
    return;
  }

  if(!storageOfRouters[checkID]){
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
  res.write(JSON.stringify(storageOfRouters[checkID]));
  res.end();
  return;
});

router.delete('/api/Sushi', (req,res) => {
  let checkID = req.url.path.split('=')[1];
  if(!checkID){
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('sushi was not found');
    res.end();
    return;
  }
  delete storageOfRouters[checkID];
  res.writeHead(204, {
    'Content-Type': 'text/plain',
  });
  res.write(JSON.stringify(storageOfRouters[checkID]));
  res.end();
});

const server = module.exports = http.createServer(router.route);
