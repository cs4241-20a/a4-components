const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { body } = require('express-validator');
const config = require('./config');

const app = new express();

app.disable('x-powered-by');
app.set('trust proxy', 1);


app.use('/static', express.static('client/build/static'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

const csrfProtection = csrf({ cookie: {
    httpOnly: false
}});

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || config.session.secret,
    name: 'sessionId',
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 24 * 30)
    }
}));

mongoose.connect(process.env.MONGODB_URL || config.db.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const conn = mongoose.connection;
conn.on('connected', function () {
    console.log('Mongodb connected');
});


// routes

const user = require('./routes/user');
const list = require('./routes/list');

// api
app.get('/list', user.auth, list.list);
app.get('/list/:id', list.userList);
app.post('/edit', [user.auth/*, csrfProtection*/, body('name').escape(), body('date').escape()], list.edit);
app.post('/del', user.auth/*, csrfProtection*/, list.del);
app.post('/add', [user.auth/*, csrfProtection*/, body('name').escape(), body('date').escape()], list.add);

app.post('/login', user.login);
app.get('/logout', user.logout);
app.get('/isAuth', user.isAuthenticated);
app.post('/reg', body('username').trim().escape(), user.reg);


app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
});


if (!module.parent) {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Started on port 3000 or specified');
    });
}

module.exports = app;
