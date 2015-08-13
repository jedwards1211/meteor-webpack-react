import React from 'react';
import App from './components/App';
import './methods';

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

var prevOnload = window.onload;

window.onload = function() {
  if (prevOnload) prevOnload();
  React.render(<App/>, document.getElementById('root'));
};