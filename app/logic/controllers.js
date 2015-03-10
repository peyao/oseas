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

.controller('AdminCtrl', function($scope, $rootScope, $location, UserSessionService, PublishContentService) {

  // TODO REMOVE THIS
  $scope.loggedIn = true; // REMOVE THIS!

  $scope.uploadedFiles = [];

  $('#login-form')
    .dimmer({
      closable: false
    });

  $('select.dropdown')
    .dropdown();

  $('.ui.checkbox')
    .checkbox();

  $('.tabular.menu .item')
    .tab({history: false});

  $scope.chooseFile = function() {
    $('#imageFile').click();
  };

  $scope.$watch('files', function () {
    PublishContentService.publishProductImage($scope.files, function(uploadedFilename) {
      $scope.uploadedFiles.push(uploadedFilename);
    });

  });

  UserSessionService.checkLoggedIn(function(user) {

    if (user !== null) {
      console.log('Dash: User has a session.');

      $scope.loggedIn = true;
      $rootScope.loggedIn = true;

      $('#login-form')
        .dimmer('show');
    }
  });
  
  $scope.login = function(credentials) {
    UserSessionService.logIn(credentials.username, credentials.password, function(status) {
      if (status) {
        console.log("Login successful");
        $('#login-form')
          .dimmer('show');

        $scope.loggedIn = true;
        $rootScope.loggedIn = true;
      }
      else {
        console.log("Login failed");
        $('.basic.modal').modal('show');
      }
    });
  };

  $scope.logout = function() {
    UserSessionService.logOut(function() {
      $scope.loggedIn = false;
      $rootScope.loggedIn = false;

      $('#login-form').dimmer('hide');
      $scope.credentials.username = "";
      $scope.credentials.password = "";

    });
  };

  $scope.publishCatalogue = function (product) {

    console.log('typeof product.image:' + (typeof product.image));

    // First upload image
    PublishContentService.publishProductImage(product.image, function(image) {
      if (image) {
        console.log('image uploaded successfully!: ' + image.url);

      }
    });
  };

  $scope.publishEvent = function (event) {

  };

})

.directive('fileread', [function() {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function() {
            scope.fileread = loadEvent.target.result;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
}])

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