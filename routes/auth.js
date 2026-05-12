var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.redirect('/auth/login');
}

router.get('/dashboard', isAuthenticated, function(req, res, next) {
    res.render('dashboard');
});

router.get('/logout', function(req, res) {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

module.exports = router;