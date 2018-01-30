'use strict';
var Mapping = angular.module('Mapping', ['ui.router', 'MainCtrl', 'MappingService']);

Mapping.config(function($stateProvider, $urlRouterProvider) {
    
	 
    $urlRouterProvider.otherwise('/ManageBranches');
    
    $stateProvider

        .state('home', {
            url: '/ManageBranches',
            templateUrl: 'views/ManageBranches.html',
            controller: 'MainController'
        })
});

