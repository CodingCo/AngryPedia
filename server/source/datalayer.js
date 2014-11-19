var model = require('./db').WikiModel;

exports.getWiki = function (title, callback) {
    model.findOne({title: title}, function (err, data) {
        if (err) {
            return callback(err);
        }
        if (data === null) {
            return callback()
        } else {
            return callback(undefined, data);
        }

    });
};


exports.findWiki = function (titleAbstract, callback) {
    model.find({title: {$regex: new RegExp(titleAbstract, "i")}}, {title: 1, abstract: 1}, callback);
};


