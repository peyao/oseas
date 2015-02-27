angular.module('oseas', ['oseas.controllers', 'oseas.services', 'ui.router'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  /*
  $httpProvider.defaults.transformRequest = function (data) {
    if ( data === undefined ) {
      return data;
    }
    return $.param(data);
  };
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  */
  

  $stateProvider

    // Each tab has its own nav history stack:
    .state('nav', {
      templateUrl: 'views/nav.html'
    })

    .state('home', {
      parent: 'nav',
      url: '/home',
      templateUrl: 'views/home.html'
    })
    
    .state('catalogue', {
      parent: 'nav',
      url: '/catalogue',
      templateUrl: 'views/catalogue.html',
      controller: 'CatalogueCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});