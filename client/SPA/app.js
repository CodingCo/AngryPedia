'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('WikiApp', ['ngRoute']);


app.controller('wikiCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('getWiki/' + $routeParams.wikiTitle).success(function (data) {
        $scope.wiki = data;
    }).error(function (data, status, headers, config) {
        $scope.error = data;
    });
}]);


app.controller('wikiListCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.searchString = "Abacus";
    $scope.load = function(){
        console.log($scope.searchString);
        $http.get('rest/findWiki/'+$scope.searchString).success(function (data) {
            $scope.wikis = data;
            console.log('Success');
        });
    }
}]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/wiki/:wikiTitle', {
            templateUrl: 'wiki/wiki.html',
            controller: 'wikiCtrl'
        })
        .when('/wiki/:searchString', {
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        }).when('/wikiList',{
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        })
        .otherwise({redirectTo: '/wikiList'});
}]);


