var HashMap = require('hashmap');

var map = [ { word: 'flask', prob: 0.7164263129234314 },
  { word: 'jar', prob: 0.7059789299964905 },
  { word: 'bag', prob: 0.6804860830307007 },
  { word: 'keg', prob: 0.6657484769821167 },
  { word: 'crate', prob: 0.6640274524688721 },
  { word: 'mug', prob: 0.6619930267333984 },
  { word: 'thermos', prob: 0.6413220167160034 },
  { word: 'syringe', prob: 0.6376755237579346 },
  { word: 'bottles', prob: 1.5997835993766785 },
  { word: 'bottled', prob: 0.7241122126579285 },
  { word: 'milkbottle', prob: 0.7220813035964966 },
  { word: 'halfbottles', prob: 0.7143462896347046 },
  { word: 'bottleo', prob: 0.7110905647277832 },
  { word: 'bottler', prob: 0.7074062824249268 },
  { word: 'halfbottle', prob: 0.7059624195098877 },
  { word: 'bottlecap', prob: 0.7052024602890015 },
  { word: 'cans', prob: 1.350757122039795 },
  { word: 'bottlecaps', prob: 0.6941943764686584 },
  { word: 'bottle', prob: 2.01}
 ];
var map = {};
for(var i in s){
  map[s[i].word] = s[i];
}

  var searchText = 'U.S. Democratic presidential candidate Hillary Clinton answers questions from reporters on her campaign plane enroute to a campaign stop in Moline, Illinois, United States September 5, 2016.  REUTERS/Brian Snyder';

  var mapEz = [
    {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'metadataDog', hits: ['bottles', 'cans', 'milkbottle']},
    {src: 'http://platowebdesign.com/articles/wp-content/uploads/2014/10/public-domain-images-free-stock-photos-light-sky-silo-windows-lillyphotographer-1024x684.jpg', alt: 'sylinder', hits: ['mug']},
    {src: 'https://www.colourbox.com/preview/2867364-a-background-of-wood-stock.jpg', alt: 'logs', hits: ['bottlecap', 'crate']},
    {src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/C_Stock_at_Ladbroke_Grove_1.jpg', alt: 'train', hits: ['jar', 'flask']},
    {src: 'http://stockfresh.com/files/k/kamchatka/m/46/744446_stock-photo-river-on-sunset.jpg', alt: 'river sunset', hits: ['syringe']},
    {src: 'https://www.ethos3.com/wp-content/uploads/2014/11/stock-photo-600x405.jpg', alt: 'flying fish', hits: ['bottler', 'bottles']},
    {src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/This_is_Anfield.jpg/220px-This_is_Anfield.jpg', alt: 'YNWA', hits : ['bottles', 'cans', 'halfbottles']}
  ];

  var mapHd = [
    {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'metadataDog', desc: 'A bottle is a rigid container with a neck that is narrower than the body and a mouth'},
    {src: 'http://platowebdesign.com/articles/wp-content/uploads/2014/10/public-domain-images-free-stock-photos-light-sky-silo-windows-lillyphotographer-1024x684.jpg', desc: 'By contrast, a jar has a relatively large mouth or opening which may be as wide as the overall container'},
    {src: 'https://www.colourbox.com/preview/2867364-a-background-of-wood-stock.jpg', alt: 'logs', desc: 'A flask is a type of tooling used to contain a mold in metal casting'},
    {src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/C_Stock_at_Ladbroke_Grove_1.jpg', alt: 'train', desc: 'Flasks are designed with an alignment or registration feature so that the two flasks can be aligned to one another to ensure a casting can be more dimensionally accurate and also in small flasks, so that they cannot be fitted together the wrong way'},
    {src: 'http://stockfresh.com/files/k/kamchatka/m/46/744446_stock-photo-river-on-sunset.jpg', alt: 'river sunset', desc: 'A mug is a type of cup typically used for drinking hot beverages, such as coffee, hot chocolate, soup, or tea'},
    {src: 'https://www.ethos3.com/wp-content/uploads/2014/11/stock-photo-600x405.jpg', alt: 'flying fish', desc: ' Similar to a vacuum flask, a travel mug is usually well-insulated and completely enclosed to prevent spillage[12] or leaking, but will generally have an opening in the cover through which the contents can be consumed during transportation without spillage'},
    {src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/This_is_Anfield.jpg/220px-This_is_Anfield.jpg', alt: 'YNWA', desc : 'Bottles are often recycled according to the SPI recycling code for the material. Some regions have a legally mandated deposit which is refunded after returning the bottle to the retailer.'}
  ]


for(var i = 0; i<mapEz.length; i++){
  var hits = mapEz[i].hits;
  var score = 0;
  for(var j = 0; j<hits.length; j++){
    score += map[hits[j]].prob;
  }
  mapEz[i].score = score;
}

mapEz.sort(function(a, b){
  return b.score - a.score;
});


for(var res in mapHd){
  var score = 0;
  mapHd[res].hits =  [];
  for(var word in map){
    if(mapHd[res].desc.indexOf(map[word].word)>-1){
      score += map[word].prob;
      mapHd[res].hits[mapHd[res].hits.length] = map[word].word;
    }
  }
  mapHd[res].score=score;
}

mapHd.sort(function(a, b){
  return b.score - a.score;
});

function rankFromDescription(words, searchResults){

}
// console.log(map);
// console.log(mapEz);
console.log(mapHd);
