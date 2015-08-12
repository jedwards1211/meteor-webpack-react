/* global Accounts */
import Users from './collections/users';
import Posts from './collections/posts';

export function createPosts() {
  console.log("Creating fake posts");
  [1, 2, 3, 4].forEach(function(count) {
    Posts.insert({
      name: 'Test post # ' + count,
      desc: 'How now brown cow',
    });
  });
}

export function createUsers() {
  console.log("Creating fake users");
  ['Bob', 'Jane', 'Max'].forEach(function(name) {
    Accounts.createUser({
      username: name,
      password: 'password',
      profile: {},
    });
  });
}
