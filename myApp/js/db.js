var express = require('express');
var mysql = require('mysql');
var app = express();


// 
// var connection = mysql.createConnection({
//   //Proterties...
//   host: 'mysql.stud.iie.ntnu.no',
//   user: 'g_b_8e',
//   password: 'zZrI4wg8',
//   database: 'g_b_8e'
// });
//
// connection.connect(function(error){
//   if(!!error){
//     console.log('error');
//   }else{
//     console.log('connected');
//   }
// });

exports.connectionInfo = {
  "host": 'mysql.stud.iie.ntnu.no',
  "user": 'g_b_8e',
  "password": 'zZrI4wg8',
  "database": 'g_b_8e'
};
