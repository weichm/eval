var evalApp = angular.module('evalApp', ['ngRoute','EvalData']);

//define routing for app
//see http://viralpatel.net/blogs/angularjs-routing-and-views-tutorial-with-example/

evalApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ShowTeachers', {
    templateUrl: '/public/templates/lehrer.html',
    controller: 'lehrerCtrl'
  }).
  when('/ShowClasses', {
    templateUrl: '/public/templates/klassen.html',
    controller: 'klassenCtrl'
  }).
  otherwise({redirectTo: '/ShowTeachers'})
}])

evalApp.controller('lehrerCtrl', function($scope, Items) {
	  $scope.lehrer = Items.queryLehrer()
	  $scope.klassen = Items.queryKlassen()
});
evalApp.controller('klassenCtrl', function($scope, Items) {
	  $scope.lehrer = Items.queryLehrer()
	  $scope.klassen = Items.queryKlassen()
});
