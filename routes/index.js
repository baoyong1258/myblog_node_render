const postsRouter = require('./posts');
const signupRouter = require('./signup');
const signinRouter = require('./signin');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/posts');
    })
    app.use('/posts', postsRouter);
    app.use('/signup', signupRouter);
    app.use('/signin', signinRouter);
}