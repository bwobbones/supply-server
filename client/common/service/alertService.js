appServices.factory('AlertService', function(toaster) {
  
  var alertService = {
    add: function(type, msg, header) {
      if (header === undefined) {
        header = "Success!";
      }
      console.log('alert!');
      toaster.pop(type, header, msg);
    }
  };

  return alertService;
});