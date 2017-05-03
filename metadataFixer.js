var fs  = require("fs");

var clientPath = 'IMTestFolder/';
var serverPath = 'client/IMTestFolder/';
var array = fs.readFileSync('client/IMTestFolder/FileList.txt').toString().split('\n');

function createFileList(callback){
  var type = '.txt'
  var json = array.map(function(d){
    var txt_path = serverPath+d.replace('\r','')+'.txt';
    var description = fs.readFileSync(txt_path).toString()
    //console.log(description);
    return {src : clientPath+d.replace('\r','')+'.jpg' , desc : description };
  });
  callback(json);
}

exports.createFileList = createFileList;
createFileList(function(d){
  console.log(d);
});
