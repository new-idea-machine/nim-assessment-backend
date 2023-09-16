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

const update = async (req, res) => {
  try {
    const menu = await MenuItems.update(req.params.id, req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const menu = await MenuItems.deleteItem(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchQuery = async (req, res) => {
  try {
    const menu = await MenuItems.searchQuery(req.query.q);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, update, deleteItem, searchQuery };
