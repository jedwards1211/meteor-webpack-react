import React from 'react'
import ReactDOM from 'react-dom/server'
import App from './components/App.jsx'
import {Posts} from './collections'
import {createPosts, createUsers} from './fixtures'
// we don't call this so we're just importing to initialize file
import './method_example'

// these will only run on the sever since we only 'import' them in main_server.js

if (!Posts.find().fetch().length) {
  createPosts()
  createUsers()
}

/* eslint-disable no-console */

console.log('There are # posts:', Posts.find().fetch().length)

Meteor.startup(() => {
  console.log('React SSR:', ReactDOM.renderToString(<App/>))
})
