var express = require('express');
var facade = require('../source/datalayer');
var router = express.Router();




router.get('/getWiki/:title', function (request, response) {
    var title = request.params.title;
    facade.getWiki(title, function (err, data) {
        if (err) response.send(err);
        response.setHeader('Content-Type', 'application/json');
        response.send(data);
    });
});

router.get('/findWiki/:searchString', function (request, response) {
    var searchString = request.params.searchString;
    facade.findWiki(searchString, function (err, data) {
        if (err) response.send("not found");
        response.send(data);
    })
});

router.get('/getCategories', function (request, response) {
    facade.getCategories(function (err, data) {
        if (err) response.send("not found");
        response.send(data);
    })

});

router.get('/getWikiByCategory/:category', function (request, response) {
    var category = request.params.category;
    facade.getWikiByCategories(category, function (err, data) {
        if (err) response.send("not found");
        response.send(data);
    });
});

router.all('/', function(req, res){

    res.redirect('index.html');

});


module.exports = router;