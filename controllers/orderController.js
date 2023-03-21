import {
  getAll as _getAll,
  getOne as _getOne,
  update as _update,
  remove as _remove,
  create as _create,
  // getByCustomer as _getByCustomer,
  getByStatus as _getByStatus
} from "../db/models/orders.js";

const getAll = async (req, res) => {
  try {
    const orders = await _getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await _getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await _create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await _update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await _remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const getByCustomer = async (req, res) => {
//   try {
//     const orders = await _getByCustomer(req.params.id);
//     res.send(orders);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const getByStatus = async (req, res) => {
  try {
    const orders = await _getByStatus(req.params.status);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  // getByCustomer,
  getByStatus
};
