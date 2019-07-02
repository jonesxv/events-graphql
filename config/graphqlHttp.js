var graphqlHttp = require('express-graphql');
var { buildSchema } = require('graphql');

var graphqlConfig = graphqlHttp({
  schema: buildSchema(`
      type RootQuery {
          events: [String!]!
      }
      type RootMutation {
          createEvent(name: String): String
      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `),
  rootValue: {
    events: () => {
      return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
    },
    createEvent: (args) => {
      const eventName = args.name;
      return eventName;
    }
  },
  graphiql: true
});

module.exports = graphqlConfig;