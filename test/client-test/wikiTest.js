
describe('WikiApp.wiki', function () {

    beforeEach(function () {
        module('WikiApp.wiki')
    });

    beforeEach(inject(function ($controller, $rootScope) {

        this.scope = $rootScope.$new();
        this.ctrl = $controller('wikiCtrl', {
            $scope: this.scope
        });

    }));

    it("should be defined", function () {
        expect(this.ctrl).toBeDefined();
    });

    it("should have title on the scope eq to 'Hello'", function(){
        expect(this.scope.title).toBe('Hello');
    });

});