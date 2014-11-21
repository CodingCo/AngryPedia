/**
 * Created by ThomasDrengen on 21/11/14.
 */
describe('wikiListController in wikiApp', function () {

    var wikiListMock = [
        {
            "title": "TestTitle1",
            "ABSTRACT": "BLABLA"
        },
        {
            "title": "TestTitle2",
            "ABSTRACT": "BLABLA"
        }
    ];

    var routeParam = "route";
    var testTitle = "title";

    beforeEach(function () {
        module('WikiApp')
    });

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        this.httpBackendMock = $httpBackend;
        this.httpBackendMock.when('GET', 'api/findWiki/' + testTitle).
            respond(wikiListMock);
        this.httpBackendMock.when('api/getWiki/' + routeParam).
            respond(wikiListMock[0]);
        this.scope = $rootScope.$new();
        this.ctrl = $controller('wikiListCtrl', {
            $scope: this.scope
        });
    }));

    afterEach(function () {
        //this.httpBackendMock.flush();
    });

    it("controller be defined", function () {
        expect(this.ctrl).toBeDefined();
    });

    it("wikis should be defined", function () {
        this.scope.searchString = testTitle;

        //var spy = jasmine.createSpy(this.scope, 'load');
        var spy = spyOn(this.scope, 'load').and.callThrough();

        this.scope.load(function () {
            console.log("Called?");
        });

        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();

        expect(timerCallback).not.toHaveBeenCalled();

        jasmine.clock().tick(101);

        expect(timerCallback).toHaveBeenCalled();

        expect(spy).toHaveBeenCalled();

        this.httpBackendMock.flush();
    });

    //it("wikis should be defined", function () {});
    /*
     * this.scope.searchString = testTitle;
     var self = this;

     this.scope.load(function(){
     expect(self.scope.wikis).toBeDefined();
     });

     this.httpBackendMock.flush();
     * */


});






