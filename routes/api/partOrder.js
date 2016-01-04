/**
 * Created by bwobbones on 27/06/15.
 */

var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

var Part = require('../../routes/model/schema').Part;
var PartOrder = require('../../routes/model/schema').PartOrder;
var Order = require('../../routes/model/schema').Order;

router.post('/partOrders', function(req, res) { 
  
  var queryDate = moment(req.body.queryDate);
  
  var queryStart = moment(queryDate).startOf('day');
  var queryEnd = moment(queryDate).endOf('day');
  
  PartOrder.find({ dateToOrder: {$gte: queryStart, $lt: queryEnd} }, function (err, partOrders) {
    var opts = [{ path: 'part' }, { path: 'order' }];
  
    PartOrder.populate(partOrders, opts).then(function(partsToOrder) {
      res.json({
        data: partsToOrder
      });
    });
  });
  
});

module.exports = router;
