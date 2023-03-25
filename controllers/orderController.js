const Order = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
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
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
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
  const { s } = req.query;
  try {
    const orders = await Order.getByStatus(s);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatusByDate = async (req, res) => {
  const { startDate, endDate, s } = req.query;
  try {
    if (!startDate || !endDate) {
      res.status(400).send("Please provide a start and end date");
    } else {
      const orders = await Order.getByStatusByDate(startDate, endDate, s);
      res.status(200).json({ orders });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOneTotal = async (req, res) => {
  try {
    const total = await Order.totalPrice(req.params.id);
    res.send(total);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotal = async (req, res) => {
  try {
    const total = await Order.totalPrice();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalbyDate = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    if (!startDate || !endDate) {
      res.status(400).send("Please provide a start and end date");
    } else {
      const total = await Order.totalPriceByDate(startDate, endDate);
      res.status(200).json({ total });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  // getByCustomer,
  getByStatus,
  getOneTotal,
  getTotal,
  getTotalbyDate,
  getByStatusByDate
};
