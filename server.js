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
