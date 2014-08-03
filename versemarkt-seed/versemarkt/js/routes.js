"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'versemarkt/partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/koop', {
         templateUrl: 'versemarkt/partials/koop.html',
         controller: 'BuyCtrl'
      });
       
      $routeProvider.when('/verkoop', {
         templateUrl: 'versemarkt/partials/verkoop.html',
         controller: 'SellCtrl'
      });
       
      $routeProvider.when('/kweek', {
         templateUrl: 'versemarkt/partials/kweek.html',
         controller: 'ChatCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'versemarkt/partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'versemarkt/partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);