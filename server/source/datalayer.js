var model = require('db').WikiModel;

exports.getWiki = function (title, callback) {

    model.find({}, function (err, article) {

        if (err) {
            return callback(err);
        }

        callback(article);

    });

};
























