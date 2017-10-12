'use strict';

const uuidv4 = require('uuid/v4');
module.exports = function Sushi(uuid,name,fish){
  this.uuid = uuidv4();
  this.name = name;
  this.fish = fish;
};
