var fs = require('fs');

var path = 'C:\\Users\\Andreas Bergman\\Desktop\\IMTestFolder\\filelist.txt';

fs.readFile(path, function(err, data) {
          var text = data.toString();
          var array = JSON.parse(data);
          //console.log(JSON.stringify(data2));
  });

  function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
      remaining += data;
      var index = remaining.indexOf('\n');
      while (index > -1) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        func(line);
        index = remaining.indexOf('\n');
      }
    });

    input.on('end', function() {
      if (remaining.length > 0) {
        func(remaining);
      }
    });
  }

  function func(data) {
    for (i in data){

    }
    console.log(path + data);
  }

  var input = fs.createReadStream(path + 'filelist.txt');
  readLines(input, func);
