'use strict';

angular.module('WikiApp.wikiList', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/wiki/:searchString', {
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        });
    }])

    .controller('wikiListCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
        $http.get('findWiki/$routeParams.searchString').success (function(data){
            $scope.wikis = data;
        });
    }]);