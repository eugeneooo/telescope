import gql from 'graphql-tag';
import Users from 'meteor/nova:users';

const fragments = {
  
  list: {
    name: 'commentsListFragment',
    fragment: gql`
      fragment commentsListFragment on Comment {
        _id
        postId
        parentCommentId
        topLevelCommentId
        body
        htmlBody
        postedAt
        user {
          _id
          ${Users.prefix}displayName
          ${Users.prefix}emailHash
          ${Users.prefix}slug
        }
      }
    `,
  },

  // not really needed 🤔
  single: {
    name: 'commentsSingleFragment',
    fragment: gql`
      fragment commentsSingleFragment on Comment {
        _id
        postId
        parentCommentId
        topLevelCommentId
        body
        htmlBody
        postedAt
        user {
          _id
          ${Users.prefix}displayName
          ${Users.prefix}emailHash
          ${Users.prefix}slug
        }
      }
    `,
  },
};

export default fragments;