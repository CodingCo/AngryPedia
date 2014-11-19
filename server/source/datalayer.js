var model = require('./db').WikiModel;

exports.getWiki = function (title, callback) {
    model.findOne({title: title}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

exports.findWiki = function (titleAbstract, callback) {
    model.find({title: {$regex: new RegExp(titleAbstract, "i")}}, {title: 1, abstract: 1, _id: 0}, callback);
};

exports.getCategories = function (callback) {
    model.find().distinct('categories', callback);
};


/*
 * return a list of articles with the given category
 * possible improvement: model.find({categories: {$not: {$size: 0}}}, {title: 1, categories: 1, _id: 0})
 * */
exports.getWikiByCategories = function (category, callback) {
    model.find({categories: category}, {title: 1, abstract: 1, categories: 1, _id: 0}, callback);
};