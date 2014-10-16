(function(){
  'use strict';
  angular.module('lls-golf')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.greeting = 'hello';
    function success(orientation){
      console.log(orientation.alpha);
      console.log(orientation.beta);
      console.log(orientation.gamma);
      $scope.orientation = orientation;
      $scope.$digest();
    }
    function error(err){
      console.log('error', err);
    }

    $scope.start = function(){
      console.log('starting gyroscope');
      navigator.gyroscope.watchGyroscope(success, error, {frequency:100});
    };
  }]);
})();
