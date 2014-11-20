describe('WikiApp', function () {


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

    var routeParam = "TestParam";

    beforeEach(function () {
        module('WikiApp')
    });

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        this.httpBackendMock = $httpBackend;
        this.httpBackendMock.expectGET('rest/getWiki/' + routeParam).
            respond(wikiMock);
        this.scope = $rootScope.$new();
        this.ctrl = $controller('wikiCtrl', {
            $scope: this.scope,
            $routeParams: {wikiTitle: routeParam}
        });
    }));

    it("should be defined", function () {
        expect(this.ctrl).toBeDefined();
    });

    it('Should fetch 1 wiki ', function () {
        expect(this.scope.wiki).toBeUndefined();
        this.httpBackendMock.flush();
        console.log(this.scope.wiki);
        expect(this.scope.wiki.length).toEqual(1);
    });

    it('Should fetch correct wiki', function () {
        expect(this.scope.wiki).toBeUndefined();
        this.httpBackendMock.flush();
        expect(JSON.stringify(this.scope.wiki)).toEqual(JSON.stringify(wikiMock));
    });

});