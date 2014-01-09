//Create data through a service
//see o'reilly, angularjs, green & seshadri, p.33ff.

var evalData = angular.module('EvalData', []);

evalData.factory('Items', function() {
	var items = {}
	var lehrer = [					//primary key ist "kurz"
	    {"kurz":"Sta","bez":"StD","geschl":"m","name":"Star","titel":"","vorname":"Wilhelm"},
	    {"kurz":"Ams","bez":"OStD","geschl":"m","name":"Amsel","titel":"Dr.","vorname":"Kurt"},
	    {"kurz":"Fin","bez":"StRef","geschl":"w","name":"Fink","titel":"","vorname":"Friederike"},
	    {"kurz":"Bun","bez":"StR","geschl":"w","name":"Buntspecht","titel":"","vorname":"Inka"},
	    {"kurz":"Dro","bez":"StR","geschl":"w","name":"Drossel","titel":"","vorname":"Monika"},
	    {"kurz":"Kib","bez":"StR","geschl":"m","name":"Kibitz","titel":"","vorname":"Susi"}
	  ];
	var klassen = [					//primary key ist nr
	    {"nr": "5A", "klasse":"5A","lkurz":"Sta"},
	    {"nr": "5B", "klasse":"5B","lkurz":"Ams"}
	  ];
	items.queryLehrer = function() {
	  return lehrer
	}
	items.queryKlassen = function() {
	  return klassen
	}
	return items
});
