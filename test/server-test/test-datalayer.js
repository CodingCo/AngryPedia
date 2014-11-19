var should = require('should');
var wikiMapper = require('../../server/source/datalayer');
var wikiModel = require('../../server/source/db');
var ObjectId = require('mongodb').ObjectID;

describe("Testing of the interface", function () {
    "use strict";

    before(function (done) {
        wikiModel.connect(done);
    });

    after(function (done) {
        wikiModel.close(done);
    });

    /*
     * Tests the getWiki function.
     * IMPORTANT: When testing against a local mongodb the article._id test will fail
     * the _id types differ from those on mongolab, which are ObjectId's.
     */
    describe("test getWiki", function () {
        var invalidSearchString = "testblah";
        var testArticle = {
            _id: ObjectId("546a5dd5e1cf19d015664e25"),
            url: "http://en.wikipedia.org/wiki/An_American_in_Paris",
            title: "An American in Paris"
        };

        it("should return a complete Wiki article", function (done) {
            wikiMapper.getWiki(testArticle.title, function (err, article) {
                if (err) return done(err);
                console.log(typeof article._id);
                // Here we check if data is equal to expected -> article
                article.should.have.property('_id', testArticle._id);
                article.should.have.property('url', testArticle.url);
                article.should.have.property('title', testArticle.title);
                return done();

            });
        });

        it("Should return undefined, no such article", function (done) {
            wikiMapper.getWiki(invalidSearchString, function (err, data) {
                if (err) return done(err);
                (data === undefined).should.equal(true);
                done();
            })
        })
    });

    describe("test findWiki - case insensitive", function () {
        var camelCase = "AbAcus";
        var upperCase = "ABACUS";
        var lowerCase = "abacus";
        var one = {
            title: "Abacus"
        };

        function test(err, data, done) {
            if (err) return done(err);
            var isPresent = false;
            for (var i = 0; i < data.length; ++i) {
                if (data[i].title === one.title) {
                    isPresent = true;
                }
            }
            isPresent.should.equal(true);
            done();
        }

        it("Should return list of titles, and abstracts - camelCase", function (done) {
            wikiMapper.findWiki(camelCase, function (err, data) {
                test(err, data, done);
            });
        });

        it("Should return list of titles, and abstracts - upperCase", function (done) {
            wikiMapper.findWiki(upperCase, function (err, data) {
                test(err, data, done);
            });
        });

        it("Should return list of titles, and abstracts - lowerCase", function (done) {
            wikiMapper.findWiki(lowerCase, function (err, data) {
                test(err, data, done);
            });
        });

        it("Size should be greater than 2", function (done) {
            wikiMapper.findWiki("fun", function (err, data) {
                if (err) return done(err);
                data.length.should.be.greaterThan(2);
                done();
            })
        });

    });


    describe("test getCategories", function () {
        var categories = ["Acids", "Algae", "Agronomy"];
        it("Should return a list of distinct categories: Acids, Algae...", function (done) {
            wikiMapper.getCategories(function (err, data) {
                if (err) return done(err);
                data.should.containDeep(categories);
                done();
            })
        });
    });


    describe("test getWikisWithCategory", function () {
        it("should return list of wiki objects with given category", function (done) {
            var category = "Acids";
            wikiMapper.getWikiByCategories(category, function (err, data) {
                if (err) return done(err);
                data.should.be.an.instanceOf(Array);
                data[0].categories.should.containEql(category);
                done();
            })
        });

        it("should return an empty list", function (done) {
            var category = "blah blah i do not exist lolololo 4238497gsgj";
            wikiMapper.getWikiByCategories(category, function (err, data) {
                if (err) return done(err);
                data.should.be.empty;
                done();
            })
        })
    });

});


