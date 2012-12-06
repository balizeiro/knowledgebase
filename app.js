var express = require('express')
  , homepage = require('./routes/index')
  , dashboard = require('./routes/dashboard')
  , document = require('./routes/document')
  , login = require('./routes/login')
  , logout = require('./routes/logout')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var app = express();

function IsAuthenticated(req,res,next){  
    if (req.session.isAuthenticated) {
        next();
    } else{
        res.redirect("/");
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
  /* View Globals */
  app.use(function(req, res, next) {
      app.locals.user = req.session.user;
      next();
  });
  app.use(flash());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* APP ROUTES */
app.get('/', login.index);
app.get('/dashboard', IsAuthenticated, dashboard.index);
app.get('/login', login.index)
app.post('/login', login.do);
app.get('/logout', logout.index)
app.get('/document/new', document.new)
app.get('*', function(req, res){
  res.render('error404');
});

/* SERVER */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
