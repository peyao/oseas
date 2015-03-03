angular.module('oseas.controllers', [])

.controller('NavCtrl', function($scope, $rootScope, $location){

  $rootScope.elCat = angular.element( document.querySelector('#nav-cat'));
  $rootScope.elAbout = angular.element( document.querySelector('#nav-about'));
  $rootScope.elContact = angular.element( document.querySelector('#nav-contact'));
})

.controller('HomeCtrl', function($scope, $rootScope, $state, $location) {

  setActiveLink($location.path(), $rootScope.elCat, $rootScope.elAbout, $rootScope.elContact);

  $scope.eventRedirect = function() {
    console.log('Going to event');
    $state.go('event');
  };
})

.controller('CatalogueCtrl', function($scope, $rootScope, $location) {

  setActiveLink($location.path(), $rootScope.elCat, $rootScope.elAbout, $rootScope.elContact);
})

.controller('ProductCtrl', function($scope, $rootScope, $location) {
})

.controller('OrderFormCtrl', function($scope, $rootScope, $location) {
  
})

.controller('AboutCtrl', function($scope, $rootScope, $location) {

  setActiveLink($location.path(), $rootScope.elCat, $rootScope.elAbout, $rootScope.elContact);
})

.controller('ContactCtrl', function($scope, $rootScope, $location) {

  setActiveLink($location.path(), $rootScope.elCat, $rootScope.elAbout, $rootScope.elContact);

})

.controller('EventsCtrl', function($scope, $rootScope, $location) {
})

.controller('EventCtrl', function($scope, $rootScope, $location) {
})

.directive('fade', function() {
	  return {
			link: function(scope, element, attrs) {

	      $(element).click(function(){
          $(element).transition('fade');
        });

	    }
	};
})

.directive('showSidebar', function() {
	return {
    link: function(scope, element, attrs) {

      $(element).click(function() {
        $('.sidebar').sidebar('toggle');
      });

    }
  };
});

// Helper functions
/*
var removeBackground = function($rootScope) {
  $rootScope.body.removeClass('background-image');
  $rootScope.body.addClass('background-black');
};

var restoreBackground = function($rootScope) {
  $rootScope.body.addClass('background-image');
}


*/

var setActiveLink = function(currentPage, elCat, elAbout, elContact) {
  console.log(currentPage);
  switch(currentPage) {
    case "/home":
      $(elCat).removeClass('hvr-underline-from-center:active');
      $(elAbout).removeClass('hvr-underline-from-center:active');
      $(elContact).removeClass('hvr-underline-from-center:active');
      break;
    case "/catalogue":
      $(elCat).addClass('red');
      $(elAbout).removeClass('hvr-underline-from-center:active');
      $(elContact).removeClass('hvr-underline-from-center:active');
      break;
    case "/about":
      $(elCat).removeClass('hvr-underline-from-center:active');
      $(elAbout).addClass('hvr-underline-from-center:active');
      $(elContact).removeClass('hvr-underline-from-center:active');
      break;
    case "/catalogue":
      $(elCat).removeClass('hvr-underline-from-center:active');
      $(elAbout).removeClass('hvr-underline-from-center:active');
      $(elContact).addClass('hvr-underline-from-center:active');
      break;
  }  
}