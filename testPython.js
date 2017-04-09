var myPythonScriptPath = './pythonScripts/jsonScript.py';

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

var options = {
    mode: 'text',
    scriptPath: './pythonScripts',
    args: ['my First Argument','My Second Argument']
};

PythonShell.run('script.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('--------------- run ---------------')
    console.log('results: %j', results);
});

//pyshell.send('{command: most_similar},{args: man }');
pyshell.send(JSON.stringify([1,2,3,4,5]));

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log('---------------- on ------------------- ');
    //console.log(JSON.stringify([1,2,3,4,5]));
    console.log(message);
});
pyshell.end(function (err) {
    if (err){
        throw err;
    };

    console.log('finished');
});

//
// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });
//
// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };
//
//     console.log('finished');
// });
