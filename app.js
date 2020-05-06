var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

// モデルの読み込みとテーブルの作成
var User = require('./models/user');

User.sync().then(() => {
    User.sync();
});



var routes = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var users = require('./routes/users');

var app = express();
app.use(helmet());

// パスポートの設定
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            if (email === 'soichiro_yoshimura@nnn.ed.jp' && password == 'test') {
                done(null, { email, password });
            } else {
                done(null, false, { message: 'パスワードが違います' });
            }
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(
    session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);


app.post(
    '/login',
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
    })
);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
