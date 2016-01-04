angularModules.config(function ($stateProvider) {
  $stateProvider.state('index', {      
      url: '/',
      views: {
        "dataPanel": { templateUrl: "partials/index/index", controller: IndexCtrl}
      }      
    });
});

angularModules.controller('IndexCtrl', ['$scope', '$rootScope', '$state', 'IndexService', IndexCtrl]);

function IndexCtrl($scope, $rootScope, $state, IndexService) {
  
  IndexService.findAllOrders($scope).then(function(httpResult) {
    $scope.orders = httpResult.data;
    $scope.displayedOrders = [].concat($scope.orders);
  }) 
  
}