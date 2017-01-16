import { Components, registerComponent } from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Users from 'meteor/nova:users';
import { Link } from 'react-router';
import { ShowIf, withDocument, withCurrentUser } from 'meteor/nova:core';
import gql from 'graphql-tag';

const UsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else {

    const user = props.document;

    const terms = {view: "userPosts", userId: user._id};

    return (
      <div className="page users-profile">
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        <h2 className="page-title">{Users.getDisplayName(user)}</h2>
        {user[`${Users.prefix}htmlBio`] ? <div dangerouslySetInnerHTML={{__html: user[`${Users.prefix}htmlBio`]}}></div> : null }
        <ul>
          {user.twitterUsername ? <li><a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
          {user[`${Users.prefix}website`] ? <li><a href={user[`${Users.prefix}website`]}>{user[`${Users.prefix}website`]}</a></li> : null }
          <ShowIf check={Users.options.mutations.edit.check} document={user}>
            <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li>
          </ShowIf>
        </ul>
        <h3><FormattedMessage id="users.posts"/></h3>
        <Components.PostsList terms={terms} />
      </div>
    )
  }
}

UsersProfile.propTypes = {
  // document: React.PropTypes.object.isRequired,
}

UsersProfile.displayName = "UsersProfile";

UsersProfile.fragment = gql`
  fragment usersProfileFragment on User {
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
    ${Users.prefix}emailHash
    ${Users.prefix}groups
    ${Users.prefix}htmlBio
    ${Users.prefix}karma
    ${Users.prefix}newsletter_subscribeToNewsletter
    ${Users.prefix}notifications_users
    ${Users.prefix}notifications_posts
    ${Users.prefix}postCount
    ${Users.prefix}slug
    twitterUsername
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
`;

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragment: UsersProfile.fragment,
};

registerComponent('UsersProfile', UsersProfile, withCurrentUser, withDocument(options));
