var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  //Proterties...
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testDB'
});

connection.connect(function(error){
  if(!!error){
    console.log('error');
  }else{
    console.log('connected');
  }
});
