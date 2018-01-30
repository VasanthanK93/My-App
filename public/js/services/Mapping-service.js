// public/js/services/NerdService.js
angular.module('MappingService', []).factory('MappingService', ['$http', '$q', function($http, $q) {

  return {
    // call to get all nerds
    Branch: function() {

      var defer = $q.defer();

      $http({
        method: 'GET',
        url: '/api/Branch'
      }).then(function successCallback(response) {
        defer.resolve(response);
      }, function errorCallback(response) {
        defer.reject('Error occured while retrieving data');
      });

      return defer.promise;
    }
  }
/*   return {
    CashBank: function() {

      var defer = $q.defer();

      $http({
        method: 'GET',
        url: '/api/CashBank'
      }).then(function successCallback(response) {
        defer.resolve(response);
      }, function errorCallback(response) {
        defer.reject('Error occured while retrieving data');
      });

      return defer.promise;
    }
  }
  return {
    chequeBank: function() {

      var defer = $q.defer();

      $http({
        method: 'GET',
        url: '/api/ChequeBank'
      }).then(function successCallback(response) {
        console.log(response);
        defer.resolve(response);
      }, function errorCallback(response) {
        defer.reject('Error occured while retrieving data');
      });

      return defer.promise;
    }
  }
  return {
    DraftBank: function() {

      var defer = $q.defer();

      $http({
        method: 'GET',
        url: '/api/DraftBank'
      }).then(function successCallback(response) {
        console.log(response);
        defer.resolve(response);
      }, function errorCallback(response) {
        defer.reject('Error occured while retrieving data');
      });

      return defer.promise;
    }
  } */

}]);