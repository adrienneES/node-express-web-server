import xml2js from 'xml2js'; // creates a parser
import request from 'request';

/* eslint-disable no-console */

var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function () {
    var getBookById = function(id, cb) {
      console.log(`id is ${id}`);
      var url = 'https://www.goodreads.com/book/show/' + id + '?format=xml&key=9vMBlKDe66FtVpVjKnIg';
        request.get(url, function(err, response, body) {
            parser.parseString(body, function(err, result) {
                cb(null, result.GoodreadsResponse.book);
            });
        });
    };
    return {
        getBookById: getBookById
    };
};
module.exports = goodreadsService;
