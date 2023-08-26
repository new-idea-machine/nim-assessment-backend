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

const deleteOne = async (req, res) => {
  try {
    const id = await MenuItems.deleteOne(req.params.id);
    res.send(id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const search = async (req, res) => {
  try {
    const menu = await MenuItems.search(req.query.q);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, update, deleteOne, search };
