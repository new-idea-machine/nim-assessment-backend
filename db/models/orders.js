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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  const orders = await Order.find().populate("items._id");
  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items._id");
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
  return order;
};

const getByCustomer = async (id) => {
  const orders = await Order.find({ "customer._id": id }).populate("items._id");
  return orders;
};

const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items._id");
  return orders;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus
};
