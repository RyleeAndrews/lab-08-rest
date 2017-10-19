'use strict';
const urlParser = require('../lib/urlparser.js');
const requestParser = require('../lib/request-parser.js');


const routes = {
  GET:{},
  POST:{},
  PUT:{},
  DELETE:{},
};


const router = module.exports = {};


router.get = (pathname,callback) => {
  routes.GET[pathname] = callback;
};

router.post = (pathname,callback) => {
  routes.POST[pathname] = callback;
};

router.put = (pathname,callback) => {
  routes.PUT[pathname] = callback;
};

router.delete = (pathname,callback) => {
  routes.DELETE[pathname] = callback;
};


router.route = (req,res) => {

  requestParser(req)
  .then( (req) => {
    let routeHandler = routes[req.method][req.url.pathname];

    if(routeHandler){
      return routeHandler(req,res);
    }
    else{
      console.log('Not_Found',req.url.pathname);
      res.writeHead(404);
      res.end();
    }
  }
).catch(
    (err) => {
      console.log('Invalid_Request', err);
      res.writeHead(400);
      res.end();
    }
  );
};
