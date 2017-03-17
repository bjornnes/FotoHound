'use strict';

var angular = require('angular');


var app = angular.module('myApp',[]);



app.directive('myTodo', function(){
  return{
    restict: 'EA',
    templateUrl: '../templates/todo.tpl.html',
    scope:{
      list: '=',
      title: '@'
    }
  };
});


app.controller('main', function($scope){
  $scope.todo = [
    {name: 'Create a custom directive', completed: true},
    {name: 'Learn about restrict', completed: true},
    {name: 'Master scopes', completed: false}
  ];
});
