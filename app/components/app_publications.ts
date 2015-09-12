import { Posts } from "../collections/index";

Meteor.publish("posts", () => {
  return Posts.find();
})
