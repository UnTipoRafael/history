
/**
 * Module dependencies.
 */
var port = 2001;
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , sio = require('socket.io')
  , mysql = require('mysql');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 2001 );
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('123'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


function login(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
};

/**/
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/channel.html', routes.channel);
app.get('/login', routes.login);
app.get('/usuario',login, routes.privada);
app.post('/autenticar', routes.autenticar);
app.post('/registro', routes.registro);
app.get('/registro/fb', routes.registroFB);
app.get('/salir', routes.salir);




/*
app.post('fb-login',function(req,res){
  var objBD = BD();
  var user = req.body.id;


  objBD.query('SELECT * FROM user WHERE id_fb="'+id+'"', function(error, resultado, fila){
    if(!error) {
      console.log(resultado.length);
      if(resultado.length > 0){
        req.session.user = user;
        res.redirect('/privada');
      }else{
        res.send('El usuario no existe ingrese a fb');
      }
    }else{
      console.log('Error');
    }
  });
});
*/


 
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var io = require('socket.io').listen(server);


/**/
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
