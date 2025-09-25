require('dotenv').config();
const { postgraphile } = require('postgraphile');
const express = require('express');
const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL, 'public', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  })
);

app.listen(5000, () => {
  console.log('Postgraphile server running on http://localhost:5000/graphiql');
});

