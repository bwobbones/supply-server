/**
 * Created by bwobbones on 27/06/15.
 */

var async = require('async');
var express = require('express');
var router = express.Router();
var Part = require('../../routes/model/schema').Part;

router.put('/part', function(req, res) {
  
  var part = new Part(req.body);

  part.save(function (err) {
    if (err) {
      console.error(err);
    }
   
    res.json({
      partId: part._id
    });
  });

});

router.put('/parts', function(req, res) {
  
  var purchases = req.body.purchases;
  
  async.each(purchases, function(purchase, callback) {
    var part = new Part(purchase.part);
    part.isNew = false;
    part.save(function(err) {
      if (err) console.log(err);
      callback();
    });
  }, function(err) {
    if (err) console.log(err);
    res.send(200);
  });
  
});

module.exports = router;
