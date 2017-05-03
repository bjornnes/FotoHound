var exec = require('child_process').execFile;

var cmd = 'C:\\Program Files (x86)\\IMTest\\IMSearch.exe';
var search_args = 'president or man'
exec(cmd,[search_args], function (err, data) {
  if (err === null) {
      console.log('success');
  } else {
      console.log('error');
  }
});
