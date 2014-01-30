/* Idee:
   Nach erfolgreichem Einloggen überprüft roleFactory die entsprechenden routes
     - http://localhost:20080/ --> eingeloggt? (ja: Welcome, nein: Aufforderung, public/login.html zu besuchen)
	 - POST http://localhost:20080/login --> express.urlencoded() --> Überprüfung, ob korrekt? (ja: req.mySession.username setzen, redirect zu /, nein: Fehler)
	 - http://localhost:20080/logout --> req.mySession.reset(), redirect zu /
	 - http://localhost:20080/public --> express.static(__dirname + '/public/')
	 - http://localhost:20080/admin --> roleFactory("admin") --> express.static(__dirname + '/admin/')
	 - http://localhost:20080/ --> 
	 - http://localhost:20080/ --> 
	 - http://localhost:20080/ --> 
*/
var http = require('http')
var fs = require('fs')
var qs = require('querystring')

//https://github.com/mozilla/node-client-sessions
//https://github.com/fmarier/node-client-sessions-sample
//https://hacks.mozilla.org/2012/12/using-secure-client-side-sessions-to-build-simple-and-scalable-node-js-applications-a-node-js-holiday-season-part-3/
var clientSessions = require('client-sessions')

var creds = {
          "a": {pass: "a", role: "admin"},
          "u": {pass: "u", role: "user"}
		    }
var checkPw = function(user, pass) {
  if (creds[user]) {
    return pass == creds[user].pass;
  }
}

//Setup express
var express = require('express')
var app = express()

//Setup http
var httpServer = http.createServer(app)
httpServer.listen(20080)

//Middleware factory: node up & running, p.157
var roleFactory = function(role) {
  return function(req, res, next) {
    console.log("inside role")
	if (creds[req.mySession.username]) {
      if (creds[req.mySession.username].role == role) {
	    next()
	  } else {
	    res.send('You are not authorized. You need to <a href="/public/login.html">login</a>.')
	  }
	} else {
	    res.send('You are not authenticated. You need to <a href="/public/login.html">login</a>.')
	}
  }
}

//Express configuration
//order in which each middleware is given the opportunity to process a request

//http://www.senchalabs.org/connect/logger.html
app.use(express.logger())
// for details: //https://github.com/mozilla/node-client-sessions
// mandatory is only "secret"
// cookie-name defaults to session_state, wird auch immer gesetzt
app.use(clientSessions({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object		
  secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // CHANGE THIS!
}));
app.use(app.router)
//app.use("/admin", roleFactory("admin") )      //commented out for testing purposes
app.use("/admin", express.static(__dirname + '/admin/'));  //Test: http://localhost:20080/admin/test.html
app.use("/public", express.static(__dirname + '/public/'));  //Test: http://localhost:20080/public/index.html

//define routes
//Test: http://localhost:20080/
app.get('/', function (req, res){
  //res.send('hello')	//simple test
  if (req.mySession.username) {
    res.send('Welcome ' + req.mySession.username + '! (<a href="/logout">logout</a>)');
  } else {
    res.send('You need to <a href="/public/login.html">login</a>.');
  }
});

app.post('/login', express.urlencoded(), function (req, res){
  console.log(req.body)
  if (checkPw(req.body.name, req.body.pass)) {
    req.mySession.username = req.body.name;
    console.log(req.mySession.username + ' logged in.');
    res.redirect('/');
  } else {
    res.send('Äh. Wrong user/pw. You need to <a href="/public/login.html">login</a>.')
  }
});

app.get('/logout', function (req, res) {
  req.mySession.reset();
  res.redirect('/');
});


//-------------------send/receive json
/* Sample usage: ArrayIndexOf(array, attribute, value)
 *  --> returns the index in the array where attribute == value
 *  arrayIndexOf2 is a helper function
var i = ArrayIndexOf2(arrMovies, function(obj) {
  return obj.MovieTitle == 'The Matrix';
});
if (-1 != i) {
  alert('Found it! (Psst: take the blue pill!)');
}*/
function arrayIndexOf2(arr, fnc) {
  if (!fnc || typeof (fnc) != 'function') {
    return -1;
  }
  if (!arr || !arr.length || arr.length < 1) return -1;
  for (var i = 0; i < arr.length; i++) {
    if (fnc(arr[i])) return i;
  }
  return -1;
}
function arrayIndexOf(arr, attr, value) {
  var i = arrayIndexOf2(arr, function(obj) {
    if(obj[attr] != undefined) {
      return obj[attr] == value;
    } else {
      return false;
    }
  });
  return i;
} 
/*  var lehrer = [                                        //primary key ist "kurz"
    {"kurz":"Sta","bez":"StD","geschl":"m","name":"Star","titel":"","vorname":"Wilhelm"},
    {"kurz":"Ams","bez":"OStD","geschl":"m","name":"Amsel","titel":"Dr.","vorname":"Kurt"},
    {"kurz":"Fin","bez":"StRef","geschl":"w","name":"Fink","titel":"","vorname":"Friederike"},
    {"kurz":"Bun","bez":"StR","geschl":"w","name":"Buntspecht","titel":"","vorname":"Inka"},
    {"kurz":"Dro","bez":"StR","geschl":"w","name":"Drossel","titel":"","vorname":"Monika"},
    {"kurz":"Kib","bez":"StR","geschl":"m","name":"Kibitz","titel":"","vorname":"Susi"}
  ];
  var klassen = [                                 //primary key ist klasse
              {"klasse":"5A", "jgst":"5"},
              {"klasse":"5B", "jgst":"5"},
              {"klasse":"5C", "jgst":"5"},
              {"klasse":"5D", "jgst":"5"}
          ];
data = {"lehrer":lehrer, "klassen":klassen}
//write to file
var fileLehrer = 'admin/db/lehrer.json'
var fileKlassen = 'admin/db/klassen.json'
fs.writeFile(fileLehrer, JSON.stringify(data["lehrer"], null, 2), 'utf8', function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("nSON data saved to " + fileLehrer)
  }
})
fs.writeFile(fileKlassen, JSON.stringify(data["klassen"], null, 2), 'utf8', function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("JSON data saved to " + fileKlassen)
  }
})*/
var data = {} 
var arrays = {
  "lehrer": {"key": "kurz", "file": "admin/db/lehrer.json"}, //das Array data["lehrer"] besitzt das Schlüsselattr. "kurz", die Daten sind gespeichert unter "file"
  "klassen": {"key": "klasse", "file": "admin/db/klassen.json"}
}
for (var i in arrays) {
  var obj = arrays[i]
  console.log("reading JSON data: " + obj.file + " ...")
  data[i] = JSON.parse(fs.readFileSync(obj.file, 'utf8'))
}

// GET
app.get('/admin/json/:array/:id', function(req,res) {  //Test with http://localhost:20080/admin/json/klassen/5C
  var myarray = data[req.params.array]
  var index = arrayIndexOf(myarray, arrays[req.params.array]["key"], req.params.id)
  res.send(JSON.stringify(myarray[index]))
})
app.get('/admin/json/:array', function(req,res) {  //Test with http://localhost:20080/admin/json/klassen/
  res.send(JSON.stringify(data[req.params.array]))
})

// POST --> adds / updates element
app.post('/admin/json', express.json(), function(req,res) {  
  //Test with curl -X POST -H "Content-Type: application/json" -d '{"klasse": "6A", "jgst": "6"}' http://localhost:20080/admin/json?array=klassen
  var myarray = data[req.param("array")]       //wg. ?array=klassen
  if (typeof req.param("id") != "undefined") {
    var index = arrayIndexOf(myarray, arrays[req.param("array")]["key"], req.param("id"))
    myarray[index] = req.body
  } else {
    myarray.push(req.body)
  }
  console.log(myarray)
  res.end()
})

// DELETE --> deletes element
app.delete('/admin/json/:array/:id', function(req,res) {  //Test with 
  var myarray = data[req.params.array]
  var index = arrayIndexOf(myarray, arrays[req.params.array]["key"], req.params.id)
  myarray.splice(index,1)
  res.end()
})


//-------------------send/receive json
app.get('/json', function(req,res) {
  var val = req.query.search
  console.log(val);
  res.send(JSON.stringify( { some: {response:'jsyyyyyyyyyyyon'}} ) ); 
  
  //http://expressjs.com/api.html
  //res.sendJSON({ user: 'tobi' })
  
})

//use express.json() instead of parsebody
app.post('/json', express.json(), function(req, res) {
  console.log(req.body);
  res.contentType('json');
  res.send(JSON.stringify( {meineantwort: req.body} ) );
});
