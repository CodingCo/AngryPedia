'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('WikiApp', ['ngRoute']);


app.controller('wikiCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('api/getWiki/' + $routeParams.wikiTitle).success(function (data) {
        $scope.wiki = data;
    }).error(function (data, status, headers, config) {
        $scope.error = data;
    });
}]);


app.controller('wikiListCtrl', ['$scope', '$http', 'webServiceFactory', function ($scope, $http, webServiceFactory) {
    $scope.searchString = "";
    $scope.wikis = [];
    $scope.load = function () {
        webServiceFactory.findWiki($scope.searchString).success(function (data) {
            $scope.wikis = data;
        });
    };
}]);


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