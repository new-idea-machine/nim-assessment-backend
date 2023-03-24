import mongoose from "../db.js";

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
export const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

export const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

export const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

export const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

// put endpoint
export const update = async (id, body) => {
  try {
    const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
    return menuItem;
  } catch (error) {
    return error;
  }
};

// delete endpoint
export const remove = async (id) => {
  try {
    const menuItem = await MenuItems.findByIdAndDelete(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

// Search endpoint,search query parameter return name and description contain the parameter.
export const search = async (query) => {
  const regExpress = new RegExp(query, "ig");
  console.log("regExpress", regExpress);
  const menuItems = await MenuItems.find().where(
    { description: regExpress } || { name: regExpress }
  );
  // console.log("menuItems", menuItems);
  if (menuItems.length === 0) {
    console.log("No results found");
    throw new Error("No results found");
  }
  return menuItems;
};
// export const search = async (searchQuery) => {
//   const regRegex = new RegExp(searchQuery, "ig");
//   const menuItems = await MenuItems.find({
//     $or: [{ name: regRegex }, { description: regRegex }]
//   });
//   // return menuItems;
//   if (menuItems.length === 0) {
//     return "No results found";
//   }
//   return menuItems;
// };

// export default { getAll, getOne, create, MenuItems };
