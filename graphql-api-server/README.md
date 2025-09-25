## How to do:
1. Create a Graphql API server, from this server call the Postgraphile server to do data fetching & data upsert (use Postgraphile server as middleware) 

# GraphQL API Server
The custom GraphQL API server that routes queries to the Postgraphile server is located in this subdirectory.

## Setup Steps

1. Run `npm init -y`
2. Install dependencies:
   - `npm install apollo-server graphql node-fetch dotenv`
3. Implement schema and resolvers to call the Postgraphile GraphQL endpoint for all data operations.
4. Start the server:
   - `node server.js`
