'use strict';


var app = angular.module('app', []);

app.controller('ProjectCtrl', function($scope, $http, socket){

  $scope.messages = [];

  $scope.submit = function(){
    console.log('submit', $scope.yourName);
    socket.emit('message', {text: $scope.yourName});
  };

  $scope.$on('$destroy', function (event) {
     console.log('&&&&&&&&&&&&&&&&&&&  destroy');
     socket.removeListener(this);
  });

  $http.get('/stuff').success(function(data) {
    $scope.stuff = data;
  });

  socket.on('init', function (data) {
     $scope.foo = data.foo;
     $scope.bar = data.bar;

     // Tell node server about new user
     socket.emit('newuser');
  });

  socket.on('connection:new', function (data) {
    $http.get('/stuff').success(function(data) {
       $scope.stuff = data;
    });
  });

  socket.on('message:new', function (data) {
    console.log(data);
    $scope.messages.push(data.message);
  });

  socket.on('user:left', function (data) {
    console.log('--=-=-=- user:left', data);
  });

});


