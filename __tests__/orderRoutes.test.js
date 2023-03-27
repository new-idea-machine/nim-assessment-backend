// start the server
require("dotenv").config();
const request = require("supertest");
const server = require("../server");
const mongoose = require("../db/db");
const { Order } = require("../db/models/orders");
const { MenuItems } = require("../db/models/menuItems");
const preload = require("../db/preload-db");

describe("routes", () => {
  // setup
  const testMenuItem = {
    name: "test",
    price: 1.99,
    description: "test description it has chicken",
    image_url: "test url"
  };
  let testMenuItemId;
  let testOrder;
  beforeAll(async () => {
    await preload();
    console.log("Preloaded DB");
    const menuItem = await MenuItems.create(testMenuItem);
    testMenuItemId = menuItem._id;
    testOrder = {
      name: "test",
      phone: "1234567890",
      address: "123 test st",
      items: [
        {
          item: testMenuItemId,
          quantity: 1
        }
      ]
    };
  });
  // teardown
  afterEach(async () => {
    await Order.deleteMany({});
  });

  describe.only("GET /api/orders", () => {
    it("should return an array of orders", async () => {
      const response = await request(server).get("/api/orders");
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/orders/:id", () => {
    it("should return an order", async () => {
      const order = await Order.create(testOrder);
      const response = await request(server).get(`/api/orders/${order._id}`);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/orders", () => {
    it("should create an order", async () => {
      const response = await request(server)
        .post("/api/orders")
        .send(testOrder);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("PUT /api/orders/:id", () => {
    it("should update an order and only change the fields that are passed", async () => {
      const order = await Order.create(testOrder);
      const response = await request(server)
        .put(`/api/orders/${order._id}`)
        .send({ name: "updated name" });
      expect(response.body.name).toBe("updated name");
      expect(response.body.phone).toBe("1234567890");
    });
  });

  describe("PUT /api/orders/:id", () => {
    it("should update the updatedAt field", async () => {
      const order = await Order.create(testOrder);
      const response = await request(server)
        .put(`/api/orders/${order._id}`)
        .send({ name: "updated name" });
      expect(response.body.updatedAt).not.toBe(order.updatedAt);
    });
  });

  // total sales route
  describe("GET /api/orders/total-sales", () => {
    it("should return the total sales and have the correct total", async () => {
      await Order.create(testOrder);
      const response = await request(server).get("/api/orders/total-sales");
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.total).toBe(1.99);
    });
  });

  // order by status route
  describe("GET /api/orders/status?s=pending", () => {
    it("should return an array of orders with the correct status", async () => {
      await Order.create(testOrder);
      const response = await request(server).get(
        "/api/orders/status?s=pending"
      );
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].status).toBe("pending");
    });
  });

  afterAll(async () => {
    await preload();
    console.log("Preloaded DB");
    await mongoose.connection.close();
    server.close();
    console.log("Closed DB connection");
  });
});
