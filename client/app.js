'use strict';

var angularModules = angular.module('myApp', [
  'toaster',
  'ui.bootstrap',
  'ui.router',
  'ui.unique',
  'ui.keypress',
  'ui.validate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'smart-table',
  'ngFileUpload',
  'uiGmapgoogle-maps',
  'ngSanitize',
  'cfp.hotkeys',
  'localytics.directives',
  'ui.select2',
  'ngAnimate',
  'fx.animations',
  'angular-loading-bar',
  'ui.bootstrap.datetimepicker',
  'ui.dateTimeInput'
]);

var minhrDirectives = angular.module('myApp.directives', []);

var minhrFilters = angular.module('myApp.filters', []);

var appServices = angular.module('myApp.services', []);

angularModules.config(function ($httpProvider, $stateProvider, $controllerProvider, $urlRouterProvider, $locationProvider, hotkeysProvider) {
  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(function($q, $location) {

    return function(promise) {
      return promise.then(
        // Success: just return the response
        function(response){
          return response;
        },

        // Error: check the error status to get only the 401
        function(response) {
          if (response.status === 401) {
            $location.url('/loginUser');
          }
          return $q.reject(response);
        }
      );
    };
  });
});