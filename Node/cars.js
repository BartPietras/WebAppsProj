var express = require('express');
var path = require('path');
var mysql = require('mysql');
var myConnection = require('express-myConnection');

var app = express();
app.use(express.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var dbOptions = {
	host: 'localhost',
	user: 'node3',
	password: 'node3',
	database: 'node3',
	port: 3306
}
app.use(myConnection(mysql, dbOptions, 'pool'));

app.get('/', function(req, res){
	
	//res.end('hello');
	res.render('start');
});

app.get('/list', function(req, res){
	/*
	var carsList=[
		{name: 'Mazda 6', year: 2017},
		{name: 'Ford Mondeo', year: 2015}
	];
	res.render('list', {
		carsList:carsList
	});
	*/
	
	req.getConnection(function(error, conn){
		conn.query('SELECT * FROM cars', function(err,rows){
			var carsList = rows;
			res.render('list', { 
			carsList:carsList
			});
		
		});
	});
});


app.get('/add', function(req, res){
	res.render('add');
});
app.post('/add', function(req, res){
	var car={
		model: req.body.model,
		brand: req.body.brand,
		year: req.body.year
	}
	req.getConnection(function(error, conn){
		conn.query('INSERT INTO cars SET ?',car, function(err,rows){
			if(err){
				var message = 'Wystąpił błąd';
			} else{
				var message = 'Dane zostały dodane';
			}
			res.render('add', {message:message});
		});
	});
});

app.get('/delete/(:id)', function(req, res){
	var idcar=req.params.id;
	res.render('delete', {idcar:idcar});
});
app.post('/delete/(:id)', function(req, res){
	var idcar=req.params.id;
	
	req.getConnection(function(error, conn){
		conn.query('DELETE FROM cars WHERE id='+idcar, function(err,rows){
			if(err){
				var message = 'Wystąpił błąd';
			} else{
				var message = 'Dane zostały usunięte';
			}
			res.render('delete', {idcar:idcar, message:message});
		});
	});
});

app.get('/edit/(:id)', function(req, res){
	var idcar=req.params.id;

	req.getConnection(function(error, conn){
		conn.query('SELECT * FROM cars WHERE id='+idcar, function(err,rows){
			res.render('edit', {
				id : idcar,
				model: rows[0].model,
				brand: rows[0].brand,
				year: rows[0].year 
			});
		});
	});
						
});
app.post('/edit/(:id)', function(req, res){
	var car={
		model: req.body.model,
		brand: req.body.brand,
		year: req.body.year
	}

	req.getConnection(function(error, conn){
		conn.query('UPDATE cars SET ? WHERE id='+req.params.id, car, function(err,rows){
			if(err){
				var message='Wystapil blad';
			} else{
				var message='Dane zostaly zmienione';
			}
			res.render('edit', {
				id : req.params.id,
				model: req.body.model,
				brand: req.body.brand,
				year: req.body.year,
				message: message
			});
		});
	});
						
});



app.get('/list_dealers', function(req, res){
	
	req.getConnection(function(error, conn){
		conn.query('SELECT * FROM carsdealer', function(err,rows){
			var carsList = rows;
			res.render('list_dealers', { 
			carsList:carsList
			});
		
		});
	});
});


app.get('/add_dealer', function(req, res){
	res.render('add_dealer');
});
app.post('/add_dealer', function(req, res){
	var car={
		brand: req.body.brand,
	}
	req.getConnection(function(error, conn){
		conn.query('INSERT INTO carsdealer SET ?',car, function(err,rows){
			if(err){
				var message = 'Wystąpił błąd';
			} else{
				var message = 'Dane zostały dodane';
			}
			res.render('add_dealer', {message:message});
		});
	});
});

app.get('/delete_dealer/(:id)', function(req, res){
	var idcar=req.params.id;
	res.render('delete_dealer', {idcar:idcar});
});
app.post('/delete_dealer/(:id)', function(req, res){
	var idcar=req.params.id;
	
	req.getConnection(function(error, conn){
		conn.query('DELETE FROM carsdealer WHERE id='+idcar, function(err,rows){
			if(err){
				var message = 'Wystąpił błąd';
			} else{
				var message = 'Dane zostały usunięte';
			}
			res.render('delete_dealer', {idcar:idcar, message:message});
		});
	});
});

app.get('/edit_dealer/(:id)', function(req, res){
	var idcar=req.params.id;

	req.getConnection(function(error, conn){
		conn.query('SELECT * FROM carsdealer WHERE id='+idcar, function(err,rows){
			res.render('edit_dealer', {
				id : idcar,
				brand: rows[0].brand,
			});
		});
	});
						
});
app.post('/edit_dealer/(:id)', function(req, res){
	var car={
		brand: req.body.brand,
	}

	req.getConnection(function(error, conn){
		conn.query('UPDATE carsdealer SET ? WHERE id='+req.params.id, car, function(err,rows){
			if(err){
				var message='Wystapil blad';
			} else{
				var message='Dane zostaly zmienione';
			}
			res.render('edit_dealer', {
				id : req.params.id,
				brand: req.body.brand,
				message: message
			});
		});
	});
						
});





app.listen(3002);