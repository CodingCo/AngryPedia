var should = require("should");
var request = require("supertest");
var app = require('../../server/app');
var rest = require('../../server/routes/rest');

describe("rest api for wiki", function () {

    this.timeout(5000);
    var testReq = {title: "Abu Dhabi"};

    describe("getWiki test", function () {
        it("should match search title", function (done) {
            request(app)
                .get('/getWiki/' + testReq.title)
                .expect(200)
                .end(function (err, res) {
                    var article = res.body;

                    if (err) {
                        return done(err);
                    }
                    article.should.have.property('title', testReq.title);
                    done();

                });

        });

        it("should return empty object", function (done) {
            request(app)
                .get('/getWiki/frjudjufjeujfuebfenefhehujdueufueuhfuefhue')
                .expect(200)
                .expect('Content-type', /json/)
                .end(function (err, res) {
                    var article = res.body;

                    if (err) {
                        return done(err);
                    }

                    (JSON.stringify(article)).should.equal('{}');
                    done();

                });

        })











    });


});




