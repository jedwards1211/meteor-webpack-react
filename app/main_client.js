import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
})

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.getElementById('root'))
})
