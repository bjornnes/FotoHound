//
// var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
//     .map(function(d) {
//       return {text: d, size: 10 + Math.random() * 90};
//     });
// console.log(words);
var words = [ { word: 'liedetector', prob: 0.5786182880401611 },
  { word: 'breathalyzer', prob: 0.5662480592727661 },
  { word: 'urinalysis', prob: 0.5592706203460693 },
  { word: 'hotfire', prob: 0.5490097999572754 },
  { word: 'evaluation', prob: 0.5427864193916321 },
  { word: 'mantoux', prob: 0.5314249396324158 },
  { word: 'tests', prob: 1.716922104358673 },
  { word: 'testing', prob: 1.5075536966323853 },
  { word: 'tested', prob: 0.7337702512741089 },
  { word: 'testings', prob: 0.72191321849823 },
  { word: 'pretest', prob: 1.2437739968299866 },
  { word: 'retest', prob: 1.2591490149497986 },
  { word: 'pretesting', prob: 0.675190806388855 },
  { word: 'testretest', prob: 0.6711198091506958 },
  { word: 'pretests', prob: 0.6610748767852783 },
  { word: 'retesting', prob: 0.6560254096984863 } ];


  // for(var i=10; i<220; i+= 12){
  //   var maxdiff;
  //   for(var j=9; j<100; j+= 9){
  //     for(var d in words){
  //       var val;
  //       val = words[d].prob;
  //       console.log(i,j,val,(Math.log(Math.pow((val)*i,j)))-350);
  //     }
  //     console.log('maxdiff', ((Math.log(Math.pow((words[6].prob)*i,j)))-350)-((Math.log(Math.pow((words[5].prob)*i,j)))-350));
  //     console.log('_____________________________');
  //   }
  // }

  for(var d in words){
        var val;
        val = words[d].prob;
        console.log( val,(Math.log(Math.pow((val)*7,70)))-80);
      }
