var mongoose = require('mongoose');
var dbUri = require('../../config.json').dbUri;


exports.connect = function (onConnected) {
    mongoose.connect(dbUri, function (error) {
        onConnected(error);
    });
};


exports.close = function (onClose) {
    mongoose.connection.close(onClose)
};


(function () {
    mongoose.connection.on('connected', function () {
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
