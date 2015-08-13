/* global Mongo, Meteor */
let Users = Meteor.users;
let Posts = new Mongo.Collection('posts');

export default {
  Users,
  Posts,
};
