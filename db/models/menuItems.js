const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const search = async (query) => {
  const queryRegex = new RegExp(query, "i");
  try {
    const menuItems = await MenuItems.find({
      $or: [{ name: queryRegex }, { description: queryRegex }]
    }).exec();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const updateOne = async (id, body) => {
  try {
    const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
    return menuItem;
  } catch (error) {
    return error;
  }
};

const deleteOne = async (id) => {
  try {
    await MenuItems.deleteOne({ _id: id });
    return id;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  search,
  getOne,
  create,
  updateOne,
  deleteOne,
  MenuItems
};
