/**
 * Created by bwobbones on 27/06/15.
 */

var express = require('express');
var router = express.Router();
var Supplier = require('../../routes/model/schema').Supplier;

router.put('/supplier', function(req, res) {
  
  var supplier = new Supplier(req.body);

  supplier.save(function (err) {
    if (err) {
      console.error(err);
    }
   
    res.json({
      supplierId: supplier._id
    });
  });

});

module.exports = router;
