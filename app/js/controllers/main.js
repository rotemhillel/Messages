'use strict';

var app = angular.module('commentsApp');

app.controller('MainCtrl', function ($scope, $http) {
    $scope.allMessages = [];
    $http.get('http://127.0.0.1:3000/messages')
      .then(function(res){
        $scope.allMessages = res.data
      })

    $scope.sendMessage = function() {
      $http.post('http://127.0.0.1:3000/new_message', {'email': $scope.user_email, 'message': $scope.user_message})
        .then(function(res) {
          $scope.allMessages.push(res.data)
      })
      $scope.user_email = ''
      $scope.user_message = ''
    }

    $scope.hash = function (str) {
      return md5(str);
    }
  });
