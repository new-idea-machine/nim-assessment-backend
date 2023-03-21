import mongoose from "../db.js";

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
export const Order = mongoose.model("Order", orderSchema);

export const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

export const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

export const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

export const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

export const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

export const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items");
  return orders;
};

// export default {
//   getAll,
//   getOne,
//   update,
//   remove,
//   getByStatus,
//   Order
// };
