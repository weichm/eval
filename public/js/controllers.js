var evalApp = angular.module('evalApp', []);

evalApp.controller('evalCtrl', function($scope) {
	  $scope.lehrer = [
	    {"bez":"StD","geschl":"m","kurz":"Sta","name":"Star","titel":"","vorname":"Wilhelm"},
	    {"bez":"OStD","geschl":"m","kurz":"Ams","name":"Amsel","titel":"Dr.","vorname":"Kurt"},
	    {"bez":"StRef","geschl":"w","kurz":"Fin","name":"Fink","titel":"","vorname":"Friederike"},
	    {"bez":"StR","geschl":"w","kurz":"Bun","name":"Buntspecht","titel":"","vorname":"Inka"},
	    {"bez":"StR","geschl":"w","kurz":"Dro","name":"Drossel","titel":"","vorname":"Monika"},
	    {"bez":"StR","geschl":"m","kurz":"Kib","name":"Kibitz","titel":"","vorname":"Susi"}
	  ];
});
