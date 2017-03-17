'use strict';

var app = angular.module('myApp',[]);

app.controller('searchCtrl', function($scope){
  $scope.results = [
    {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'metadataDog'},
    //{src: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/mallard-male-standing.jpg.adapt.945.1.jpg', alt: 'metadataDuck'}
  ];

});
