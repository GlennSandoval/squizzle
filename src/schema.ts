import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, real } from "drizzle-orm/sqlite-core";

/*
CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
    FullName VARCHAR(100),
    Address VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userName: text("user_name", { length: 50 }).notNull(),
  password: text("password", { length: 50 }).notNull(),
  email: text("text", { length: 100 }),
  fullName: text("full_name", { length: 100 }),
  address: text("address", { length: 255 }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});

/*
CREATE TABLE Products (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    CategoryID INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
*/
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stockQuantity: integer("stock_quantity").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});

/*
CREATE TABLE Orders (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50),
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
*/
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  orderDate: integer("order_date", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  status: text("status", { length: 50 }),
  total: real("total").notNull(),
});

/*
CREATE TABLE OrderDetails (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
*/
export const orderDetails = sqliteTable("order_details", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity"),
  price: real("price").notNull(),
});

/*
CREATE TABLE Categories (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);
*/
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description"),
});
