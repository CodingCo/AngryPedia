var wikiMapperInterface = require('../../server/source/datalayer');

function MockStuff(){

}

MockStuff.prototype = new wikiMapperInterface;

var b = new MockStuff();


b.getWiki();
b.getWiki = function () {
    console.log("fuycicj");
};
