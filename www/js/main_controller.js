(function(){
  'use strict';
  angular.module('lls-golf')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    /*$scope.x = document.documentElement.clientWidth;
    $scope.y = document.documentElement.clientHeight - 40;
    $scope.ballX = ((5 * $scope.x)/6);
    $scope.ballY = ((7 * $scope.y)/8);*/
    $scope.canvasHeight = window.innerHeight;
    $scope.canvasWidth = window.innerWidth;

    function init(){
      var can = document.getElementById('golfCanvas'),
          ctx = can.getContext('2d');

      function drawHole(){
        ctx.fillStyle= 'black';
        ctx.fillRect(20,20, 50, 50);
        /*ctx.beginPath();
        ctx.arc(10, 10, 5, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();*/
      }
      drawHole();
    }

    window.addEventListener('deviceorientation', function(data){
      $scope.data = data;
      console.log(data);
      $scope.$digest();
    });
    init();
  }]);
})();
