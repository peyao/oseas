angular.module('oseas.controllers', [])

.controller('NavCtrl', function($scope, $rootScope, $location){

  $rootScope.elCat = angular.element( document.querySelector('#nav-cat'));
  $rootScope.elAbout = angular.element( document.querySelector('#nav-about'));
  $rootScope.elContact = angular.element( document.querySelector('#nav-contact'));
})

.controller('HomeCtrl', function($scope, $rootScope, $state, $location) {

  $scope.eventRedirect = function() {
    console.log('Going to event');
    $state.go('event');
  };
})

.controller('CatalogueCtrl', function($scope, $rootScope, $location, ContentService) {
  ContentService.getAllProducts(function(products) {
    $scope.products = products;
    console.log('products[0].mainImage:' + products[0].mainImage);
  });
})

.controller('ProductCtrl', function($scope, $rootScope, $location, $stateParams, ContentService, ngDialog) {

  $('.ui.dropdown')
    .dropdown();

  $scope.lightbox = function (image) {

    console.log('image: ' + image);
    ngDialog.open({
      template: '<img class="ui fluid image" ng-src="' + image + '">',
      plain: true
    });

    /*
    $scope.secondaryIndex = $scope.product.secondaryImages.indexOf(image);
    console.log('secondaryIndex: ' + $scope.secondaryIndex);
    console.log('indexUrl: ' + $scope.product.secondaryImages[$scope.secondaryIndex]);
    if ($scope.secondaryIndex >= 0)
      $('#secondary-modal').modal('show');
    else
      $('#main-modal').modal('show');
    */
  };

  ContentService.getProduct($stateParams.productName, function(product) {
    $scope.product = product;

  });
})

.controller('OrderFormCtrl', function($scope, $rootScope, $location) {
  
})

.controller('AboutCtrl', function($scope, $rootScope, $location) {

})

.controller('ContactCtrl', function($scope, $rootScope, $location) {

})

.controller('EventsCtrl', function($scope, $rootScope, $location) {
})

.controller('EventCtrl', function($scope, $rootScope, $location) {
})

.controller('AdminCtrl', function($scope, $rootScope, $location, UserSessionService, PublishContentService) {

  // TODO REMOVE THIS
  $scope.loggedIn = true; // REMOVE THIS!

  $scope.uploadedSecondary = [];
  $scope.sizes = {
    small: true,
    medium: true,
    large: true
  };
  $scope.product = {};

  $('#login-form')
    .dimmer({
      closable: false
    });

  $('.dropdown')
    .dropdown();

  $('.ui.checkbox')
    .checkbox();

  $('.tabular.menu .item')
    .tab({history: false});

  $scope.chooseFile = function() {
    $('#imageFile').click();
  };

  $scope.setProductCategory = function (category) {
    $scope.product.category = category;
  };

  $scope.setProductModelSize = function (modelSize) {
    $scope.product.model.size = modelSize;
  };

  $scope.toggleProductSizeAvailable = function (size) {
    if (size === 'small') $scope.sizes.small = !$scope.sizes.small; 
    if (size === 'medium') $scope.sizes.medium = !$scope.sizes.medium; 
    if (size === 'large') $scope.sizes.large = !$scope.sizes.large; 
  };

  // mainFile
  $scope.$watch('mainFile', function () {
    PublishContentService.publishProductImage($scope.mainFile, function(uploadedFile) {
      console.log('uploadedFile.name: ' + uploadedFile.name);
      $scope.uploadedMain = uploadedFile;
    });
  });

  $scope.$watch('secondaryFiles', function () {
    PublishContentService.publishProductImage($scope.secondaryFiles, function(uploadedFile) {
      $scope.uploadedSecondary.push(uploadedFile);
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
        $('#login-unsuccessful-modal').modal('show');
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

  $scope.catalogueIsValid = function() {
    
  };

  $scope.publishCatalogue = function (product) {
    console.log('Publishing Catalogue...');
    PublishContentService.publishProduct(product.name, $scope.product.category, product.price, 
      product.description, product.composition, product.care, product.model.height, 
      product.model.size, $scope.sizes.small, $scope.sizes.medium, $scope.sizes.large,
      $scope.uploadedMain, $scope.uploadedSecondary, function(status) {
        if (status) {
          console.log('Publish successful.');
          $('#publish-success-modal').modal('show');
        }
        else {
          console.log('Publish failed');
          $('#publish-fail-modal').modal('show');
        }
      });
  };

  $scope.publishEvent = function (event) {

  };

})

