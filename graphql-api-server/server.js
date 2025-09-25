require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(5000, () => {
    console.log('Server running at http://localhost:5000/graphql');
  });
}

startApolloServer();