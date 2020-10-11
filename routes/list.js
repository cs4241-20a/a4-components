const sanitize = require('mongo-sanitize');

const dataModel = require('../models').Data;
const userModel = require('../models').User;

function list(req, res) {
    let userId = sanitize(req.session.userId);

    dataModel.find({belongs: userId}, function (err, docs) {
        let coll = [];
        for (let i = 0; i < docs.length; i++) {
            let entry = {};
            entry.id = docs[i]._id;
            entry.name = docs[i].name;
            entry.date = docs[i].date;

            entry.ps = Number(docs[i].ps);
            entry.ms = Number(docs[i].ms);
            entry.ss = Number(docs[i].ss);
            entry.es = Number(docs[i].es);

            entry.score = ((docs[i].ps + docs[i].ms + docs[i].ss + docs[i].es) / 4).toFixed(2);
            coll.push(entry);
        }

        coll.sort(function (a, b) {
            return b.score - a.score;
        });

        res.send(coll);
    });
}

function userList(req, res) {
    let userId = sanitize(req.params.id);

    userModel.findOne({'username': userId}, function(err, result) {
        if (result == null) {
            res.send('User does not exist.');
        } else {
            const id = result._id;

            dataModel.find({belongs: id}, function (err, docs) {
                let coll = [];
                for (let i = 0; i < docs.length; i++) {
                    let entry = {};
                    entry.name = docs[i].name;
                    entry.date = docs[i].date;

                    entry.ps = Number(docs[i].ps);
                    entry.ms = Number(docs[i].ms);
                    entry.ss = Number(docs[i].ss);
                    entry.es = Number(docs[i].es);

                    coll.push(entry);
                }

                coll.sort(function (a, b) {
                    return b.score - a.score;
                });

                res.send(coll);
            });
        }
    });
}

function add(req, res) {
    let entry = {};
    entry.name =  sanitize(req.body.name);
    entry.ps = Number(req.body.ps);
    entry.ms = Number(req.body.ms);
    entry.ss = Number(req.body.ss);
    entry.es = Number(req.body.es);
    entry.date = sanitize(req.body.date);
    entry.belongs = sanitize(req.session.userId);

    let newData = new dataModel(entry);
    newData.save();

    res.send({code: 200});
}

function edit(req, res) {
    let entry = {};
    entry.name =  sanitize(req.body.name);
    entry.ps = Number(req.body.ps);
    entry.ms = Number(req.body.ms);
    entry.ss = Number(req.body.ss);
    entry.es = Number(req.body.es);
    entry.date = sanitize(req.body.date);

    const id = sanitize(req.body.id);
    let userId = sanitize(req.session.userId);

    dataModel.findOneAndUpdate({'_id': id, 'belongs': userId}, entry, function (err, docs) {
        res.send({code: 200});
    });
}

function del(req, res) {
    let userId = sanitize(req.session.userId);

    dataModel.findOneAndRemove({'_id': sanitize(req.body.id), 'belongs': userId}, function (err, docs) {
        res.send({code: 200});
    });
}

module.exports = {
    list: list,
    userList: userList,
    add: add,
    edit: edit,
    del: del
};
