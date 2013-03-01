var  mysql = require('mysql');

function BD(){
  var cliente = mysql.createConnection({
    user: 'root',
    password: '_vps_13',
    host: 'localhost',
    port: 3306,
    database: 'h'
  });
  return cliente;
};


exports.index = function(req, res){
  	res.render('index', { title: 'History' });
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


exports.autenticar=  function(req, res){
	var objBD = BD();
  console.log(objBD);
	var user = req.body.user;
	var pw = req.body.pw;
  console.log(pw);
  console.log(user);
	console.log('SELECT * FROM user WHERE nick ="'+user+'" AND password = "'+pw+'"');
  objBD.query('SELECT * FROM user WHERE nick ="'+user+'" AND password = "'+pw+'"', function(error, resultado, fila){
    
    if(!error) {
  	  console.log(resultado.length);
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