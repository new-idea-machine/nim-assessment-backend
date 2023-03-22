import {
  getAll as _getAll,
  getOne as _getOne,
  create as _create,
  update as _update,
  remove as _remove,
  search as _search
} from "../db/models/menuItems.js";

const getAll = async (req, res) => {
  try {
    const menu = await _getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await _getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await _create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const menu = await _update(req.params.id, req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const menu = await _remove(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const search = async (req, res) => {
  try {
    if (req.query.search === undefined) {
      res.status(400).send("Search terms not provided");
    }

    const menu = await _search(req.query.search);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getAll, getOne, create, update, remove, search };
