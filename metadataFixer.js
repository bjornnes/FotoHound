var fs  = require("fs");

var clientPath = 'IMTestFolder/';
var serverPath = 'images/'+clientPath;
var array = fs.readFileSync(serverPath+'FileList.txt').toString().split('\n');

function createFileList(callback){
  var type = '.txt'
  var json = array.map(function(d){
    var txt_path = serverPath+d.replace('\r','')+'.txt';
    var description = fs.readFileSync(txt_path).toString()
    //console.log(description);
    return {src : clientPath+d.replace('\r','')+'.jpg' , desc : description, medium: clientPath+'1600x900-data-out-114-47044774-image.jpg', big: clientPath+'1600x900-data-out-114-47044774-image.jpg'};
  });
  callback(json);
}

exports.createFileList = createFileList;
