'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('WikiApp', ['ngRoute']);


app.controller('wikiCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('rest/getWiki/' + $routeParams.wikiTitle).success(function (data) {
        $scope.wiki = data;
    }).error(function (data, status, headers, config) {
        $scope.error = data;
    });
}]);


app.controller('wikiListCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.searchString = "";
    $scope.load = function(){
        $http.get('rest/findWiki/'+$scope.searchString).success(function (data) {
            $scope.wikis = data;
        });
    }
    $scope.loadWiki = function(title){
        $http.get('rest/getWiki/'+title).success(function (data) {
            $scope.wiki = data;
        });
    }
}]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/wiki/:wikiTitle', {
            templateUrl: 'wiki/wiki.html',
            controller: 'wikiCtrl'
        })
        .when('/wikiList',{
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        })
        .otherwise({redirectTo: '/wikiList'});
}]);

/**
 * .when('/wiki/:searchString', {
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        })
 */
