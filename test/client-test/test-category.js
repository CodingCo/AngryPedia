describe("Test Wiki application category controller", function () {

    /* Test data:
     * A mock object imitating the category object list
     *
     */
    var ctrl, $scope;
    var categoryMock = [
        { title: "testTitle",
          abstract: "testAbstract",
          categories: ["categoryTest"]
        }
    ];

    var categoryParam = "Param";

    /*
     * added module and controller with injected dependencies
     * before the test starts
     */

    beforeEach(module('WikiApp'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        $scope = $rootScope.$new();
        $scope.httpBackend = $httpBackend;
        $scope.httpBackend
            .when('GET', 'api/getWikiByCategory/'+categoryParam)
            .respond(categoryMock);

        ctrl = $controller('categoryCtrl', {
            $scope: $scope
        });
    }));


    /* We tests our services in app, using angulars own
     * mock testing library.
     */

    it("should be defined", function () {
        expect(ctrl).toBeDefined();
    });

    it("should be an empty list", function () {
        expect($scope.category).toEqual([]);
    });

    it("Should return the mock object with the list", function () {
        $scope.loadWikis(categoryParam);
        $scope.httpBackend.flush();
        expect($scope.category).toEqual(categoryMock);
    });
});
