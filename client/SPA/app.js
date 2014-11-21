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


app.controller('wikiListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.searchString = "";
    $scope.wikis = "Not called";
    $scope.load = function (callback) {
        $http.get('api/findWiki/' + $scope.searchString).success(function (data) {
            $scope.wikis = "called";
            callback();
        });
    };
    $scope.loadWiki = function (title) {
        $http.get('api/getWiki/' + title).success(function (data) {
            $scope.wiki = data;
        });
    }
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