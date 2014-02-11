var evalApp = angular.module('evalApp', ['ngRoute','EvalData']);

sbar = function(text) {
  var sb = angular.element(document.querySelector("#statusbar"))
  sb.html(text)
}
sbarAdd = function(text) {
  var sb = angular.element(document.querySelector("#statusbar"))
  sb.html(sb.html() + text)
}

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
 
  $scope.addObj = function(array, newObj) {
    sbar("Objekt hinzufügen... ")
    Items.save({"array": array}, newObj, function(res){
      if (res.status=="ok") {
        $scope[array].push(newObj) //kein Fehler --> objekt hinzufügen
      }
      sbarAdd(res.message)
    }, function(res){
      sbarAdd("FEHLER!!!")
    })
  }
  $scope.delClass = function(i) {
    var myid = $scope.klassen[i].klasse
    $scope.klassen.splice(i,1)
    Items.delete({}, {'array':"klassen", 'id':myid})
  }
  $scope.updateClass = function(i, obj) {
    $scope.klassen[i] = obj
    var myid = $scope.klassen[i].klasse
    Items.save({"array": "klassen", "id": myid}, obj)
  }
  $scope.cancelClass = function() {
    $scope.klassen = Items.query({}, {'array':"klassen"} )
  }
});
