var express = require('express');

var authorRouter = express.Router();
var router = function(nav) {
    var authors = [
        {'name' : 'henry', 'location' : 'LA'},
        {'name' : 'bob', 'location' : 'TX'},
        {'name' : 'george', 'location' : 'NC'}
    ];

    authorRouter.get('/', function(req, res) {
        res.render('authorListView', {
            title: 'Authors',
            nav: nav,
            authors: authors
        });
    });
    authorRouter.get('/:id', function(req, res) {
        var id = req.params.id;
        res.render('authorView', {
            title: 'Authors',
            nav: nav,
            author: authors[id]
        });
    });
    return authorRouter;
};
module.exports = router;