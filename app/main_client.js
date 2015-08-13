import React from 'react';
import App from './components/App.jsx';

window.webpackBundleLoaded = true;
let prevOnload = window.onload;

window.onload = function() {
  if (prevOnload) prevOnload();
  React.render(<App/>, document.getElementById('root'));
};

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');
