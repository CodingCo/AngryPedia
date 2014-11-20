'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('WikiApp', ['ngRoute']);


app.controller('wikiCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    $scope.searchText = "";

    $scope.findWiki= function(){

        $scope.searchText = "funciton called!";

        $http.get('findWiki/' + $scope.searchText).success(function (data) {
            $scope.searchText = "SUCCES";
            $scope.wiki = data;
        }).error(function (status) {
            $scope.searchText = "Fail";
            console.log(status);
        });

    };

}]);


app.controller('wikiListCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('findWiki/$routeParams.searchString').success(function (data) {
        $scope.wikis = data;
    });
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
        })
        .otherwise({redirectTo: '/wikiList'});
}]);


/*
*
 $http.get('getWiki/' + $routeParams.wikiTitle).success(function (data) {
 $scope.wiki = data;
 }).error(function (data, status, headers, config) {
 $scope.error = data;
 });*/