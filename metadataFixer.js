var fs  = require("fs");

var path = 'C:\\Users\\Andreas Bergman\\Desktop\\IMTestFolder\\';
var array = fs.readFileSync('C:\\Users\\Andreas Bergman\\Desktop\\IMTestFolder\\filelist.txt').toString().split('\n');

function createFileList(){
  var type = '.txt'
  var json = array.map(function(d){
    var txt_path = path+d.replace('\r','')+'.txt';
    var description = fs.readFileSync(txt_path).toString()
    //console.log(description);
    return {src : path+d.replace('\r','') , desc : description };
  });
}

exports.createFileList = createFileList;
