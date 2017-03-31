//SQL SETNINGER
var mysql = require('mysql');
var express = require('express');
var app = express();
var connection = require('../js/db');

var DataHandler = function() {
  this.data = getAllData;
};


var sql = "select * from data";
connection.query(sql, function(error, result){
  if (error){
    throw error;
  } else {
    console.log(result);
  }
})
module.exports = DataHandler;
