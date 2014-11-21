describe("Test Wiki application categories controller", function () {

    /* Test data:
     * A mock object imitating the category object list
     *
     */
    var ctrl, $scope;
    var categoriesMock = [
        "testCategory1",
        "testCategory2"
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
            .when('GET', 'api/getCategories')
            .respond(categoriesMock);

        ctrl = $controller('categoriesCtrl', {
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
        expect($scope.categories).toEqual([]);
    });

    it("Should return the mock object with the list", function () {
        $scope.loadCategories();
        $scope.httpBackend.flush();
        expect($scope.categories).toEqual(categoriesMock);
    });
});
