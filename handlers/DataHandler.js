//SQL SETNINGER
var mysql = require('promise-mysql');
//var SearchClass = require('../routes/search');

var pool = mysql.createPool({
  //Proterties...
  host: 'mysql.stud.iie.ntnu.no',
  user: 'g_b_8e',
  password: 'zZrI4wg8',
  database: 'g_b_8e'
});

var DataHandler = function() {
   this.data = getAllData;
   this.size = getSize;
   this.insert = insertData;
};

// var search = new SearchClass();
// exports.search = search;
<<<<<<< HEAD

function findImagesFromWord(req, res){

}
=======
//
// function findImagesFromWord(req, res){
//
// }
>>>>>>> pythontest

//Getting all data
function getAllData(req, res){
  var sql = "select * from data";

  pool.getConnection().then(
    function(connection){
      console.log('connected');
      connection.query(sql).then(
        function(rows){
          res.json(200, rows);
          connection.destroy();
          return;
        },
        function(error){
          console.log('error quering');
          res.json(500, error);
          connection.destroy();
          return;
        }
      )
    },
    function(error){
      console.log('error getting connection');
      res.json(500, error);
      return;
    }
  )
};

//Get with paramters in URL
function getSize(req,res){
  var name=req.params.name;

  var sql = "select data.size from data where data.name = ?";
  var inserts = [name];
  sql=mysql.format(sql, inserts);

  pool.getConnection().then(
    function(connection){
      console.log('connected getSize');
      connection.query(sql).then(
        function(rows){
          res.json(200, rows);
          connection.destroy();
          return;
        },
        function(error){
          console.log('error quering');
          res.json(500, error);
          connection.destroy();
          return;
        }
      )
    },
    function(error){
      console.log('error getting connection');
      res.json(500, error);
      return;
    }
  )
};

// Inserting data to DB
function insertData(req,res){
  var name=req.body.name;
  var text = req.body.text;
  var size = req.body.size;

  var sql = "insert into data (name, text, size) values (?,?,?)";
  var inserts=[name, text, size];
  sql=mysql.format(sql, inserts);

  pool.getConnection().then(
    function(connection){
      console.log('connected');
      connection.query(sql).then(
        function(rows){
          res.json(200, rows);
          connection.destroy();
          return;
        },
        function(error){
          console.log('error quering');
          res.json(500, error);
          connection.destroy();
          return;
        }
      )
    },
    function(error){
      console.log('error getting connection');
      res.json(500, error);
      return;
    }
  )
};


module.exports = DataHandler;
