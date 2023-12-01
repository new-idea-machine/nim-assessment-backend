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
}, {
  timestamps: true
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

const update = async (id, body) => {
  try {
    const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
    return menuItem;
  } catch (error) {
    return error;
  }
};

const deleteMenu = async (id) => {
  try {
    await MenuItems.findByIdAndDelete(id);
    return id;
  } catch (error) {
    return error;
  }
};

const search = async (query) => {
  try {
    const menuFinded = await MenuItems.find({
      description: new RegExp(query.q, "i")
    });
    return menuFinded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteMenu,
  search,
  MenuItems
};
