appServices.factory("IndexService", function($http, $rootScope, _) {
  
  var indexService = {
    
    findAllOrders: function(scope) {
      var promise = $http.get('/api/order').success(function(data) {
        return data;
      });
      return promise;
    }
  };
  return indexService;
});