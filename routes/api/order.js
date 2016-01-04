
/**
 * Created by bwobbones on 27/06/15.
 */

var express = require('express');
var router = express.Router();
var faker = require('faker');
var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
require('mongoose-power-populate')(mongoose);
var Order = require('../../routes/model/schema').Order;
var Part = require('../../routes/model/schema').Part;
var PartOrder = require('../../routes/model/schema').PartOrder;

router.put('/order', function(req, res) {
  
  var order = new Order(req.body);
  
  calculatePurchaseDates(order);
  calculateOrderTotalCost(order);

  order.save(function (err) {
    if (err) {
      console.error(err);
    }
   
    res.json({
      orderId: order._id
    });
  });

});

function calculatePurchaseDates(order) {
  
  _.each(order.parts, function(part) {
    var partOrder = new PartOrder({
      part: part,
      order: order,
      dateToOrder: moment(order.dateRequired).subtract(part.leadTimeDays, 'days'),
      quantity: faker.random.number({ min: 1, max: 100 })
    });
    partOrder.save(function (err) {
      if (err) {
        console.error(err);
      }
    });
    order.partOrders.push(partOrder);
  });
  
}

function calculateOrderTotalCost(order) {
  
}

router.get('/order', function(req, res) { 
  
  Order.find(function (err, orders) {
    if (err) return console.error(err);
    
    var newOrders = [];
    var partCount = 0;
    _.each(orders, function(order) {
        Part.populate(order.partOrders, 'part', function(err, parts) { 
          partCount = partCount + 1;
          newOrders.push(order);
          if (partCount === orders.length) {
            res.json({
              data: newOrders
            });
          }
        });
    });
    
  }); 
});

module.exports = router;
