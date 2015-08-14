/* global Mongo, Meteor */
export const Users = Meteor.users;
export const Posts = new Mongo.Collection('posts');
