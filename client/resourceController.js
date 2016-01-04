angularModules.controller('ResourceCtrl', ['$scope', '$rootScope', '$state', 'DateValidationService', ResourceCtrl]);

function ResourceCtrl($scope, $rootScope, $state, DateValidationService) {

  $rootScope.uploadableMimeTypes = "'application/vnd.openxmlformats-officedocument.wordprocessingml.document" +
    ",application/pdf," +
    "application/msword'";

  $scope.saveEvent = function($event) {
    $rootScope.$broadcast('saveDataEvent');
  };

  $scope.newJobDescription = function() {
    $rootScope.$emit('searchDataChangedEvent', { personnels: [] });
    $state.transitionTo('jobDescription.addJobDescription', undefined, { reload: true });
  };

  $rootScope.validateDate = function(date) {
    var valid = DateValidationService.validate(date);
    $rootScope.dateValidationMessage = !valid ? 'Date format needs to be like 1/1/2010 or Jan 2010' : undefined;
    return valid;
  };

}