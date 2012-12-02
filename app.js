var express = require('express')
  , homepage = require('./routes/index')
  , dashboard = require('./routes/dashboard')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path');

var app = express();


function IsAuthenticated(req,res,next){  
    if (req.session.isAuthenticated) {
        next();
    } else{
        next(new Error(401));
    }
}


/* CONFIG */
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* APP ROUTES */
app.get('/', homepage.index);
app.get('/dashboard', IsAuthenticated, dashboard.index);
app.post('/login', login.index);

/* SERVER */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
