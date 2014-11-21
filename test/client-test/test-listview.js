describe("Test Wiki application list controller", function () {

    var ctrl, $scope;
    var searchString = "title";
    var wikiMock = [
        {
            title: "test",
            abstract: "testtest"
        },
        {
            title: "test1",
            abstract: "testtest1"
        }
    ];


    beforeEach(module('WikiApp'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        $scope = $rootScope.$new();
        $scope.searchString = searchString;
        $httpBackend
            .when('GET', '/api/findWiki/' + searchString)
            .respond(wikiMock);

        ctrl = $controller('wikiListCtrl', {
            $scope: $scope,
            $routeParams: {searchString: searchString}
        });
    }));


    it("Should return the mock object with the list", function () {
        //$scope.load();
        expect($).toEqual(wikiMock);

    });

});