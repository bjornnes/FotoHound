//SQL SETNINGER
var mysql = require('promise-mysql');

var pool = mysql.createPool({
  //Proterties...
  host: 'mysql.stud.iie.ntnu.no',
  user: 'g_b_8e',
  password: 'zZrI4wg8',
  database: 'g_b_8e'
});

var DataHandler = function() {
   this.data = getAllData;
};

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
module.exports = DataHandler;
