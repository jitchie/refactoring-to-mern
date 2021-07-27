const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path'); 
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleWare } = require('./utils/auth');
const db = require('./config/connection');
// const routes = require('./routes'); // express path isnt required

const app = express();
var PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare
})

server.applyMiddleware({app});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes); //no longer required.

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
