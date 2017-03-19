'use strict';

var app = angular.module('myApp',[]);

app.controller('searchCtrl', function($scope){
  $scope.results = [
    {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'metadataDog'},
    {src: 'http://platowebdesign.com/articles/wp-content/uploads/2014/10/public-domain-images-free-stock-photos-light-sky-silo-windows-lillyphotographer-1024x684.jpg', alt: 'sylinder'},
    {src: 'https://www.colourbox.com/preview/2867364-a-background-of-wood-stock.jpg', alt: 'logs'},
    {src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/C_Stock_at_Ladbroke_Grove_1.jpg', alt: 'train'},
    {src: 'http://stockfresh.com/files/k/kamchatka/m/46/744446_stock-photo-river-on-sunset.jpg', alt: 'river sunset'},
    {src: 'https://www.ethos3.com/wp-content/uploads/2014/11/stock-photo-600x405.jpg', alt: 'flying fish'},
    {src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/This_is_Anfield.jpg/220px-This_is_Anfield.jpg', alt: 'YNWA'},
    {src: 'http://www.freewallpaperfullhd.com/wp-content/uploads/2015/03/wallpapers/two_swans-wallpaper-3840x2160.jpg', alt: 'Swans can be gay'}
    //{src: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/mallard-male-standing.jpg.adapt.945.1.jpg', alt: 'metadataDuck'}
  ];

});
