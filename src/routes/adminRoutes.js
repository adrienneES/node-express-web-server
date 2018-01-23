var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();
var router = function(nav) {
    var books = [
        {
              title: 'War and Peace',
              id: 656,
              genre: 'Historical Fiction',
              author: 'Lev Nikolayevich Tolstoy',
              read: false
          },
    {
          title: 'Les Mes',
          id: 24280,
          genre: 'Historical Fiction',
          author: 'Victor Hugo',
          read: false
      },
    {
          title: 'War of the Worlds',
          genre: 'Science Fiction',
          author: 'H. G. Wells',
          read: false
      },
    {
          title: 'Nicholas',
          genre: 'Science Fiction',
          author: 'Jules Verne',
          read: false
      },
    {
          title: 'Finley',
          genre: 'Fantasy',
          author: 'Henry Kuttner',
          read: false
      },
    {
          title: 'Emily',
          genre: 'Fantasy',
          author: 'Kenneth Grahame',
          read: false
      },
    {
          title: 'Poppi',
          genre: 'History',
          author: 'Mark Twain',
          read: false
      },
    {
          title: 'Childhood',
          genre: 'Biography',
          author: 'Lev Nikolayevich Tolstoy',
          read: false
      }
    ];
  
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,function(err,results) {
                    res.send(results);
                    db.close();
                });
            });
        });
    return adminRouter;
};
module.exports = router;
