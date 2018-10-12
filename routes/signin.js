const express = require('express');
const router = express.Router();

// 登录页
router.get('/', function(req, res) {
    res.render('signin');
})
// 登录
router.post('/', function(req, res) {

})

module.exports = router;