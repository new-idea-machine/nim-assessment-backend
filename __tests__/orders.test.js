require("dotenv").config();
const {
  create,
  getAll,
  getOne,
  getByStatus,
  update,
  remove,
  Order
} = require("../db/models/orders");
const preload = require("../db/preload-db");
const mongoose = require("../db/db");

describe("orders", () => {
  // setup
  const testOrder = {
    name: "test",
    address: "test address",
    phone: "123-456-7890",
    items: [
      {
        item: "5e6e2f0c5d6d7f1c8c1a9b0b",
        quantity: 1
      }
    ]
  };

  // teardown
  afterEach(async () => {
    await Order.deleteMany({});
  });

  describe("getAll", () => {
    it("should return an array of orders", async () => {
      const orders = await getAll();
      expect(orders).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return an order", async () => {
      const order = await create(testOrder);
      const foundOrder = await getOne(order._id);
      expect(foundOrder).toBeInstanceOf(Object);
    });
  });

  describe("create", () => {
    it("should create an order", async () => {
      const order = await create(testOrder);
      expect(order).toBeInstanceOf(Object);
    });
  });

  describe("update", () => {
    it("should update an order", async () => {
      const order = await create(testOrder);
      const updatedOrder = await update(order._id, { status: "completed" });
      expect(updatedOrder.status).toBe("completed");
    });
  });

  describe("remove", () => {
    it("should remove an order and return the id", async () => {
      const order = await create(testOrder);
      const removedOrder = await remove(order._id);
      console.log("removedOrder", removedOrder);
      expect(removedOrder).toBe(order._id.toString());
    });
  });

  describe("getByStatus", () => {
    it("should return an array of orders", async () => {
      const order = await create(testOrder);
      const orders = await getByStatus(order.status);
      expect(orders).toBeInstanceOf(Array);
    });
  });

  afterAll(async () => {
    await preload();
    console.log("Preloaded DB");
    await mongoose.connection.close();
    console.log("Closed DB connection");
  });
});
