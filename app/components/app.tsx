/* global ReactMeteorData */
import * as React from 'react';
import BlazeTemplate from './blaze_template';
import { Users, Posts, IPosts } from '../collections/index';
// import './App.css';

Meteor.call('sayHello', function(err: Meteor.Error, res: any) {
  console.log(res);
});

//////////////////////////////////////////////////////
// Posts Component                                     //
//////////////////////////////////////////////////////

interface PostsProps {
  users?: Meteor.User[];
  posts?: IPosts[];
}

interface PostsState {
  bar: string;
}

class PostsView extends React.Component<PostsProps, PostsState> {

  showNumberOfPosts() {
    /* IMPORTANT!!!! you have tu use .bind(this) in onClick method to get access to component scope! */
    alert("You have " + this.props.posts.length + " posts");
  }

  subscribe() {
    Meteor.subscribe("posts");
  }

  render() {
    return (
      <div className="App">
        <BlazeTemplate template={Template["loginButtons"]} />
        <h1>Hello Webpack!</h1>
        <p>There are {this.props.users.length} users in the Minimongo  (login to change)</p>
        <p>There are {this.props.posts.length} posts in the Minimongo  (autopublish removed)</p>
        <hr />
        <button onClick={this.showNumberOfPosts.bind(this)}>Show Posts#</button> {/* IMPORTANT!!!! you have tu use .bind(this) to get access to component scope! */}
        <br />
        <button onClick={this.subscribe}>Subscribe To Posts</button> {/* No need to bind as we do not assess the scope */}
      </div>
    );
  }

  componentDidMount () {
    // something
  }

  componentWillMount () {
    // something
  }
}


// class representation of component does not support mixins
// therefore, we use standard React.createClass method to load the meteor data
// and use classes for display components to get hold of type safety
// see: http://facebook.github.io/react/docs/reusable-components.html#es6-classes

let App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      users: Users.find().fetch(),
      posts: Posts.find().fetch()
    };
  },

  render() {
    return (
      <PostsView { ...this.data } />
    );
  }
});

export default App;
