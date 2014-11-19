var should = require('should');
var wikiMapper = require('../../server/source/datalayer');
var dbConnection = require('../../server/source/db');
var ObjectId = require('mongodb').ObjectID;

describe("Testing of the DataLayer interface", function () {

    describe("test getWiki", function () {

        beforeEach(function () {
            dbConnection.connect(function (err) {
                if (err) {
                    console.log(err.message);
                }
            });
        });

        afterEach(function (done) {
            dbConnection.close(function(){
                done();
            });
        });

        var testArticle = {
            _id: ObjectId("546a5dd5e1cf19d015664e25"),
            url: "http://en.wikipedia.org/wiki/An_American_in_Paris",
            title: "An American in Paris"
        };

        it("should return a complete Wiki article", function (done) {
            wikiMapper.getWiki(testArticle.title, function (err, article) {

                // Here we check if data is equal to expected -> article
                article.should.have.property('_id', testArticle._id);
                article.should.have.property('url', testArticle.url);
                article.should.have.property('title', testArticle.title);
                return done();

            });

        });

    });


});
