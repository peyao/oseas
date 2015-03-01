angular.module('oseas.controllers', [])

.controller('NavCtrl', function($scope, $rootScope, $location){

  $rootScope.body = angular.element( document.querySelector('body'));
})

.controller('HomeCtrl', function($scope, $rootScope) {

})

.controller('CatalogueCtrl', function($scope, $rootScope) {

})

.controller('AboutCtrl', function($scope, $rootScope) {

})

.controller('ContactCtrl', function($scope, $rootScope) {

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