/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import Tasks from '../collections/Tasks';
import './App.css';

class Task extends Component {
  static propTypes = {
    isOwner:  React.PropTypes.bool,
    data:     React.PropTypes.shape({
      _id:      React.PropTypes.any.isRequired,
      text:     React.PropTypes.string.isRequired,
      username: React.PropTypes.string,
      'private':React.PropTypes.bool,
      checked:  React.PropTypes.bool,
    }).isRequired,
  }
  onCheckedChanged = (e) => {
    Meteor.call('setChecked', this.props.data._id, !!e.target.checked);
  }
  onDeleteClick = (e) => {
    Meteor.call('deleteTask', this.props.data._id);
  }
  onTogglePrivateClick = (e) => {
    Meteor.call('setPrivate', this.props.data._id, !this.props.data['private']);
  }
  render() {
    var {isOwner, data} = this.props;
    var {text, checked, username} = data;

    return <li className={checked ? 'checked' : undefined}>
      <button className="delete" onClick={this.onDeleteClick}>&times;</button>
      <input type="checkbox" checked={!!checked} className="toggle-checked" onChange={this.onCheckedChanged}/>
      {isOwner && <button className="toggle-private" onClick={this.onTogglePrivateClick}>
        {data['private'] ? 'Private' : 'Public'}
      </button>}
      <span className="text"><strong>{username}</strong> - {text}</span>
    </li>;
  }
}

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    Meteor.subscribe('tasks');

    var hideCompleted = !!Session.get('hideCompleted');
    var tasks = hideCompleted ?
      Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}}).fetch()
      :
      Tasks.find({}, {sort: {createdAt: -1}}).fetch();

    return {
      user:          Meteor.user(),
      hideCompleted: hideCompleted,
      tasks:         tasks,
    };
  }
  onNewTaskSubmit = (e) => {
    e.preventDefault();

    Meteor.call('addTask', e.target.text.value);

    e.target.text.value = '';
  }
  onHideCompletedChange = (e) => {
    Session.set('hideCompleted', !!e.target.checked);
  }
  render() {
    var {user, hideCompleted, tasks} = this.data;

    return <div className="container">
      <header>
        <h1>Todo List</h1>

        <label className="hide-completed">
          <input type="checkbox" checked={hideCompleted} onChange={this.onHideCompletedChange}/>
          Hide Completed Tasks
        </label>

        <BlazeTemplate template={Template.loginButtons} />

        {user && <form className="new-task" onSubmit={this.onNewTaskSubmit}>
          <input type="text" name="text" placeholder="Type to add new tasks"/>
        </form>}
      </header>

      <ul>
        {tasks.map((task, index) => (
          <Task key={index} data={task} isOwner={Meteor.userId() === task.owner}/>
        ))}
      </ul>
    </div>;
  }
}
