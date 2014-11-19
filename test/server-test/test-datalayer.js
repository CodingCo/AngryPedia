var should = require('should');
var wikiMapper = require('../../server/source/datalayer');
var dbConnection = require('../../server/source/db');

describe("Testing of the interface", function () {

    describe("test getWiki", function () {

        beforeEach(function () {

            dbConnection.connect(function (err) {
                if (err) {
                    console.log(err.message);
                }
            });

        });

        // Some test data
        var searchString = "An American in Paris";

        var testArticle = {
            _id: "546a5dd5e1cf19d015664e25",
            url: "http://en.wikipedia.org/wiki/An_American_in_Paris",
            title: "An American in Paris"
        };

        it("should return a complete Wiki article", function (done) {
            wikiMapper.getWiki(searchString, function (err, article) {

                console.log("Type of inputData: " + typeof article);
                console.log("Type of: " + typeof testArticle._id._id);

                // Here we check if data is equal to expected -> article
                article.should.have.property('_id', testArticle._id);
                article.should.have.property('url', testArticle.url);
                article.should.have.property('title', testArticle.title);

                //article._id.should.match(testArticle._id);

                return done();

            });

        });

    });


});
