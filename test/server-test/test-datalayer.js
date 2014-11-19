var should = require('should');
var wikiMapper = require('../../server/source/datalayer');

describe("Testing of the interface", function () {


    describe("test getWiki", function () {
        var searchString = "An American in Paris";

        var article = {
            _id: 1,
            url: "http://en.wikipedia.org/wiki/An_American_in_Paris",
            title: "An American in Paris"
        };

        it("should return a complete Wiki article", function (done) {
            wikiMapper.getWiki(searchString, function (err, data) {

                if(err){
                    return done(err);
                }

                // Here we check if data is equal to expected -> article
                data.should.have.property('_id', article.id);
                data.should.have.property('url', article.url);
                data.should.have.property('title', article.title);
                return done();

            });

        });

        it("Should return undefined, no such article", function () {

        })

    });


    //  describe("test findWiki - case insensitive", function () {
    //      var camelCase = "SeaRch";
    //      var upperCase = "SEARCH";
    //      var lowerCase = "search";
    //
    //      it("Should return list of titles, and abstracts - camelCase", function () {
    //
    //      });
    //
    //      it("Should return list of titles, and abstracts - camelCase", function () {
    //
    //      });
    //
    //      it("Should return list of titles, and abstracts - camelCase", function () {
    //
    //      });
    //  });
    //
    //
    //  describe("test getCategories", function () {
    //
    //      it("Should return a list of distinct categories", function () {
    //
    //      });
    //  });
    //
    //
    //  describe("test getWikisWithCategory", function () {
    //      it("should return list of wiki objects with given category")
    //  })

});
