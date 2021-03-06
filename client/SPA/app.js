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

    $scope.showListElement = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.show = true;
            });
        }, 1000);
    };

    $scope.hideListElement = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.show = false;
            });
        }, 10);
    };
}]);

/*
 * controller to the categories page containing title and expandable abstracts
 */
app.controller('categoriesCtrl', ['$scope', 'webServiceFactory', function ($scope, webServiceFactory) {
    $scope.categories = [];

    $scope.loadCategories = function () {
        webServiceFactory.getCategories().success(function (data) {
            $scope.categories = data;
        });
    };

    $scope.$on('$viewContentLoaded', function () {
        if ($scope.categories.length == 0) {
            $scope.loadCategories();
        }
    });

}]);

/*
 * controller to the category page containing title and expandable abstracts
 */
app.controller('categoryCtrl', ['$scope', 'webServiceFactory', '$routeParams', function ($scope, webServiceFactory, $routeParams) {
    $scope.category = [];
    $scope.categoryT = $routeParams.categoryTitle;
    $scope.loadWikis = function () {
        webServiceFactory.getCategory($scope.categoryT).success(function (data) {
            $scope.category = data;
        });
    };

    $scope.$on('$viewContentLoaded', function () {
        if ($scope.category.length == 0) {
            $scope.loadWikis();
        }
    });

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
        },

        getCategories: function () {
            return $http.get('api/getCategories/');
        },

        getCategory: function (category) {
            return $http.get('api/getWikiByCategory/' + category);
        }
    };
}]);


/*
 * Route configuration to navigation to all the SPA views
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/wiki/:wikiTitle', {
            templateUrl: 'wiki/wiki.html',
            controller: 'wikiCtrl'
        })
        .when('/wikiList', {
            templateUrl: 'wikiList/wikiList.html',
            controller: 'wikiListCtrl'
        }).when('/getCategories', {
            templateUrl: 'categories/categories.html',
            controller: 'categoriesCtrl'
        }).when('/category/:categoryTitle', {
            templateUrl: 'category/category.html',
            controller: 'categoryCtrl'
        })
        .otherwise({redirectTo: '/wikiList'});
}]);















