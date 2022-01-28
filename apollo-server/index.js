const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');

const Constants = require('./constants/index');
const typeDefs = require('./type-definitions');
const resolvers = require('./resolvers');
const context = require('./context');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    ...context
  }),
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        'editor.cursorShape': 'block',
        'editor.fontSize': 16,
        'editor.fontFamily': '"Lucida Console", Consolas, monospace',
        'editor.theme': 'light'
      }
    })
  ],

  formatError: (error) => {
    console.log(error);
    return error;
  }
});

// Overide origin if it doesn't exist
app.use(function (req, _, next) {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
});
app.use(express.static(path.resolve(__dirname, '..', 'dist/robin')));

// Always return the main index.html, so react-router render the route in the client
if (process.env.NODE_ENV === Constants.environment.production) {
  app.get('*', (req, res, next) => {
    if (req.url.includes('graphql')) {
      next();
    }
    res.sendFile(path.resolve(__dirname, '..', 'dist/robin', 'index.html'));
  });
}

// Start the server
const PORT =
  (process.env.NODE_ENV === Constants.environment.production
    ? process.env.PORT
    : process.env.SERVER_PORT) || 9007;

server.start().then(() => {
  server.applyMiddleware({
    app,
    cors: {
      origin: function (origin, callback) {
        if (Constants.whitelist.test(origin)) {
          callback(null, true);
        } else {
          console.log(`Origin: ${origin}, not allowed by CORS`);
          callback(new Error('Not allowed by CORS'));
        }
      }
    }
  });

  app.listen(PORT, () => {
    console.log(
      `Go to http://localhost:${PORT}${server.graphqlPath} to run queries!`
    );
  });
});