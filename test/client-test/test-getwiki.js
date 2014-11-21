describe('WikiApp', function () {

    /* Test data:
     * A mock object imitating the wiki object
     */
    var routeParam = "TestParam";
    var wikiMock = [
        {
            "title": "TestTitle",
            "url": "TestURL",
            "abstract": "TestAbstract",
            "categories": ["TestCategory"],
            "headings": [
                {"heading": "Adjacent counties", "position": "1"}],
            "links": ["TestLink"]
        }
    ];

    /*
     * added module and controller with injected dependencies
     * before the test starts
     */

    beforeEach(function () {
        module('WikiApp')
    });

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        this.httpBackendMock = $httpBackend;
        this.httpBackendMock.expectGET('api/getWiki/' + routeParam).
            respond(wikiMock);
        this.scope = $rootScope.$new();
        this.ctrl = $controller('wikiCtrl', {
            $scope: this.scope,
            $routeParams: {wikiTitle: routeParam}
        });
    }));


    /*
     * tests are pretty self explanatory
     */
    
    it("should be defined", function () {
        expect(this.ctrl).toBeDefined();
    });

    it('Should fetch 1 wiki ', function () {
        expect(this.scope.wiki).toBeUndefined();
        this.httpBackendMock.flush();
        expect(this.scope.wiki.length).toEqual(1);
    });

    it('Should fetch correct wiki', function () {
        expect(this.scope.wiki).toBeUndefined();
        this.httpBackendMock.flush();
        expect(JSON.stringify(this.scope.wiki)).toEqual(JSON.stringify(wikiMock));
    });

});