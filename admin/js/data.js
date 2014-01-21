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
	var klassen = [					//primary key ist klasse
	    {"klasse":"5A", "jgst":"5"},
	    {"klasse":"5B", "jgst":"5"},
	    {"klasse":"5C", "jgst":"5"},
	    {"klasse":"5D", "jgst":"5"}
	  ];
	items.queryLehrer = function() {
	  return lehrer
	}
        items.addLehrer = function(newLehrer) {
          var unique = items.isUnique(newLehrer, lehrer, "kurz")
          if(unique){
            lehrer.push(newLehrer)
          }
          return unique
        }
        items.delLehrer = function(i) {
          lehrer.splice(i,1)
        }
	items.queryKlassen = function() {
          console.log(klassen)
	  return klassen
	}
        items.addKlasse = function(newKlasse) {
          var unique = items.isUnique(newKlasse, klassen, "klasse")
          if(unique){
            klassen.push(newKlasse)
          }
          return unique
          /*
          ODER:
          if(items.isUnique(newKlasse, klassen, "klasse"){
            klassen.push(newKlasse)
            return true
          }
          return false
          */
        }
        items.setKlasse = function(i, newKlasse) {
          klassen[i]=newKlasse
          //console.log(newKlasse)
        }
        items.delKlasse = function(i) {
          klassen.splice(i,1)
        }
	return items
});
