'use strict';

const expect = require('expect');
const mocha = require('mocha');
const route = require('../model/route.js');
const Sushi = require('../model/simpleResource.js');
const requestParser = require('../lib/request-parser.js');
const superagent = require('superagent');
const server = require('../model/route.js');
server.listen(3000);
describe('post test', () => {
  it('should return 400 for a bad request with an invalid body', () => {
    return superagent.post('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({
      name: "california roll",
    })
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(400);
    });
  });
  it('should return a 200 for a request with a body and a valib body', () => {
    return superagent.post('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({
      name: "california roll",
      fish: "crab",
    })
    .then( res => {
      expect(res.status).toEqual(200);
      expect(res.body.name).toBe("california roll");
      expect(res.body.fish).toBe("crab");
    });
  });
});

describe('get test', () => {
  it('should return 404 for a valid request with no id found', () => {
    return superagent.get('http://localhost:3000/api/Sushi?id=788')
    .set("Content-Type", "application/json")
    .send({
      name:"california roll",
      fish: "crab",
    })
    .then(Promise.reject)
    .catch( res => {
      expect(res.status).toEqual(404);
    });
  });
  it('should return a 400 for a valid request with no id provided', () => {
    return superagent.get('http://localhost:3000/api/Sushi')
    .set("Content-Type", "application/json")
    .send({
      name:"california roll",
      fish: "crab",
    })
    .then(Promise.reject)
    .catch( res => {
      expect(res.status).toEqual(400);
    });
  });
  it('should return a 200 for a request with a valid id', (req) => {
    let checkID = req.url.path.split('=')[1];
    return superagent.get(`http://localhost:3000/api/Sushi?=${checkID}`)
    .set("Content-Type", "application/json")
    .send({
      name:"california roll",
      fish: "crab",
    })
    .then( res => {
      expect(res.status).toEqual(200);
    })
  });
});
