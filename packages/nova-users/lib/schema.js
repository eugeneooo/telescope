import Users from './collection.js';
import { getSetting } from 'meteor/nova:lib';

const adminGroup = {
  name: "admin",
  order: 10
};

const ownsOrIsAdmin = (user, document) => {
  return Users.owns(user, document) || Users.isAdmin(user);
};

const prefix = getSetting('usersPrefix', '_');

/**
 * @summary Users schema
 * @type {Object}
 */
const schema = {
  _id: {
    type: String,
    publish: true,
    optional: true,
    viewableBy: ['guests'],
    preload: true,
  },
  username: {
    type: String,
    // regEx: /^[a-z0-9A-Z_]{3,15}$/,
    publish: true,
    optional: true,
    viewableBy: ['guests'],
    preload: true,
  },
  emails: {
    type: [Object],
    optional: true,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true,
  },
  createdAt: {
    type: Date,
    publish: true,
    optional: true,
    viewableBy: ['guests'],
    preload: true,
  },
  isAdmin: {
    type: Boolean,
    label: "Admin",
    control: "checkbox",
    optional: true,
    insertableBy: ['admins'],
    editableBy: ['admins'],
    viewableBy: ['guests'],
    group: adminGroup,
    preload: true,
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // telescope-specific data, kept for backward compatibility and migration purposes
  telescope: {
    type: Object,
    blackbox: true,
    optional: true,
    viewableBy: ['guests'],
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  /**
    Bio (Markdown version)
  */
  [`${prefix}bio`]: {
    type: String,
    optional: true,
    control: "textarea",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
  },
  /**
    The name displayed throughout the app. Can contain spaces and special characters, doesn't need to be unique
  */
  [`${prefix}displayName`]: {
    type: String,
    optional: true,
    publish: true,
    profile: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    preload: true,
  },
  /**
    The user's email. Modifiable.
  */
  [`${prefix}email`]: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    required: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ownsOrIsAdmin,
    preload: true,
    // unique: true // note: find a way to fix duplicate accounts before enabling this
  },
  /**
    A hash of the email, used for Gravatar // TODO: change this when email changes
  */
  [`${prefix}emailHash`]: {
    type: String,
    publish: true,
    optional: true,
    viewableBy: ['guests'],
    preload: true,
  },
  /**
    The HTML version of the bio field
  */
  [`${prefix}htmlBio`]: {
    type: String,
    publish: true,
    profile: true,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    The user's karma
  */
  [`${prefix}karma`]: {
    type: Number,
    decimal: true,
    publish: true,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    The user's profile URL slug // TODO: change this when displayName changes
  */
  [`${prefix}slug`]: {
    type: String,
    publish: true,
    optional: true,
    viewableBy: ['guests'],
    preload: true,
  },
  /**
    The user's Twitter username // not a real field
  */
  [`${prefix}twitterUsername`]: {
    type: String,
    optional: true,
    publish: true,
    profile: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    resolveAs: 'twitterUsername: String',
  },
  /**
    A link to the user's homepage
  */
  [`${prefix}website`]: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    publish: true,
    profile: true,
    optional: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
  },
  /**
    Groups
  */
  [`${prefix}groups`]: {
    type: [String],
    optional: true,
    control: "checkboxgroup",
    insertableBy: ['admins'],
    editableBy: ['admins'],
    viewableBy: ['guests'],
    form: {
      options: function () {
        const groups = _.without(_.keys(Users.groups), "guests", "members", "admins");
        return groups.map(group => {return {value: group, label: group};});
      }
    },
    preload: true,
  },
};

export default schema;
