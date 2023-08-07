const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);
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

const updateItem = async (id, body) => {
  const { name, price, description, imageUrl } = body;
  const objectId = mongoose.Types.ObjectId(id);

  try {
    const existingItem = await getOne(objectId);

    if (!existingItem) {
      throw new Error("Item not found");
    }

    const updateInfo = {
      name: name || existingItem.name,
      price: price || existingItem.price,
      description: description || existingItem.description,
      imageUrl: imageUrl || existingItem.imageUrl
    };

    const updatedItem = await MenuItems.findByIdAndUpdate(
      objectId,
      updateInfo,
      {
        new: true
      }
    );

    return updatedItem;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async (id) => {
  const objectId = mongoose.Types.ObjectId(id);
  try {
    await MenuItems.findByIdAndDelete(objectId);
    return objectId;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getAll, getOne, create, updateItem, deleteItem, MenuItems };
