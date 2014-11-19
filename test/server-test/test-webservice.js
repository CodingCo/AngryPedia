var request = require('supertest');
var should = require('should');
var app = require('../../server/app');
var db = require('../../server/source/db');


/*
 * webservice tests made with supertest
 */

describe("Webservice test", function () {

    after(function (done) {
        db.close(done);
    });

    describe("getWiki test", function () {
        this.timeout(5000);

        it("should match search title", function (done) {
            var testReq = {
                title: "Abu Dhabi"
            };
            request(app)
                .get('/getWiki/' + testReq.title)
                .expect(200)
                .end(function (err, res) {
                    var article = res.body;
                    if (err) return done(err);
                    article.should.have.property('title', testReq.title);
                    done();
                });
        });

        it("should return empty object", function (done) {
            var invalidWiki = "hdsjkdhjkfs";
            request(app)
                .get('/getWiki/' + invalidWiki)
                .expect(200)
                .expect('Content-type', /json/)
                .end(function (err, res) {
                    var article = res.body;
                    if (err)return done(err);
                    (JSON.stringify(article)).should.equal('{}');
                    done();
                });
        });

    });

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