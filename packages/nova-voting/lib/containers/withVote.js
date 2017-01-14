import React, { PropTypes, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { operateOnItem } from '../vote.js';

// to adapt like withNew? or withDocument?
const withVote = component => {

  return graphql(gql`
    mutation vote($document: Votable, $voteType: String) {
      vote(document: $document, voteType: $voteType) {
        _id
        upvotes
        upvoters {
          _id
        }
        downvotes
        downvoters {
          _id
        }
        baseScore
      }
    }
  `, {
    props: ({ownProps, mutate}) => ({
      vote: ({document, voteType, collection, currentUser}) => {
        const voteResult = operateOnItem(collection, document, currentUser, voteType, true);
        return mutate({ 
          variables: {
            document: document, 
            voteType,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            vote: {
              ...voteResult,
            },
          }
        })
      }
    }),
  })(component);
}

export default withVote;
