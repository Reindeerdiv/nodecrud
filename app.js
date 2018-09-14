
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var customers = require('./routes/customers'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3004);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'studentapplication-dev.cr2pxy6w4r0h.us-east-1.rds.amazonaws.com', //'localhost',
        user: 'root',
        password : 'root12345678',
        port : 3306, //port mysql
        database:'StudentAppDev'

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/students', customers.list);
app.get('/student/add', customers.add);
app.post('/student/add', customers.save);
app.get('/student/delete/:id', customers.delete_customer);
app.get('/student/edit/:id', customers.edit);
app.post('/student/edit/:id',customers.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
