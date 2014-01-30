var evalApp = angular.module('evalApp', ['ngRoute','EvalData']);

//define routing for app
//see http://viralpatel.net/blogs/angularjs-routing-and-views-tutorial-with-example/

evalApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ShowTeachers', {
    templateUrl: '/admin/templates/lehrer.html',
    controller: 'lehrerCtrl'
  }).
  when('/ShowClasses', {
    templateUrl: '/admin/templates/klassen.html',
    controller: 'klassenCtrl'
  }).
  otherwise({redirectTo: '/ShowTeachers'})
}])

evalApp.controller('lehrerCtrl', function($scope, Items) {
  $scope.lehrer = Items.query({}, {'array':"lehrer"} )

  $scope.addTeacher = function() {
    Items.addLehrer({"kurz":$scope.newKurz,"bez":$scope.newBez,"geschl":$scope.newGeschl,"name":$scope.newName,"titel":$scope.newTitel,"vorname":$scope.newVorname})
  }
  $scope.delTeacher = function(i) {
    Items.delLehrer(i)
  }
});
evalApp.controller('klassenCtrl', function($scope, Items) {
  $scope.klassen = Items.query({}, {'array':"klassen"} )
 
  $scope.addClass = function() {
    var newObj = {"klasse":$scope.newKlasse,"jgst":$scope.newJgst}
    $scope.klassen.push(newObj)
    Items.save({"array": "klassen"}, newObj)
  }
  $scope.delClass = function(i) {
    var myid = $scope.klassen[i].klasse
    $scope.klassen.splice(i,1)
    Items.delete({}, {'array':"klassen", 'id':myid})
  }
  $scope.updateClass = function(i, newObj) {
    $scope.klassen[i] = newObj
    var myid = $scope.klassen[i].klasse
    Items.save({"array": "klassen", "id": myid}, newObj)
  }
  $scope.cancelClass = function() {
    $scope.klassen = Items.query({}, {'array':"klassen"} )
  }
});
