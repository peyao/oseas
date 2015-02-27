angular.module('oseas.controllers', [])

.controller('TabCtrl', function($scope, UserSessionService){

})

.controller('HomeCtrl', function($scope) {
})

.controller('CatalogueCtrl', function($scope, Friends) {
  
})

.directive('fade', function() {
	  return {
			link: function(scope, element, attrs) {

	      $(element).click(function(){
          $(element).transition('fade');
        });
	    }
	};
});
