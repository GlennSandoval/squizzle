import db from "./src/db.ts";
import * as schema from "./src/schema.ts";

export default async function seed() {
  console.log("Inserting seed data into db.")
  await db.insert(schema.categories).values([
    {
      name: "Computers",
      description: "Desktops, laptops, and accessories.",
    },
    {
      name: "Phones",
      description: "Smartphones and mobile phones.",
    },
    {
      name: "Audio",
      description: "Headphones, speakers, and audio equipment.",
    },
  ]);

  await db.insert(schema.users).values([
    {
      userName: "john_doe",
      password: "password123",
      email: "john.doe@example.com",
      fullName: "John Doe",
      address: "123 Main St, Anytown",
    },
    {
      userName: "jane_smith",
      password: "password123",
      email: "jane.smith@example.com",
      fullName: "Jane Smith",
      address: "456 Oak Ave, Othertown",
    },
    {
      userName: "alex_brown",
      password: "password123",
      email: "alex.brown@example.com",
      fullName: "Alex Brown",
      address: "789 Pine Rd, Sometown",
    },
  ]);

  await db.insert(schema.products).values([
    {
      name: "Laptop",
      description:
        "A high performance laptop suitable for all your computing needs.",
      price: 1200.0,
      stockQuantity: 10,
      categoryId: 1,
    },
    {
      name: "Smartphone",
      description:
        "Latest model with high resolution camera and long battery life.",
      price: 800.0,
      stockQuantity: 15,
      categoryId: 2,
    },
    {
      name: "Headphones",
      description: "Noise cancelling headphones with superb sound quality.",
      price: 150.0,
      stockQuantity: 20,
      categoryId: 3,
    },
  ]);

  await db.insert(schema.orders).values([
    {
      userId: 1,
      orderDate: new Date("2024-03-19 10:00:00"),
      status: "Shipped",
      total: 1400.0,
    },
    {
      userId: 2,
      orderDate: new Date("2024-03-20 12:30:00"),
      status: "Processing",
      total: 800.0,
    },
    {
      userId: 3,
      orderDate: new Date("2024-03-21 15:45:00"),
      status: "Delivered",
      total: 950.0,
    },
  ]);

  await db.insert(schema.orderDetails).values([
    {
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1200.0,
    },
    {
      orderId: 1,
      productId: 3,
      quantity: 1,
      price: 200.0,
    },
    {
      orderId: 2,
      productId: 2,
      quantity: 1,
      price: 800.0,
    },
    {
      orderId: 3,
      productId: 3,
      quantity: 2,
      price: 300.0,
    },
  ]);

  console.log("Seed insertion complete.")
}

await seed();
