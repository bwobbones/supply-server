angularModules.config(function ($stateProvider) {
  $stateProvider.state('purchase', {      
      url: '/purchase',
      views: {
        "dataPanel": { templateUrl: "partials/purchase/purchaseList", controller: PurchaseCtrl}
      }      
    });
});

angularModules.controller('PurchaseCtrl', ['$scope', '$rootScope', '$state', 'AlertService', 'PurchaseService', PurchaseCtrl]);

function PurchaseCtrl($scope, $rootScope, $state, AlertService, PurchaseService) {
  
  $scope.form = {};
  $scope.form.selectedDate = new Date();
  
  updatePurchases();
  
  $scope.$watch('form.selectedDate', function(newValue, oldValue) {
    
    var newDate = moment(newValue);
    var oldDate = moment(oldValue);
    
    if (!newDate.isSame(oldDate, 'day')) {
      $scope.form.selectedDate = newDate.toDate();
      updatePurchases();
    }
    
  });
  
  $scope.savePurchases = function() {
    PurchaseService.savePurchases($scope).then(function() {
      console.log('back...');
      AlertService.add("success", "Purchases saved");
    });
  }
  
  function updatePurchases() {
    PurchaseService.findTodaysPurchases($scope).then(function(httpResult) {
        $scope.purchases = httpResult.data.data;
        $scope.displayedPurchases = [].concat($scope.purchases);
      });
  }
  
}