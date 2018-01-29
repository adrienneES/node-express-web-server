import express from 'express';
import mongo from 'mongodb';
const mongodb = mongo.MongoClient;
const adminRouter = express.Router();
const router = function(nav) {
  console.log(nav);
    const books = [
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
          id: 8909,
          genre: 'Science Fiction',
          author: 'H. G. Wells',
          read: false
      },
    {
          title: 'Nicholas',
          genre: 'Science Fiction',
          id: 33507,
          author: 'Jules Verne',
          read: false
      },
    {
          title: 'Finley',
          genre: 'Fantasy',
          id: 582105,
          author: 'Henry Kuttner',
          read: false
      },
    {
          title: 'Emily',
          genre: 'Fantasy',
          author: 'Kenneth Grahame',
          id: 5659,
          read: false
      },
    {
          title: 'Poppi',
          genre: 'History',
          author: 'Mark Twain',
          id: 2956,
          read: false
      },
    {
          title: 'Childhood',
          genre: 'Biography',
          id: 35999063,
          author: 'Lev Nikolayevich Tolstoy',
          read: false
      }
    ];

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.remove();
                collection.insertMany(books,function(err,results) {
                    res.send(results);
                    db.close();
                });
            });
        });
    return adminRouter;
};
module.exports = router;
