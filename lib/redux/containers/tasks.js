'use babel'

import {React, update} from 'react-for-atom';
import store from '../store';

var Component = React.createClass({
  getInitialState: function() {
    return {
      tasks: store.getState().tasks
    };
  },
  componentDidMount: function() {
    this.unsubscribeTasks = store.subscribe(this.updateTasks);
  },
  componentWillUnmount: function() {
    this.unsubscribeTasks();
  },
  updateTasks: function() {
    this.setState(update(this.state, {
      tasks: {$set: store.getState().tasks}
    }));
  },
  render: function() {
    console.log(this.state.tasks);
    return React.cloneElement(this.props.children, {tasks: this.state.tasks});
  }
});

export default Component;
