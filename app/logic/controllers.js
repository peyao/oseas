angular.module('oseas.controllers', [])

.controller('TabCtrl', function($scope, UserSessionService){

})

.controller('HomeCtrl', function($scope) {
})

.controller('CatalogueCtrl', function($scope, Friends) {
  
})

.directive('dropdownButton', function() {
	console.log("In directive!");
  return {
		link: function(scope, element, attrs) {

      console.log("attrs.dropdownButton: " + JSON.stringify(scope.$eval(attrs.dropdownButton)));
      $(element).dropdown(scope.$eval(attrs.dropdownButton));

      element.bind(attrs.dropdownButton, function() {
        
      });
    }
	};
});
