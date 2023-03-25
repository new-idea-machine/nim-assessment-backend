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

// Would Get endpoint that will be able to calucaulte the total price of the order
const totalPrice = async () => {
  const orders = await Order.find({ status: "delivered" }).populate(
    "items.item"
  );

  const total = orders.reduce((initialVal, order) => {
    const itemsPrice = order.items.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.item.price * currentValue.quantity,
      0
    );
    console.log("itemsPrice", itemsPrice);
    return itemsPrice + initialVal;
  }, 0);
  console.log("total", total);
  return total;
};
// Total price by date
const totalPriceByDate = async (startDate, endDate) => {
  const orders = await Order.find({ status: "delivered" })
    .populate("items.item")
    .where("createdAt")
    .gte(startDate)
    .lte(endDate);
  const total = orders.reduce((initialVal, order) => {
    const itemsPrice = order.items.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.item.price * currentValue.quantity,
      0
    );
    console.log("itemsPricebyData", itemsPrice);
    return itemsPrice + initialVal;
  }, 0);
  console.log("totalbyDate", total);
  return total;
};

// getByStatus by date
const getByStatusByDate = async (startDate, endDate, status) => {
  const orders = await Order.find({ status })
    .populate("items.item")
    .where("createdAt")
    .gte(startDate)
    .lte(endDate);
  return orders;
};

module.exports = {
  getAll,
  getOne,
  update,
  remove,
  getByStatus,
  Order,
  create,
  totalPrice,
  totalPriceByDate,
  getByStatusByDate
};
