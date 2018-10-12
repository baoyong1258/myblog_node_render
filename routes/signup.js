const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;
const fs = require('fs');

// 注册页
router.get('/', checkNotLogin, function(req, res) {
    res.render('signup');
})
// 注册
router.post('/', checkNotLogin, function(req, res) {
    const { name, gender, bio, password, repassword } = req.fields;
    // const avatar = req.fields.avatar.path.split(path.sep).pop();

    // 参数校验
    try {
        if(!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在1-10个字符')
        }
    } catch(err) {
        fs.unlink(req.files.avatar.path)
        req.flash('error', err.message)
        return res.redirect('/signup')
    }
})

module.exports = router;