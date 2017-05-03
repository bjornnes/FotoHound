var fs  = require("fs");

var path = 'IMTestFolder';
var array = fs.readFileSync('IMTestFolder/FileList.txt').toString().split('\n');

function createFileList(){
  var type = '.txt'
  var json = array.map(function(d){
    var txt_path = path+d.replace('\r','')+'.txt';
    var description = fs.readFileSync(txt_path).toString()
    //console.log(description);
    return {src : path+d.replace('\r','')+'.jpg' , desc : description };
  });
}

exports.createFileList = createFileList;
