'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('WikiApp', ['ngRoute']);


/*
 * controller to the wiki page showing one wiki with all information
 */
app.controller('wikiCtrl', ['$scope', 'webServiceFactory', '$routeParams', function ($scope, webServiceFactory, $routeParams) {
    webServiceFactory.getWiki($routeParams.wikiTitle).success(function (data) {
        $scope.wiki = data;
    }).error(function (data, status, headers, config) {
        $scope.error = data;
    });
}]);


/*
 * controller to the wiki search page containing title and expandable abstracts
 */
app.controller('wikiListCtrl', ['$scope', 'webServiceFactory', function ($scope, webServiceFactory) {
    $scope.searchString = "";
    $scope.wikis = [];
    $scope.load = function () {
        webServiceFactory.findWiki($scope.searchString).success(function (data) {
            $scope.wikis = data;
        });
    };
}]);


/* The web services have been moved to an angular factory
 * so all controllers can use the api
 */
app.factory("webServiceFactory", ['$http', function ($http) {
    return {
        findWiki: function (title) {
            return $http.get('api/findWiki/' + title);
        },

        getWiki: function (title) {
            return $http.get('api/getWiki/' + title);
        }
    };
}]);


/*
 * Route configuration to navigation to all the SPA views
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/api/:wikiTitle', {
            templateUrl: 'wiki/wiki.html',
            controller: 'wikiCtrl'
        })
        .when('/wikiList', {
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        })
        .otherwise({redirectTo: '/wikiList'});
}]);