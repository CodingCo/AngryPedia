var should = require("should");
var request = require("supertest");
var app = require('../../server/app');
var rest = require('../../server/routes/rest');

describe("rest api for wiki", function(){

    var testReq = 'some title on an article';

    describe("getWiki test", function(){
        it("should return expected title");
            request(app)
                .get('/getWiki/' + testReq)











    });









});




