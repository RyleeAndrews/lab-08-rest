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

  urlParser(req);
  let routeHandler = routes[req.method][req.url.pathname];
  console.log(routeHandler);
  requestParser(req)
  .then( () => {
    console.log('ahg');
    routeHandler(req,res);

  }
).catch(
    err => console.log('ghgh')
  )
  }
