const mongoose = require("../db.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});

// order model
const Order = mongoose.model("Order", orderSchema);

orderSchema.statics.calcTotal = (items) => {
  const calculatedTotal = items.reduce(
    (total, orderItems) => total + orderItems.item.price * orderItems.quantity,
    0
  );
  return calculatedTotal;
};

const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

const getByStatus = async (s) => {
  const orders = await Order.find({ status: s });
  return orders;
};

const getTotalSales = async () => {
  const orders = await Order.find().populate("items.item");
  const totalSales = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (total, orderItem) =>
          total + orderItem.item.price * orderItem.quantity,
        0
      ),
    0
  );
  const result = { total: totalSales };
  return result;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  getTotalSales,
  Order
};
