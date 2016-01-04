var async = require('async');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('lodash');
var faker = require('faker');
var rest = require('restler');

var Supplier = require('../routes/model/schema').Supplier;
var Part = require('../routes/model/schema').Part;
var Order = require('../routes/model/schema').Order;
var PartOrder = require('../routes/model/schema').PartOrder;

mongoose.connect('mongodb://localhost/supply');

var db = mongoose.connection;

var requiredSuppliers = 4;
var requiredParts = 2000;
var requiredOrders = 300;

var suppliers = [];
var parts = [];

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {

  function dropCollections(callback) {
    Supplier.remove({}, function(err) {
      if (err) {
        console.error(err);
      }
    });
    
    Part.remove({}, function(err) {
      if (err) {
        console.error(err);
      }
    });
    
    Order.remove({}, function(err) {
      if (err) {
        console.error(err);
      }
    });
    
    PartOrder.remove({}, function(err) {
      if (err) {
        console.error(err);
      }
    });

    console.log('suppliers, parts, order, partOrder dropped');
    callback(null, 'db removed');
  }
  
  function createSuppliers(callback) {
    _.times(requiredSuppliers, function(index) {
      var supplier = new Supplier({supplierName: faker.company.companyName()});
      suppliers.push(supplier);
     
      rest.putJson('http://localhost:3000/api/supplier', supplier).on('complete', function(data, response) {
        supplierFinisher(callback);
      });

    });
  }
  
  function createParts(callback) {
    _.times(requiredParts, function(index) {
      var part = new Part({
        partName: faker.hacker.noun(),
        supplierId: suppliers[_.random(0, suppliers.length-1)],
        leadTimeDays: faker.random.number({ min: 1, max: 100 }),
        price: faker.random.number({ min: 1, max: 10000 }),
        minOrder: faker.random.number({ min: 1, max: 100 })
      });
      parts.push(part);
     
      rest.putJson('http://localhost:3000/api/part', part).on('complete', function(data, response) {
        partFinisher(callback);
      });

    });
  }
  
  function createOrders(callback) {
    
    _.times(requiredOrders, function(index) {
      var orderParts = [];
      _.times(3, function() {
        orderParts.push(parts[_.random(0, parts.length-1)])
      });
      var order = new Order({
         orderNumber: faker.random.number({ min: 1, max: 1000000 }),
         orderPersonName: faker.name.firstName() + ' ' + faker.name.lastName(),
         parts: orderParts,
         dateRequired: faker.date.between(new Date(), new Date(2016, 1, 1, 0, 0, 0, 0))
      });
      
      rest.putJson('http://localhost:3000/api/order', order).on('complete', function(data, response) {
        orderFinisher(callback);
      });
    });
  }
  
  var supplierFinisher = _.after(requiredSuppliers, function(callback) {
    console.log('calling supplier callback');
    callback(null, 'done');
  });
  
  var partFinisher = _.after(requiredParts, function(callback) {
    console.log('calling part callback');
    callback(null, 'done');
  });
  
  var orderFinisher = _.after(requiredOrders, function(callback) {
    console.log('calling order callback');
    callback(null, 'done');
  });

  async.series([
    function(callback) {
      console.log('removing all docs');
      dropCollections(callback);
    },
    function(callback) {
      console.log('creating suppliers');
      createSuppliers(callback);
    },
    function(callback) {
      console.log('creating parts');
      createParts(callback);
    },
    function(callback) {
      console.log('creating order');
      createOrders(callback);
    },
    function(err, results) {
      console.log('closing');
      db.close();
    }
  ]);

});