'use strict';

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
  requestParser(req, (err) => {
    if(err){
      res.writeHead(400);
      res.end();
    }
    let routeHandler = routes[req.method][req.url.pathname];

    if(routeHandler){
      routeHandler(req,res);
    }else{
      res.writeHead(404);
      res.end();
    }
  });
};
