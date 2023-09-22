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

const search = async (searchTerm) => {
  let filter = {};
  filter = {
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } }
    ]
  };
  const menuItems = await MenuItems.find(filter);
  return menuItems;
};
const update = async (id, updatedFields) => {
  const updateFiled = { ...updatedFields, updatedAt: new Date() };
  const updatedMenuItem = await MenuItems.findByIdAndUpdate(
    id,
    { $set: updateFiled },
    {
      new: true
    }
  );
  return updatedMenuItem;
};

const getAllByIds = async (itemIds) => {
  try {
    const items = await MenuItems.find({ _id: { $in: itemIds } });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch items");
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
const deleteById = async (id) => {
  const deletedItem = await MenuItems.findByIdAndDelete(id);
  return deletedItem.id;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteById,
  getAllByIds,
  search,
  MenuItems
};
