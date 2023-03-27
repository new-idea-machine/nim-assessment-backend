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

// put endpoint
const update = async (id, body) => {
  try {
    const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
    return menuItem;
  } catch (error) {
    return error;
  }
};

// delete endpoint
const remove = async (id) => {
  try {
    const menuItem = await MenuItems.findByIdAndDelete(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

// Search endpoint,search query parameter return name and description contain the parameter.
// Maggie's method
// const search = async (SearchQuery) => {
//   const regExpress = new RegExp(SearchQuery, "ig");
//   console.log("regExpress", regExpress);
//   const menuItems = await MenuItems.find().where(
//     { description: regExpress } || { name: regExpress }
//   );
//   // console.log("menuItems", menuItems);
//   if (menuItems.length === 0) {
//     console.log("No results found");
//     throw new Error("No results found");
//   }
//   return menuItems;
// };
const search = async (searchQuery) => {
  const regRegex = new RegExp(searchQuery, "ig");
  const menuItems = await MenuItems.find({
    $or: [{ name: regRegex }, { description: regRegex }]
  });
  // return menuItems;
  if (menuItems.length === 0) {
    return "No results found";
  }
  return menuItems;
};

module.exports = { getAll, getOne, create, MenuItems, search, update, remove };
