require("dotenv").config();

const mongoose = require("./db");
const { create: createMenuItem } = require("./models/menuItems");
const { create: createOrder } = require("./models/orders");
// create some new menu items
const menuItems = [
  {
    name: "Pizza",
    price: 10,
    description: "A pizza with cheese and tomato sauce"
  },
  {
    name: "Pasta",
    price: 8,
    description: "Spaghetti with tomato sauce and meatballs"
  },
  {
    name: "Salad",
    price: 6,
    description:
      "A delicious salad with lettuce and tomatoes, and a vinaigrette dressing"
  },
  {
    name: "Burger",
    price: 12,
    description: "A juicy burger with lettuce, tomato, and a side of fries"
  },
  {
    name: "Sandwich",
    price: 8,
    description: "A sandwich with ham, cheese, and a side of fries"
  },
  {
    name: "Ice Cream",
    price: 4,
    description: "A scoop of vanilla ice cream with chocolate sauce"
  },
  {
    name: "Cupcake",
    price: 3,
    description: "A delicious cupcake with chocolate frosting"
  },
  {
    name: "Coffee",
    price: 2,
    description: "A cup of coffee with milk and sugar"
  },
  {
    name: "Tea",
    price: 2,
    description: "A cup of tea with milk and sugar"
  },
  {
    name: "Soda",
    price: 2,
    description: "A can of soda"
  },
  {
    name: "Chicken",
    price: 2,
    description: "test description it has chicken"
  }
];

const preload = async () => {
  // drop the database
  await mongoose.connection.collections.menuitems.drop();
  await mongoose.connection.collections.orders.drop();
  const createdMenuItems = await Promise.all(
    menuItems.map((item) => createMenuItem(item))
  );
  // eslint-disable-next-line no-console
  // console.log("createdMenuItems", createdMenuItems);
  // create some new orders
  const orders = [
    {
      name: "Krang Floogleborg",
      phone: "555-555-5555",
      address: "123 Main St",
      items: [
        {
          item: createdMenuItems[0].id,
          quantity: 1
        },
        {
          item: createdMenuItems[1].id,
          quantity: 2
        },
        {
          item: createdMenuItems[2].id,
          quantity: 1
        }
      ],
      createdAt: new Date("2022-01-23T18:25:43.511Z"),
      updatedAt: new Date("2022-01-23T18:31:43.511Z"),
      status: "delivered"
    },
    {
      name: "Meep Morpington",
      phone: "555-555-5555",
      address: "123 Main St",
      items: [
        {
          item: createdMenuItems[3].id,
          quantity: 1
        },
        {
          item: createdMenuItems[4].id,
          quantity: 2
        },
        {
          item: createdMenuItems[5].id,
          quantity: 1
        }
      ],
      createdAt: new Date("2022-05-01T18:25:43.511Z"),
      updatedAt: new Date("2022-05-01T18:31:43.511Z"),
      status: "cancelled"
    },
    {
      name: "Fuang The Third",
      phone: "555-555-5555",
      address: "123 Main St",
      items: [
        {
          item: createdMenuItems[6].id,
          quantity: 1
        },
        {
          item: createdMenuItems[7].id,
          quantity: 2
        },
        {
          item: createdMenuItems[8].id,
          quantity: 1
        }
      ],
      createdAt: new Date("2022-06-01T18:25:43.511Z"),
      updatedAt: new Date("2022-06-01T19:31:43.511Z"),
      status: "delivered"
    },
    {
      name: "Ronald McDonald",
      phone: "555-555-5555",
      address: "123 Main St",
      items: [
        {
          item: createdMenuItems[9].id,
          quantity: 1
        },
        {
          item: createdMenuItems[0].id,
          quantity: 2
        },
        {
          item: createdMenuItems[1].id,
          quantity: 1
        }
      ],
      createdAt: new Date("2022-07-01T18:25:43.511Z"),
      updatedAt: new Date("2022-07-01T19:31:43.511Z"),
      status: "delivered"
    },
    {
      name: "Bob Belcher",
      phone: "555-555-5555",
      address: "123 Main St",
      items: [
        {
          item: createdMenuItems[2].id,
          quantity: 1
        },
        {
          item: createdMenuItems[3].id,
          quantity: 2
        },
        {
          item: createdMenuItems[4].id,
          quantity: 1
        }
      ]
    }
  ];

  const createdOrders = await Promise.all(
    orders.map((order) => createOrder(order))
  );
  // eslint-disable-next-line no-console
  console.log("createdOrders", createdOrders);
  if (require.main === module) process.exit(0);
};
if (require.main === module) {
  preload();
}
module.exports = preload;
