import React from 'react';
import App from './App';

window.webpackBundleLoaded = true;

var prevOnload = window.onload;

window.onload = function() {
  if (prevOnload) prevOnload();
  React.render(<App/>, document.getElementById('root'));
};
