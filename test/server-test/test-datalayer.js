var should = require('should');
var wikiMapper = require('../../server/source/datalayer');
var wikiModel = require('../../server/source/db');

describe("Testing of the interface", function () {

    before(function (done) {
        wikiModel.connect(done);
    });

    after(function (done) {
        wikiModel.close(done);
    });


    describe("test getWiki", function () {
        var validSearchString = "Abacus";
        var invalidSearchString = "testblah";
        var article = {
            _id: "546c8c38299712cd0451ffd3",
            title: "Abacus",
            url: "http://en.wikipedia.org/wiki/Abacus"
        };

        it("should return a complete Wiki article", function (done) {
            wikiMapper.getWiki(validSearchString, function (err, data) {
                if (err) return done(err);
                (function () {
                    var valid = true;
                    valid = valid && (article._id === data._id.toString());
                    valid = valid && (article.title === data.title);
                    valid = valid && (article.url === data.url);
                    return valid;
                })().should.equal(true);
                done();
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
                    if (data[i].title === one.title)
                        isPresent = true;
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
            })

        }
    );

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

/*
 * supplementary methods for tests cases
 *
 * */
