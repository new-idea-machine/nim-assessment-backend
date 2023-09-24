const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.q;
    const menuList = await MenuItems.search(query);
    res.send(menuList);
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
  try {
    const menu = await MenuItems.updateOne(req.params.id, req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const menuId = await MenuItems.deleteOne(req.params.id);
    res.send(menuId);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, search, getOne, create, updateOne, deleteOne };
