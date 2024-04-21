import * as schema from "./schema.ts";

import { eq } from "drizzle-orm";
import db from "./db.ts";

//----------------------------------------
// Example 1: Querying for user using findFirst
console.log("\nQuerying for user using findFirst");
// Note the TS type that is returned here. It is derived from the db schema.
// `userJohn` will be fully typed.
// `findFirst` is a helper function that returns the found object or undefined.
const userJohn = await db.query.users.findFirst({
  where: eq(schema.users.id, 1),
});

// Fields are typed appropriately
console.log(`-- user name: ${userJohn?.fullName}`);
console.log(`-- user address: ${userJohn?.address}`);
console.log(`-- user created on: ${userJohn?.createdAt}`);
//----------------------------------------

//----------------------------------------
// Example 2: Querying for user using select
console.log("\nQuerying for user using select");
// This looks more like sql. `select` will always return an array.
// If nothing is found the array is empty.
const queryJaneResponse = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 2));

const userJane = queryJaneResponse[0];

// Fields are still typed appropriately
console.log(`-- user name: ${userJane?.fullName}`);
console.log(`-- user address: ${userJane?.address}`);
console.log(`-- user created on: ${userJane?.createdAt}`);
//----------------------------------------

//----------------------------------------
// Example 3: Querying for partial user data
console.log("\nQuerying for partial user data");
// Here we are specifying only the fields that get used.
const queryAlexResponse = await db
  .select({
    fullName: schema.users.fullName,
    address: schema.users.address,
    createdAt: schema.users.createdAt,
  })
  .from(schema.users)
  .where(eq(schema.users.id, 3));

const userAlex = queryAlexResponse[0];

// Fields are still typed appropriately
console.log(`-- user name: ${userAlex?.fullName}`);
console.log(`-- user address: ${userAlex?.address}`);
console.log(`-- user created on: ${userAlex?.createdAt}`);
//----------------------------------------

//----------------------------------------
// Example 4: Querying for user that does not exist
console.log("\nQQuerying for user that does not exist");
const queryEmptyResponse = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 9999));

const noUserFound = queryEmptyResponse[0];

console.log(`-- user name: ${noUserFound?.fullName}`);
console.log(`-- user address: ${noUserFound?.address}`);
console.log(`-- user created on: ${noUserFound?.createdAt}`);
//----------------------------------------

//----------------------------------------
// Example 5: Querying for user and orders using a join
console.log("\nQuerying for user and orders using a join\n");
// Here is an example of a join. This will get all the orders placed for each user.
// Note the structure of the result. This will be an array of objects with a key for each table.
// `[{ user: User, order: Order  },...]
// Note that a user can have multiple orders, but in the returned resule `order` is not an array.
// This means that a user can be present multiple times in the result.
const userOrders = await db
  .select()
  .from(schema.users)
  .leftJoin(schema.orders, eq(schema.users.id, schema.orders.userId));

userOrders.forEach((userOrder) => {
  console.log(`-- User: ${userOrder.users.fullName}`);
  console.log(`-- Order Status: ${userOrder.orders?.status}`);
});

//console.log(JSON.stringify(userOrders, null, 2));
//----------------------------------------

//----------------------------------------
// Example 6: Inserting a new order
console.log("\nInserting a new order\n");
type NewOrder = typeof schema.orders.$inferInsert;

async function addOrder(order: NewOrder) {
  return db.insert(schema.orders).values(order);
}

const result = await addOrder({
  userId: 1,
  status: "Pending",
  orderDate: new Date(),
  total: 100,
});

console.log(result);
//----------------------------------------
