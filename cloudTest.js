//
// var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
//     .map(function(d) {
//       return {text: d, size: 10 + Math.random() * 90};
//     });
// console.log(words);


var socket = require('./socketTest');
socket.word2vec('woman', function(result){
  var res = result.map(function(d){
    var dd = (''+d).split(',');
    return {word: dd[0], prob: dd[1]};
  })
  console.log(res);
});
