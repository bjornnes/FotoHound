//dependencies
var express = require('express');
var router = express.Router();


router.get('/data',function(res,req){
  res.send('API is working');
});
// Return router
module.exports = router;
