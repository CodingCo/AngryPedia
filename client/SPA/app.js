/**
 * Created by Robert on 18/11/14.
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('WikiApp', [
    'ngRoute',
    'WikiApp.wiki',
    'WikiApp.wikiList',
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/wikiList'});
    }]);
