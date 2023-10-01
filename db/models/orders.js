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
      _id: false,

      item: {
        type: mongoose.Schema.Types.ObjectId,
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
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

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

const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items");
  return orders;
};

const getTotalSales = async (startDate, endDate) => {
  const filter = {};

  if (startDate && endDate) {
    // If both start and end dates are provided as query params, filter by date range
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const orders = await Order.find(filter).populate("items.item");
  const totalSales = orders.reduce((total, order) => {
    // Calculate the total price for each order
    const orderTotal = order.items.reduce((currentOrderTotal, orderItem) => {
      const itemPrice = orderItem.item.price; // Access price from the populated item
      const itemTotal = itemPrice * orderItem.quantity;
      return currentOrderTotal + itemTotal;
    }, 0);
    return total + orderTotal;
  }, 0);
  return totalSales;
};

const getOrdersByStatus = async (status, startDate, endDate) => {
  const filter = { status };

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const orders = await Order.find(filter).populate("items.item");
  return orders;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  getTotalSales,
  getOrdersByStatus,
  Order
};
