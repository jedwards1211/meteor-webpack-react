/* global ReactMeteorData */
import React from 'react';
import BlazeTemplate from './BlazeTemplate';
import Users from '../collections/users';
import Posts from '../collections/posts';
import './App.css';

Meteor.call('sayHello', function(err, res) {
  console.log(res);
});

let App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      users: Users.find().fetch()
    };
  },

  render() {
    let userCount = Users.find().fetch().length;
    let postsCount = Posts.find().fetch().length;
    return (
      <div className="App">
        <BlazeTemplate template={Template.loginButtons} />
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
        <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
      </div>
    );
  }
});

export default App;
