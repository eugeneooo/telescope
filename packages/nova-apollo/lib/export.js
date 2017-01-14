import { GraphQLSchema } from 'meteor/nova:lib';

import { makeExecutableSchema, addResolveFunctionsToSchema } from 'graphql-tools';

import { meteorClientConfig } from './client.js';

import { createApolloServer } from './server.js';
import generateTypeDefs from './schema';

Meteor.startup(function () {
  const typeDefs = generateTypeDefs();

  GraphQLSchema.finalSchema = typeDefs;

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: GraphQLSchema.resolvers,
  });
  
  const typeResolver = {
    Votable: {
      __resolveType(obj) {
        return obj.title ? 'Post' : 'Comment';
      },
    },
  };
  addResolveFunctionsToSchema(schema, typeResolver);

  createApolloServer({
    schema,
  });
});

export { meteorClientConfig };
