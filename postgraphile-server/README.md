## How to do:

1. Create a Postgraphile server using knex for db migrations 

# Postgraphile Server

This folder contains the Postgraphile server setup, including database migrations using Knex.

## Setup Steps

1. Run `npm init -y`
2. Install dependencies:
   - `npm install postgraphile knex pg dotenv`
3. Initialize Knex:
   - `npx knex init`
4. Configure your PostgreSQL connection in `knex.js`.
5. Add migrations for `posts` and `comments` tables.
6. Run migrations:
   - `npx knex migrate:latest`
7. Start the Postgraphile server:
   - `node index.js`
