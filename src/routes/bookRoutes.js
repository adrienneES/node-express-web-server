import express from 'express';
var bookRouter = express.Router();
//var sql = require('mssql');
var router = function(nav) {
    var bookService = require('../services/goodreadService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);
    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
};
module.exports = router;
