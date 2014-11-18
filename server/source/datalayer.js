var wikiMapperInterface = function () {
};

wikiMapperInterface.prototype.getWiki = function (title) {
};
wikiMapperInterface.prototype.findWiki = function (searchString) {
};
wikiMapperInterface.prototype.getCategories = function () {
};
wikiMapperInterface.prototype.getWikisWithCategory = function (category) {
};

function Vendor() {
}

Vendor.prototype = new wikiMapperInterface;

var b = new Vendor();

b.getWiki = function () {
    console.log("hdjskhdjkhskad");
};
b.getWiki();
