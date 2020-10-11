const md5 = require('md5');
const sanitize = require('mongo-sanitize');

const userModel = require('../models').User;

function auth(req, res, next) {
    userModel.findOne({'_id': sanitize(req.session.userId), 'password': sanitize(req.session.password)}, function (err, result) {
        if (result != null) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    });
}

function isAuthenticated(req, res) {
    userModel.findOne({'_id': sanitize(req.session.userId), 'password': sanitize(req.session.password)}, function (err, result) {
        if (result != null) {
            res.send({code: 200, user: result.username});
        } else {
            res.send({code: 401});
        }
    });
}

function login(req, res) {
    const user = req.body;

    userModel.findOne({username: sanitize(user.username), password: md5(user.password)}, function(err, result) {
        if (result != null) {
            req.session.userId = result._id;
            req.session.password = result.password;

            res.send({success: 200});
        } else {
            res.send({code:401, msg:'Incorrect username or password.'});
        }
    });
}

function logout(req, res) {
    req.session.userId = '';
    req.session.password = '';
    res.redirect('/auth/login');
}

function reg(req, res) {

    if (req.body.username === "" || req.body.password === "") {
        res.send({code:400, msg:'Fields empty'});
    } else {
        userModel.findOne({username: sanitize(req.body.username)}, function(err, result) {
            if (result != null) {
                res.send({code:400, msg:'The username is already taken. Try another.'});
            } else {
                let user = {};
                user.username = sanitize(req.body.username);
                user.password = md5(req.body.password);

                let newUser = new userModel(user);
                newUser.save(function (err, docs) {
                    req.session.userId = docs._id;
                    req.session.password = docs.password;

                    res.send({success:200, msg:''});
                });
            }
        });
    }
}

module.exports = {
    login: login,
    reg: reg,
    logout: logout,
    auth: auth,
    isAuthenticated: isAuthenticated
};
