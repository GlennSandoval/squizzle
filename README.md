# Drizzle ORM tutorial using SQLite

This is a basic example of how Drizzle ORM workks.

It uses SQLite as a database, but the intent is not to explain how to use SQLite.

The main concepts of Drizzle will be the same for any database.

## NPM scripts

- `npm run db:gen` - Generates SQL code needed to create the db based on the schema.ts file.
- `npm run migrate` - Update an existing database based on the current version of the schema.ts file. This will apply the generated SQL code to the database.
- `npm run seed` - Inserts some sample data into the database.
- `npm run studio` - Opens the Drizzle ORM studio.

## How to run for the first time

 1. `npm run db:gen`
 2. `npm run migrate`
 3. `npm run seed`
 4. `npm run dev`

After the first time, you can just run `npm run dev` to start.

There is no UI. Console output will show the results of the queries.
