(function(){
  'use strict';
  angular.module('lls-golf')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.x = document.documentElement.clientWidth;
    $scope.y = document.documentElement.clientHeight - 40;
    $scope.ballX = ((5 * $scope.x)/6);
    $scope.ballY = ((7 * $scope.y)/8);

    window.addEventListener('deviceorientation', function(data){
      $scope.data = data;
      console.log(data);
      $scope.$digest();
    });
  }]);
})();
