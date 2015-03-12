var servicesModule = angular.module('oseas.services', []);

servicesModule.factory('OrderService', function($http) {

  return {

    sendOrder: function(order, callback) {
      $http.post('/api/order', { order: order })
        .success(function(status) {
          callback(true);
        })
        .error(function(status) {
          callback(false);
        });
    }

  };
});

servicesModule.factory('UserSessionService', function($http) {

  var user = {};

  return {
    checkLoggedIn: function(callback) {
      $http.get('/api/user').
        success(function(data, status, headers, config) {
          if (typeof data.username !== 'undefined') {
            console.log ("data.username: " + data.username);
            user = data;
            callback(data);
          }
          else {
            callback(null);
          }
        });
    },

    logIn: function(username, password, callback) {
      $http.post('/api/user/login', {username: username, password: password}).
        success(function(data, status) {
          user = data; // Set our local variable
          callback(true);
        }).
        error(function(data, status) {
          callback(false);
        });
    },

    logOut: function(callback) {
      $http.post('/api/user/logout')
      .success(function(status) {
          callback(true);
        });
    }
  };
});

servicesModule.factory('ContentService', function($http) {

  return {

    getProduct: function(productName, callback) {
      $http.get('/api/product/' + productName)
        .success(function(data) {
          console.log('Successfully got product');
          callback(data);
        })
        .error(function(status) {
          callback(null);
        }); 
    },

    getAllProducts: function(callback) {
      $http.get('/api/product')
        .success(function(data) {
          callback(data);
        })
        .error(function(status) {
          callback(null);
        }); 
    },

    getEvent: function(eventName, callback) {

    }
  };
});

servicesModule.factory('PublishContentService', function($http, $upload) {

  return {

    publishProduct: function(name, category, price, description, composition, 
        care, modelHeight, modelSize, sizeSmall, sizeMedium, sizeLarge, 
        mainImage, secondaryImages, callback) {

      console.log("mainImage.url : " + mainImage.url);
      console.log("secondaryImages[0].url : " + secondaryImages[0].url);

      var secondaryImagesURL = [];
      for (var i = 0; i < secondaryImages.length; i++) {
        secondaryImagesURL.push(secondaryImages[i].url);
      }

      var postObject = {};
      postObject.name = name;
      postObject.category = category;
      postObject.price = price;
      postObject.description = description;
      postObject.composition = composition;
      postObject.care = care;
      postObject.modelHeight = modelHeight;
      postObject.modelSize = modelSize;
      postObject.sizeSmall = sizeSmall;
      postObject.sizeMedium = sizeMedium;
      postObject.sizeLarge = sizeLarge;
      postObject.mainImage = mainImage.url;
      postObject.secondaryImages = secondaryImagesURL;


      $http.post('/api/publish/product', postObject,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).success(function(status) {
        callback(true);
      }).error(function(status) {
        callback(false);
      });
    },

    publishProductImage: function(files, callback) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          $upload.upload({
            url: '/api/publish/product/image',
            file: file
          }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            callback(data);
            //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    },
    
    publishEvent: function() {

    }
  };
});
