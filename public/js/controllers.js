var evalApp = angular.module('evalApp', ['EvalData']);

evalApp.controller('evalCtrl', function($scope, Items) {
	  $scope.lehrer = Items.queryLehrer()
	  $scope.klassen = Items.queryKlassen()
});
