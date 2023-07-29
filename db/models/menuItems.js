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
    type: Date
  },
  updatedAt: {
    type: Date
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

// Update with current date.

const update = async (req) => {
  try {
    const id = req.params;
    const currentDate = Date.now();
    const updatedBody = { ...req.body, updatedAt: currentDate };
    const menuItem = await MenuItems.updateOne(id, { $set: updatedBody });
    return menuItem;
  } catch (error) {
    return error;
  }
};

const deleteMenu = async (req) => {
  try {
    const id = req.params;
    const menu = await MenuItems.deleteOne(id);
    return menu;
  } catch (err) {
    return err;
  }
};

const searchMenu = async (req) => {
  try {
    const query = req.query.q; // Access the query parameter 'q' from req.query
    const filter = {
      $or: [
        { name: { $regex: query, $options: "i" } }, // Search by name (case-insensitive)
        { description: { $regex: query, $options: "i" } } // Search by description (case-insensitive)
      ]
    };
    const menuItems = await MenuItems.find(filter);
    return menuItems;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteMenu,
  searchMenu,
  MenuItems
};
