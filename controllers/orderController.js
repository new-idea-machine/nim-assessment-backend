const MenuItems = require("../db/models/menuItems.js");
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

const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatus = async (req, res) => {
  try {
    const orders = await Order.getByStatus(req.params.status);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const calculateTotalSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let totalSales = 0;

    const orders = await Order.getOrders(startDate, endDate);
    if (orders) {
      const allItems = [];

      orders.forEach((order) => {
        allItems.push(...order.items);
      });

      const itemDetailsArray = await MenuItems.getAllByIds([
        ...new Set(allItems.map((item) => item.item))
      ]);

      const itemDetailsMap = itemDetailsArray.reduce(
        // Disabling eslint as we need to get items by _id
        // eslint-disable-next-line no-underscore-dangle
        (map, item) => map.set(item._id.toString(), item.price),
        new Map()
      );

      totalSales += allItems.reduce(
        (total, item) =>
          total +
          parseFloat(itemDetailsMap.get(item.item.toString())) * item.quantity,
        0
      );
    }
    res.json({ total: totalSales });
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
  getByCustomer,
  getByStatus,
  calculateTotalSales
};
