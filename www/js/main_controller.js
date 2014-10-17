(function(){
  'use strict';
  angular.module('lls-golf')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    /*$scope.x = document.documentElement.clientWidth;
    $scope.y = document.documentElement.clientHeight - 40;
    $scope.ballX = ((5 * $scope.x)/6);
    $scope.ballY = ((7 * $scope.y)/8);*/
    var can,
        ctx;

    function init(){
      can = document.getElementById('golfCanvas');
      ctx = can.getContext('2d');
      window.addEventListener('resize', resizeCanvas, true);
      window.addEventListener('orientationchange', resizeCanvas, true);
      resizeCanvas();
      ctx.fillStyle= 'red';
      ctx.fillRect(5,5,25,25);

    }

    function resizeCanvas(){
      can.height = window.innerHeight;
      can.width = window.innerWidth;
    }

    window.addEventListener('deviceorientation', function(data){
      $scope.data = data;
      $scope.$digest();
    });

    init();
  }]);
})();
