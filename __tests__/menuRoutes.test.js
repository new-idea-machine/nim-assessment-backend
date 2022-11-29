// start the server
require("dotenv").config();
const request = require("supertest");
const server = require("../server");
const mongoose = require("../db/db");
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

  // teardown
  afterEach(async () => {
    await MenuItems.deleteMany({});
  });

  describe("GET /api/menu", () => {
    it("should return an array of menu items", async () => {
      const response = await request(server).get("/api/menu");
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/menu/:id", () => {
    it("should return a menu item", async () => {
      const menuItem = await MenuItems.create(testMenuItem);
      const response = await request(server).get(`/api/menu/${menuItem._id}`);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/menu", () => {
    it("should create a menu item", async () => {
      const response = await request(server)
        .post("/api/menu")
        .send(testMenuItem);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("PUT /api/menu/:id", () => {
    it("should update a menu item and only change the fields that are passed", async () => {
      const menuItem = await MenuItems.create(testMenuItem);
      const response = await request(server)
        .put(`/api/menu/${menuItem._id}`)
        .send({ name: "updated name" });
      expect(response.body.name).toBe("updated name");
      expect(response.body.price).toBe(1.99);
    });
  });

  describe("PUT /api/menu/:id", () => {
    it("should update the updatedAt field", async () => {
      const menuItem = await MenuItems.create(testMenuItem);
      const response = await request(server).patch(`/api/menu/${menuItem._id}`);
      expect(response.body.updatedAt).not.toBe(menuItem.updatedAt);
    });
  });

  describe("DELETE /api/menu/:id", () => {
    it("should delete a menu item and return the id", async () => {
      const menuItem = await MenuItems.create(testMenuItem);
      const response = await request(server).delete(
        `/api/menu/${menuItem._id}`
      );
      expect(response.body).toBe(menuItem._id);
    });
  });

  // search /api/menu/search?q=chicken
  describe("GET /api/menu/search", () => {
    it("should return an array of menu items", async () => {
      // create a menu item with the word "chicken" in the description
      await MenuItems.create(testMenuItem);
      const response = await request(server).get("/api/menu/search?q=chicken");
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].description).toBe(
        "test description it has chicken"
      );
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
