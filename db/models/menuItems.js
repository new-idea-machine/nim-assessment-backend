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

menuItemsSchema.index({ name: "text", description: "text" });

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

const updateOne = async (id, updateFields, updatedAt) => {
  try {
    const updatedMenuItem = await MenuItems.findByIdAndUpdate(
      id,
      { ...updateFields, updatedAt },
      { new: true }
    );
    return updatedMenuItem;
  } catch (error) {
    return error;
  }
};

const deleteOne = async (id) => {
  try {
    const deletedMenuItem = await MenuItems.findByIdAndDelete(id);
    return deletedMenuItem;
  } catch (error) {
    return error;
  }
};

const search = async (query) => {
  try {
    const searchResults = await MenuItems.find({ $text: { $search: query } });
    return searchResults;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
  search,
  MenuItems
};
