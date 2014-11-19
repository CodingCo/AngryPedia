var model = require('./db').WikiModel;

exports.getWiki = function (title, callback) {

    model.findOne({'title': title}, function (err, article) {

        if (err) {
            return callback(null);
        }

        callback(null, article);

    });

};
























