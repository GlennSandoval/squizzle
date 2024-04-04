import * as schema from "./schema.ts";

import { eq } from "drizzle-orm";
import db from "./db.ts";

console.log("\nQuerying for user with id=1");
// One example of querying for a user.
// Note the TS type that is returned here. It is derived from the db schema.
// `findFirst` returns an object or undefined.
const userJohn = await db.query.users.findFirst({
  where: eq(schema.users.id, 1),
});

// Fields are typed appropriately
console.log(`-- user name: ${userJohn?.fullName}`);
console.log(`-- user address: ${userJohn?.address}`);
console.log(`-- user created on: ${userJohn?.createdAt}`);

console.log("\nQuerying for user with id=2");
// Another example of querying for a user. This looks more like sql. This will
// always return an array. If nothing is found the array is empty.
const queryJaneResponse = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 2));

const userJane = queryJaneResponse[0];

// Fields are still typed appropriately
console.log(`-- user name: ${userJane?.fullName}`);
console.log(`-- user address: ${userJane?.address}`);
console.log(`-- user created on: ${userJane?.createdAt}`);

console.log("\nQuerying for user with id=3");
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

console.log("\nQuerying for user with id=9999");
const queryEmptyResponse = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 9999));

const noUserFound = queryEmptyResponse[0];

console.log(`-- user name: ${noUserFound?.fullName}`);
console.log(`-- user address: ${noUserFound?.address}`);
console.log(`-- user created on: ${noUserFound?.createdAt}`);

console.log("\nQuerying for user and orders\n");
// Here is an example of a join. This will get all the orders placed for each user.
// Note the structure of the result.
const userOrders = await db.select()
  .from(schema.users)
  .leftJoin(schema.orders, eq(schema.users.id, schema.orders.userId));

userOrders.forEach((userOrder) => {
  console.log(`-- User: ${userOrder.users.fullName}`);
  console.log(`-- Order Status: ${userOrder.orders?.status}`);
})
