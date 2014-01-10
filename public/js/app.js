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

  $scope.addTeacher = function() {
    Items.addLehrer({"kurz":$scope.newKurz,"bez":$scope.newBez,"geschl":$scope.newGeschl,"name":$scope.newName,"titel":$scope.newTitel,"vorname":$scope.newVorname})
  }
  $scope.delTeacher = function(i) {
    Items.delLehrer(i)
  }
});
evalApp.controller('klassenCtrl', function($scope, Items) {
  $scope.klassen = Items.queryKlassen()

  $scope.addClass = function() {
    Items.addKlasse({"klasse":$scope.newKlasse,"jgst":$scope.newJgst})
  }
  $scope.delClass = function(i) {
    Items.delKlasse(i)
  }
});