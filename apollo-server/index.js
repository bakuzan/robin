const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cors = require('cors');
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
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  },
  formatError: (error) => {
    console.log(error);
    return error;
  }
});

const corsOptions = {
  origin: function(origin, callback) {
    if (Constants.whitelist.test(origin)) {
      callback(null, true);
    } else {
      console.log(`Origin: ${origin}, not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Overide origin if it doesn't exist
app.use(function(req, _, next) {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
});

app.use(
  `/${Constants.appName}/favicon.ico`,
  favicon(path.join(__dirname, '..', 'src', 'favicon.ico'))
);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use('/graphql', cors(corsOptions), bodyParser.json());

// Always return the main index.html, so react-router render the route in the client
if (process.env.NODE_ENV === Constants.environment.production) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start the server
const PORT =
  (process.env.NODE_ENV === Constants.environment.production
    ? process.env.PORT
    : process.env.SERVER_PORT) || 9007;

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${server.graphqlPath} to run queries!`
  );
});
