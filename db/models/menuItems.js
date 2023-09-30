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

const remove = async (id) => {
  const menuItem = await MenuItems.findByIdAndDelete(id);
  return menuItem.id;
};

const search = async (query) => {
  try {
    const menuItems = await MenuItems.find({
      $or: [{ name: { $regex: query } }, { description: { $regex: query } }]
    });
    // }
    return menuItems;
  } catch (error) {
    return error;
  }
};

module.exports = { getAll, getOne, create, remove, search, MenuItems };
