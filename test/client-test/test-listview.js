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
        $scope.httpBackend = $httpBackend;
        $scope.httpBackend
            .when('GET', 'api/findWiki/' + searchString)
            .respond(wikiMock);

        ctrl = $controller('wikiListCtrl', {
            $scope: $scope
        });
    }));

    it("should be an empty list", function () {
        $scope.searchString = searchString;
        expect($scope.wikis).toEqual([]);
    });

    it("Should return the mock object with the list", function () {
        $scope.searchString = searchString;
        $scope.load();
        $scope.httpBackend.flush();
        expect($scope.wikis).toEqual(wikiMock);
    });
});