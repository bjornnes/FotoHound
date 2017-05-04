

function rank(words, unsorted, callback){
  var hits = unsorted;
  for(var hit in hits){
    var score = 0;
    hits[hit].hits =  [];
    for(var word in words){
      if(hits[hit].desc.toLowerCase().indexOf(words[word].word)>-1){
        score += words[word].prob;
        hits[hit].hits[hits[hit].hits.length] = words[word].word;
      }
    }
    hits[hit].score=score;
  }


  hits.sort(function(a,b){
    return b.score - a.score;
  });
  callback(hits);
}
exports.rank = rank;
