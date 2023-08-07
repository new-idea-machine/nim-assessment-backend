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

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const item = await MenuItems.updateItem(id, body);
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await MenuItems.deleteItem(id);
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fuzzySearch = async (req, res) => {
  const { q } = req.query;
  try {
    const items = await MenuItems.fuzzySearch(q);
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  updateItem,
  deleteItem,
  fuzzySearch
};
