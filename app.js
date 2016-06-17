var app;
(function(){
  app = angular.module('api', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('error-toast');
    
    $mdThemingProvider.alwaysWatchTheme(true);
  })  
})();

app.controller('mainController', function($scope, $mdToast){

    $scope.api = api;

    $scope.api.onSuccess = function(message){
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top right')
            .hideDelay(2500)
            .theme("success-toast")
        );
    };

    $scope.api.onError = function(message){
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top right')
            .hideDelay(2500)
            .theme("error-toast")
        );
    };

    $scope.api.onSuccess('Connecting ....');

    $scope.toggleRelay = function() {
        $scope.api.toggleRelay($scope.api.isOn);
    };

    $scope.api.updateUI = function(){
        $scope.$apply();
    };

  $scope.options = {
        chart: {
            type: 'lineChart',
            height: 250,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            duration: 0,    
            yAxis: {
                tickFormat: function(d){
                   return d3.format('.01f')(d);
                }
            },
            xAxis: {
                axisLabel:'Time',
                tickFormat: function(d){
                   return d3.format('.01f')(d);
                }
            }
        }
    };


    $scope.options1 = angular.copy($scope.options);
    $scope.options1.chart.duration = 0;
    $scope.options1.chart.yDomain = [2,16];
    
    $scope.data = [{ values: [], key: 'Random Walk' }];
        
    $scope.run = true;
    
    var x = 20;
     
    setInterval(function(){
	    if (!$scope.run) return;
	    $scope.data[0].values.push({ x: x,	y: 5});
      if ($scope.data[0].values.length > 20) $scope.data[0].values.shift();
	    x++;
	    
      $scope.$apply(); // update both chart
    }, 500);  


});
