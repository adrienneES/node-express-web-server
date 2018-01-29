var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
/* eslint-disable no-console */
/*
good reads key:
key: 9vMBlKDe66FtVpVjKnIg
secret: AFBlwgzKlFPzJOAVz2HNUvnXpF2QhVwSQaxOrNa2Y
*/
var bookController = function(bookService, nav) {
    var middleware = function (req, res, next) {
        // this middleware to authenticate entire route
        //  is excepting, but instructors did as well.
        // leaving in through entirety of course
        //        if (!req.user) {
        //            res.redirect('/');
        //        }
        next();
    };
    var getIndex = function(req, res) {
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
    };
    var getById = function(req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id},
                function(err, results) {
                    if( results.id) {
                      console.log(`found: ${results.id}`);
                        bookService.getBookById(results.id, function (err, book) {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Books',
                                nav: nav,
                                book: results
                            });
                        });
                    } else {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    }
                });
        });
    };
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

    return {
        getIndex : getIndex,
        getById : getById,
        middleware : middleware
    };
};
module.exports = bookController;
