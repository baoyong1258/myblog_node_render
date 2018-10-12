const path = require('path');
const express = require('express');
const db = require('./mongodb/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

// 设置模板目录
app.set('views', path.join(__dirname, './views'));
// 设置模板引擎
app.set('view engine', 'ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname, './public')));
// session
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))
// flash
app.use(flash());
// 表单及上传中间键
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),
    keepExtensions: true
}))

// 设置模板全局常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}

// 设置模板全局变量
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.error = req.flash('error').toString();
    res.locals.success = req.flash('success').toString();
    next();
})

// logger 请求
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}))

// 路由
routes(app);

// logger 错误
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}))

// 捕获错误
app.use(function (err, req, res, next) {
    console.error(err);
    req.flash('error', err.message);
    res.redirect('/posts')
})

if(module.parent) {
    module.exports = app;
} else {
    // 监听端口 启动程序
    app.listen(config.port, function() {
        console.log(`${pkg.name} listening on port ${config.port}`)
    })
}