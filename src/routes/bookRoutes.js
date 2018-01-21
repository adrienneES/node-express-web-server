var express = require('express');
var sql = require('mssql');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookRouter = express.Router();
var router = function(nav) {

    bookRouter.route('/').get(function(req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(
                function(err, results) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                });
        });
        /*
        var request = new sql.Request();
        request.query('select * from books', function(err, recordset) {
            if (err) {
                console.log(err);
            }
            console.log('got recordset during bookrouter');
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: recordset
            });
        });*/
    });
    bookRouter.route('/:id')
    .get(function(req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id},
                function(err, results) {
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
        });
    });
    /*
        .all(function(req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id = @id',
                function(err) {
                    ps.execute({id: req.params.id},
                        function(err, recordset) {
                            if (recordset.length === 0) {
                                res.status(404).send('not found');
                            }
                            else {
                                req.book = recordset[0];
                                next();
                            }
                        });
                });
        })
        .get(function(req, res) {
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
    });
    */
    return bookRouter;
};
module.exports = router;
