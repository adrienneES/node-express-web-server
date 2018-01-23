var xml2js = require('xml2js'); // creates a parser
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function () {
    var getBookById = function(id, cb) {

        var request = require('request');
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