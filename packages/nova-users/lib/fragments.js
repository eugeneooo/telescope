import gql from 'graphql-tag';
import Users from 'meteor/nova:users';

const fragments = {
  // avatar: gql`
  //   fragment avatarUserInfo on User {
  //     _id
  //     ${Users.prefix}emailHash
  //     ${Users.prefix}displayName
  //     ${Users.prefix}slug
  //   }
  // `,

  list: {
    name: 'usersListFragment',
    fragment: gql`
      fragment usersListFragment on User {
        _id
        username
        createdAt
        isAdmin
        ${Users.prefix}bio
        ${Users.prefix}commentCount
        ${Users.prefix}displayName
        ${Users.prefix}downvotedComments {
          itemId
          power
          votedAt
        }
        ${Users.prefix}downvotedPosts {
          itemId
          power
          votedAt
        }
        ${Users.prefix}email
        ${Users.prefix}emailHash
        ${Users.prefix}groups
        ${Users.prefix}htmlBio
        ${Users.prefix}karma
        ${Users.prefix}newsletter_subscribeToNewsletter
        ${Users.prefix}notifications_users
        ${Users.prefix}notifications_posts
        ${Users.prefix}postCount
        ${Users.prefix}slug
        ${Users.prefix}twitterUsername
        ${Users.prefix}upvotedComments {
          itemId
          power
          votedAt
        }
        ${Users.prefix}upvotedPosts {
          itemId
          power
          votedAt
        }
        ${Users.prefix}website
      }
    `,
  },

  single: {
    name: 'usersSingleFragment',
    fragment: gql`
      fragment usersSingleFragment on User {
        _id
        username
        createdAt
        isAdmin
        ${Users.prefix}bio
        ${Users.prefix}commentCount
        ${Users.prefix}displayName
        ${Users.prefix}downvotedComments {
          itemId
          power
          votedAt
        }
        ${Users.prefix}downvotedPosts {
          itemId
          power
          votedAt
        }
        ${Users.prefix}email
        ${Users.prefix}emailHash
        ${Users.prefix}groups
        ${Users.prefix}htmlBio
        ${Users.prefix}karma
        ${Users.prefix}newsletter_subscribeToNewsletter
        ${Users.prefix}notifications_users
        ${Users.prefix}notifications_posts
        ${Users.prefix}postCount
        ${Users.prefix}slug
        ${Users.prefix}twitterUsername
        ${Users.prefix}upvotedComments {
          itemId
          power
          votedAt
        }
        ${Users.prefix}upvotedPosts {
          itemId
          power
          votedAt
        }
        ${Users.prefix}website
      }
    `,
  },
};

export default fragments;