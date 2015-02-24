angular.module('oseas', ['oseas.controllers', 'oseas.services'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $httpProvider.defaults.transformRequest = function (data) {
    if ( data === undefined ) {
      return data;
    }
    return $.param(data);
  };
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    
    .state('tab.catalogue', {
      url: '/catalogue',
      views: {
        'tab-catalogue': { // View is tab-dash because it transitions from dashboard
          templateUrl: 'views/catalogue.html',
          controller: 'CatalogueCtrl'
        }
      }
    });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});