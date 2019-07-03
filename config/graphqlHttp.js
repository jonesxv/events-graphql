var graphqlHttp = require('express-graphql');
var { buildSchema } = require('graphql');

var events = []

var graphqlConfig = graphqlHttp({
  schema: buildSchema(`
      type Event {
        id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      type RootQuery {
          events: [Event!]!
      }
      type RootMutation {
          createEvent(eventInput: EventInput): Event
      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `),
  rootValue: {
    events: () => {
      return events;
    },
    createEvent: (args) => {
      const event = {
        id: Math.random().toString(),
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: args.eventInput.date
      }
      events.push(event)
      return event;
    }
  },
  graphiql: true
});

module.exports = graphqlConfig;