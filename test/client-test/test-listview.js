describe("Test Wiki application list controller", function () {


    /* Test data:
     * A mock object imitating the title/abstract object list
     * A search title for the service to use
     */
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

    /*
     * added module and controller with injected dependencies
     * before the test starts
     */

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


    /* We tests our services in app, using angulars own
     * mock testing library.
     */

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