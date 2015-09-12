import * as React from 'react';
import App from '../dist/components/App';

// import css here as it does not go to dist
import 'app/components/App.css';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.startup(() => {
  React.render(<App/>, document.getElementById('root'));
});
