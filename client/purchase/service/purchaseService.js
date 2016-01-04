appServices.factory("PurchaseService", function($http, $rootScope, _) {
  var purchaseService = {
    
    findTodaysPurchases: function(scope) {
      var promise = $http.post('/api/partOrders', {queryDate: scope.form.selectedDate}).success(function(data) {
        return data;
      });
      return promise;
    },
    
    savePurchases: function(scope) {
      var promise = $http.put('/api/parts', { purchases: scope.purchases }).success(function(data) {
        return data;
      });
      return promise;
    }
       
  };
  return purchaseService;
});