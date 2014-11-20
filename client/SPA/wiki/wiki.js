'use strict';

angular.module('WikiApp.wiki', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/wiki/:wikiTitle', {
            templateUrl: 'wiki/wiki.html',
            controller: 'wikiCtrl'
        });
    }])

    .controller('wikiCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {

        $http.get('getWiki/'+$routeParams.wikiTitle).success (function(data){
            $scope.wiki = data;
        }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }]);