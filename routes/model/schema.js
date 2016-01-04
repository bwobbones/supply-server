var mongoose = require('mongoose');

var partSchema = mongoose.Schema({
  partName: String,
  supplierId: {type: mongoose.Schema.ObjectId, ref: 'Supplier'},
  leadTimeDays: Number,
  price: Number,
  minOrder: Number,
  purchaseOrder: String
});
var Part = mongoose.model('Part', partSchema);

var partOrderSchema = mongoose.Schema({
  part: {type: mongoose.Schema.ObjectId, ref: 'Part'},
  // part: [partSchema],
  order: {type: mongoose.Schema.ObjectId, ref: 'Order'},
  dateToOrder: Date,
  quantity: Number
});
var PartOrder = mongoose.model('PartOrder', partOrderSchema);

var orderSchema = mongoose.Schema({
  orderNumber: Number,
  orderPersonName: String,
  dateRequired: Date,
  parts: [partSchema],
  partOrders: [partOrderSchema]
});
var Order = mongoose.model('Order', orderSchema);

var supplierSchema = mongoose.Schema({
  supplierName: String
});
var Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = {
  Part: Part,
  Order: Order,
  PartOrder: PartOrder,
  Supplier: Supplier
};
