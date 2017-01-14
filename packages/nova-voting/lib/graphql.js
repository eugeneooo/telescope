import { GraphQLSchema, Utils } from 'meteor/nova:core';
import { operateOnItem } from './vote.js';

const voteSchema = `
  type Vote {
    itemId: String
    power: Float
    votedAt: String
  }
  type VoteResult {
    _id: String
    upvoters: [User]
    upvotes: Float
    downvoters: [User]
    downvotes: Float
    baseScore: Float
  }
  
  union Votable = Post | Comment
`;

GraphQLSchema.addSchema(voteSchema);

/*

Note: although returning a VoteResult object should in theory work, 
this currently messes the automatic store update on the client. 
So return a Post for now. 

*/

// GraphQLSchema.addMutation('vote(documentId: String, voteType: String, collectionName: String) : VoteResult');
// GraphQLSchema.addMutation('vote(documentId: String, voteType: String, collectionName: String) : Post');
GraphQLSchema.addMutation('vote(document: Votable, voteType: String) : Votable');

const voteResolver = {
  Mutation: {
    // vote(root, {documentId, voteType, collectionName}, context) {
    //   const collection = context[Utils.capitalize(collectionName)];
    //   const document = collection.findOne(documentId);
    //   return context.Users.canDo(context.currentUser, `${collectionName.toLowerCase()}.${voteType}`) ? operateOnItem(collection, document, context.currentUser, voteType) : false;
    // },
    vote(root, {document, voteType}, context) {
      const collection = context[Utils.capitalize(document.__typename)];
      return context.Users.canDo(context.currentUser, `${collection._name}.${voteType}`) ? operateOnItem(collection, document, context.currentUser, voteType) : false;
    },
  },
};

GraphQLSchema.addResolvers(voteResolver);
