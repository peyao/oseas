var servicesModule = angular.module('oseas.services', []);

servicesModule.factory('UserSessionService', function($http){

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
