var servicesModule = angular.module('oseas.services', []);

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

servicesModule.factory('PublishContentService', function($http, $upload) {

  return {

    publishProduct: function(name, category, price, description, composition, 
        care, modelHeight, modelSize, sizeSmall, sizeMedium, sizeLarge, callback) {

      $http.post('/api/publish/product', {
        name        : name,
        category    : category,
        price       : price,
        description : description,
        composition : composition,
        care        : care,
        modelHeight : modelHeight,
        modelSize   : modelSize,
        sizeSmall   : sizeSmall,
        sizeMedium  : sizeMedium,
        sizeLarge   : sizeLarge
      }).success(function(status) {
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
            callback(config.file.name);
            //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    },
    
    publishEvent: function() {

    }
  };
});
