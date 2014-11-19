var express = require('express');
var facade = require('../source/datalayer');
var router = express.Router();


router.get('/getWiki/:title', function (request, response) {
    var title = request.params.title;

});

router.get('/findWiki/:searchString', function (request, response) {
    var searchString = request.params.searchString;

});

router.get('/getCategories', function (request, response) {


});

router.get('/getWikiByCategory/:category', function (request, response) {
    var category = request.params.category;

});


module.exports = router;