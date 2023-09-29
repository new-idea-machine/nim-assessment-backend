const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateOne = async (req, res) => {
  const menuItemId = req.params.id;
  const updateFields = req.body;
  try {
    const updatedMenuItem = await MenuItems.updateOne(menuItemId, updateFields);
    if (!updatedMenuItem) {
      return res.status(404).send("Menu item not found");
    }
    res.send(updatedMenuItem);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, updateOne };
