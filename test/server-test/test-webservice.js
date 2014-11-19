var request = require('supertest');
var should = require('should');
var app = require('../../server/app');


describe("Webservice test", function () {

    describe("test findWiki webservice", function () {
        var searchTitle = "Abacus";
        var invalidSearch = "hjsfkjdhfk";

        it("should return a wiki Json page based on search", function (done) {
            request(app)
                .get('/findWiki/' + searchTitle)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, response) {
                    if (err) return done(err);
                    var list = response.body;
                    list[0].title.should.equal(searchTitle);
                    done();
                });
        });

        it("should return an empty array with no articles", function (done) {
            request(app)
                .get('/findWiki/' + invalidSearch)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, response) {
                    if (err) return done(err);
                    var list = response.body;
                    list.should.be.empty;
                    done();
                });
        });
    });


    describe("test getCategories webservice", function () {
        var categories = ["Acids", "Algae", "Agronomy"];
        it("should return a list containing:" + categories, function (done) {
            this.timeout(5000);
            request(app)
                .get('/getCategories')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, response) {
                    if (err) return done(err);
                    var data = response.body;
                    data.should.containDeep(categories);
                    done();
                });
        });
    });


    describe("test getWikiByArticle webservice", function () {
        it("should return a list with a wiki with the same category", function (done) {
            var category = "Acids";
            request(app)
                .get('/getWikiByCategory/' + category)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, response) {
                    if (err) return done(err);
                    var list = response.body;
                    list[0].categories.should.containEql(category);
                    done();
                });
        });
    });

});