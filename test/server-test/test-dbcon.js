var should = require('should');
var dbConnection = require('../../server/source/db');
var mongoose = require('mongoose');
var dbUri = require('../../config.json').dbUri;


/*
 * Desc: testing the database connection, to verify the
 *  mongodb is up and running
 * */

describe("Database Connection", function () {

    describe("open connection to database test", function () {
        it("Should not return with an error", function (done) {
            dbConnection.connect(function (error) {
                if (error) return done(error);
                done();
            });
        });

        after(function (done) {
            if (mongoose.connection.db) {
                mongoose.connection.close(done);
            }
        });
    });


    describe("close connection to database test", function () {
        it("ready state should equal disconnected: 0", function (done) {
            dbConnection.close(function () {
                mongoose.connection.readyState.should.equal(0);
                done();
            });
        });

        before(function (done) {
            mongoose.connect(dbUri, done);
        });
    });

    after(function () {
        mongoose.disconnect();
    })
});

