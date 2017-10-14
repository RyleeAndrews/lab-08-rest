'use strict';

const uuidv4 = require('uuid/v4');
module.exports = function Sushi(name,fish){
  this.id = uuidv4();
  this.name = name;
  this.fish = fish;
};
