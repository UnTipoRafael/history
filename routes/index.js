var  mysql = require('mysql');

function BD(){
  var cliente = mysql.createConnection({
    user: 'root',
    password: '_vps_13',
    host: '127.0.0.1',
    port: 3306,
    database: 'h'
  });
  return cliente;
};


exports.index = function(req, res){
  	res.render('index', { title: 'History',mensaje:'Registrate Ahora' });
};

exports.channel= function(req, res){
  res.render('channel', { title: 'channel' });
};

exports.login= function(req, res){
	res.render('login', { title: 'Ingreso' });
};

exports.privada= function(req, res){
	usuario=req.session.user;
  	res.render('privada', { title:usuario  });
};

exports.salir= function(req, res){
  delete req.session.user;
  res.redirect('/');
};

exports.registro= function(req, res){
  var objBD = BD();
  var user = req.body.n_user;
  var pw = req.body.n_pw;
  var email = req.body.n_email;
  objBD.query('insert into user values("","","'+user+'","'+pw+'","'+email+'")', function(error){
    if(!error) {
      console.log("error registro");
      res.redirect('/login');
    }else{
      res.render('index', { title: 'Ingreso', mensaje:'Usuario ya existe elige otro' });
    }
  });
};


exports.autenticar=  function(req, res){
	var objBD = BD();
	var user = req.body.user;
	var pw = req.body.pw;
  objBD.query('SELECT * FROM user WHERE nick ="'+user+'" AND password = "'+pw+'"', function(error, resultado, fila){
    
    if(!error) {
  	  if(resultado.length > 0){
  	    req.session.user = user;
  	    res.redirect('/usuario');
  	  }else{
  	    res.redirect('/login');
  	  }
  	}else{
  	  console.log('Error autenticar');
  	}
	});
};


/*
app.post('/autenticar', function(req, res){
  var objBD = BD();
  var user = req.body.user;
  var pw = req.body.pw;
  objBD.query('SELECT * FROM user WHERE nick LIKE "'+user+'" AND password LIKE "'+pw+'"', function(error, resultado, fila){
    if(!error) {
      console.log(resultado.length);
      if(resultado.length > 0){
        req.session.user = user;
        res.redirect('/privada');
      }else{
        res.send('El usuario no existe o sus datos son incorrectos.');
      }
    }else{
      console.log('Error');
    }
  });
});


app.get('/privada', login, function( req, res ){
  res.render('privada', { title: 'Pagina privada'});
});


app.get('/login', function(req, res){
  res.render('login', { title: 'Ingreso' });
});*/