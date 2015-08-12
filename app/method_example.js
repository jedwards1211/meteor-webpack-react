// if you import this on the client, it will be a stub
// if you import this on the server, it will be the real method
// user Meteor.call as normal to consume it.

/* global Meteor */

Meteor.methods({
  sayHello() {
    return 'Hello from Meteor method!';
  },
});
