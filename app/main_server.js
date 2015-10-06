import {Posts} from '../dist/collections/index';
import {createPosts, createUsers} from '../dist/fixtures';

// we don't call this so we're just importing to initialize file
import '../dist/method_example';
import '../dist/components/app_publications';

// these will only run on the sever since we only 'import' them in main_server.js

if (!Posts.find().fetch().length) {
  createPosts();
  createUsers();
}

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);
