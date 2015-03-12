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

.controller('ProductCtrl', function($scope, $rootScope, $location, $stateParams, 
    ContentService, ngDialog) {

  $('.ui.dropdown')
    .dropdown();

  $scope.lightbox = function (image) {

    ngDialog.open({
      template: '<img class="ui fluid image" ng-src="' + image + '">',
      plain: true
    });
  };

  ContentService.getProduct($stateParams.productName, function(product) {
    $scope.product = product;
  });

  $scope.setOrderSize = function(size) {
    $scope.orderSize = size;
  };

  $scope.setOrderQuantity = function(quantity) {
    $scope.orderQuantity = quantity;
  };
})

.controller('OrderFormCtrl', function($scope, $rootScope, $location, $stateParams, 
    ContentService, OrderService) {

  $('.ui.checkbox').checkbox();

  $scope.order = {};
  $scope.order.productName = $stateParams.productName;
  $scope.order.size = $stateParams.orderSize;
  $scope.order.quantity = $stateParams.orderQuantity;
  $scope.order.agree = false;

  ContentService.getProduct($stateParams.productName, function(product) {
    $scope.product = product;
  });

  $scope.toggleAgree = function() {
    $scope.order.agree = !$scope.order.agree;
  };

  $scope.submitOrder = function(order) {
    OrderService.sendOrder(order, function(success) {
      if (success) {
        $('#email-success-modal').modal('show');
      }
      else {
        $('#email-fail-modal').modal('show');
      }
    });
  };
})

.controller('AboutCtrl', function($scope, $rootScope, $location) {

})

.controller('ContactCtrl', function($scope, $rootScope, $location) {

})

.controller('EventsCtrl', function($scope, $rootScope, $location) {
})

.controller('EventCtrl', function($scope, $rootScope, $location) {
})

.controller('AdminCtrl', function($scope, $rootScope, $location, UserSessionService, 
    PublishContentService) {

  // TODO REMOVE THIS
  //$scope.loggedIn = true; // REMOVE THIS!

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
  $scope.$watch('mainProductFile', function () {
    PublishContentService.publishProductImage($scope.mainProductFile, function(uploadedFile) {
      console.log('uploadedFile.name: ' + uploadedFile.name);
      $scope.uploadedMain = uploadedFile;
    });
  });

  $scope.$watch('secondaryProductFiles', function () {
    PublishContentService.publishProductImage($scope.secondaryProductFiles, function(uploadedFile) {
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
    console.log('Publishing Event...');
    PublishContentService.publishEvent(event.name, event.date, event.description,
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

});

