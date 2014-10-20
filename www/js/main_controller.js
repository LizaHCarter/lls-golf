(function(){
  'use strict';
  angular.module('lls-golf')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'CaddyHack';
    $scope.seconds = 5;
    $scope.data = {};
    $scope.results = '';
    $scope.gameStarts = false;
    $scope.gameOver = false;
    $scope.greeting = true;
    $scope.startTimer = false;

    var can,
        ctx,
        timer,
        startGame,
        accel,
        height = window.innerHeight,
        width = window.innerWidth,
        ballX = Math.floor(Math.random()*width + 1),
        ballY = Math.floor(Math.random()*height + 1),
        deltaX = 5,
        deltaY = 5,
        x = 0,
        y = 0;

//MAIN FUNCTIONS
    function init(){
      can = document.getElementById('golfCanvas');
      ctx = can.getContext('2d');
      window.addEventListener('resize', resizeCanvas, true);
      window.addEventListener('orientationchange', resizeCanvas, true);
      resizeCanvas();
      debugger;
      $scope.startTimer();
      startGame = $interval(draw, 12);
      return startGame;
    }

    function draw(){
      resetCanvas();
      ctx.fillStyle = 'green';
      drawCanvasOutline(0, 0, width, height);
      ctx.fillStyle = 'black';
      drawCircle(ballX, ballY, 20, 20);
      ctx.fillStyle = 'white';
      drawCircle(x, y, 10);
      checkBallBounds();

      x = deltaX;
      y = deltaY;

      checkBallPosition();
    }

    //connects to gyroscope hardware and returns gyroscope data
    window.addEventListener('deviceorientation', function(data){
      $scope.data = data;
      //gyroscope changes converted to change in ball positioning
      deltaX += data.gamma/2;
      deltaY += data.beta/2;

      $scope.$digest();
    });

//HELPER FUNCTIONS

    //resizes the canvas for the screen
    function resizeCanvas(){
      can.height = window.innerHeight;
      can.width = window.innerWidth;
    }

    //clears canvas
    function resetCanvas(){
      ctx.clearRect(0,0, width, height);
    }

    //draws the hole & ball
    function drawCircle(x, y, r){
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2, true);
      ctx.fill();
    }

    //draws canvas outline
    function drawCanvasOutline(x, y, w, h){
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
    }

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      getAcceleration();
    }

    function getAcceleration(){
      var options = {frequency: 12};
      accel = navigator.accelerometer.watchAcceleration(onAccelSuccess, onError, options);
    }

    function onAccelSuccess(data){
      $scope.data = data;
      deltaX += -data.x/2;
      deltaY += data.y/2;
      $scope.$digest();
    }

    function onError(){
      console.log('error');
    }

    function checkBallPosition(){
      if(deltaX >= ballX - 30 && deltaX <= ballX +30 && deltaY >= ballY - 30 && deltaY <= ballY + 30){
        $interval.cancel(startGame);
        $scope.gameStarts = false;
        $scope.gameOver = true;
        $scope.results = 'Hole in One!';
        $scope.$digest();
      }
    }

    function checkBallBounds(){
      if(deltaX > width || deltaX < 0){
        deltaX = x;
      }
      if(deltaY > height || deltaY < 0){
        deltaY = y;
      }
    }

// TIMER FUNCTIONS

    function reduceTime(){
      $scope.seconds -= 1;
      if($scope.seconds <= 0){
        navigator.vibrate(300);
        $scope.endTimer();
      }
    }
    $scope.startTimer = function(){
      timer = $interval(reduceTime, 1000);
    };
    $scope.endTimer = function(){
      $interval.cancel(timer);
      $scope.gameOver = true;
    };

// ANGULAR FUNCTIONS
    $scope.startGame = function(){
      $scope.gameStarts = true;
      $scope.greeting = false;

      init();
    };

  }]);
})();
