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
  delivery: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      _id: {
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
  }
});
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const order = await Order.create(body);
    return order;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    return order;
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  try {
    const order = await Order.findByIdAndDelete(id);
    return order;
  } catch (error) {
    return error;
  }
};

const getByCustomer = async (id) => {
  try {
    const orders = await Order.find({ "customer._id": id });
    return orders;
  } catch (error) {
    return error;
  }
};

const getByStatus = async (status) => {
  try {
    const orders = await Order.find({ status });
    return orders;
  } catch (error) {
    return error;
  }
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
