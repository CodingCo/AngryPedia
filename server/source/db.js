var mongoose = require('mongoose');
var dbUri = require('../../config.json').dbUri;


exports.connect = function (onConnected) {
    mongoose.connect(dbUri, function (error) {
        if (onConnected) {
            onConnected(error);
        }
    });
};


exports.close = function (onClose) {
    mongoose.connection.close(function () {
        onClose();
    })
};


var wikiSchema = mongoose.Schema({
        title: {type: String, index: true},
        url: {type: String},
        abstract: {type: String},
        categories: {type: [{type: String}], index: true},
        links: {type: [{type: String}], index: true},
        headings: [{heading: {type: String}, position: {type: Number}}]
    },
    {collection: 'wiki'}
);

exports.WikiModel = mongoose.model('wiki', wikiSchema);


(function () {
    mongoose.connection.on('connected', function () { //
        console.log("Connection opened");
    });

    mongoose.connection.on('error', function (error) {
        console.log("Error in connection: " + error);
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Connection closed");
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Disconnected through app termination");
            process.exit(0);
        });
    })
})();
