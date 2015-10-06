/* global Mongo, Meteor */
export interface IPosts {
  name: string;
  desc: string;
}

export const Users = Meteor.users;
export const Posts = new Mongo.Collection<IPosts>('posts');
