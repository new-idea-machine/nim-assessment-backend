const MenuItems = require("../db/models/menuItems.js");

const getAllMenu = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOneMenu = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMenu = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await MenuItems.update(id, req.body);
    return res.send(menu);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await MenuItems.deleteMenu(req, res);
    return res.send(id);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const searchMenu = async (req, res) => {
  try {
    const menu = await MenuItems.searchMenu(req, res);
    if (menu.length !== 0) {
      return res.status(200).send(menu);
    }
    return res
      .status(200)
      .send(
        "No match result, Please change your search key word and search again"
      );
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllMenu,
  getOneMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  searchMenu
};
