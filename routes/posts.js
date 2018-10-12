const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;
const PostModel = require('../models/posts');

// 主页/个人主页
router.get('/', function(req, res, next) {
    const author = req.query.author;
    console.log('author = ' + author);
    let query = {};
    if(author) {
        query.author = author;
    }
    PostModel.find(query, (err, data) => {
        res.render('posts', {
            posts: data
        })
    })
})
// 查看一篇文章
router.get('/:postId', function(req, res) {

})
// 发表文章页
router.get('/create', function(req, res) {

})
// 发表文章
router.post('/create', function(req, res) {

})
// 修改文章页
router.get('/:postId/edit', function(req, res) {

}) 
// 修改文章
router.post('/:postId/edit', function(req, res) {

})
// 删除文章
router.get('/:postId/remove', function(req, res) {

})

module.exports = router;