
var angular = require('angular');
var app = angular.module('myApp',[]);

app.controller('searchCtrl', function($scope){
  /*$scope.results = [
    {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'tool text'}
  ];*/
  $scope.result = {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'tool text'};
});
