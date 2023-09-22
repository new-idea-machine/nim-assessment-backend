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

menuItemsSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
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

const search = async (searchInput) => {
  try {
    const regex = new RegExp(searchInput, "i");
    const menu = await MenuItems.find({
      $or: [{ name: regex }, { description: regex }]
    });
    return menu;
  } catch (error) {
    return error;
  }
};

const updateOne = async (id, body) => {
  try {
    const { name, price, description, imageUrl } = body;
    const menu = await MenuItems.findOneAndUpdate(
      id,
      {
        name,
        price,
        description,
        imageUrl
      },
      { new: true }
    );

    return menu;
  } catch (error) {
    return error;
  }
};

const deleteOne = async (id) => {
  try {
    const menu = await MenuItems.findOneAndDelete({ _id: id });
    return menu.id;
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

module.exports = {
  getAll,
  getOne,
  search,
  updateOne,
  deleteOne,
  create,
  MenuItems
};
