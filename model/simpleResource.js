'use strict';

const uuidv4 = require('uuid/v4');
module.exports = function Sushi(id,name,fish){
  this.id = id;
  this.name = name;
  this.fish = fish;
};
