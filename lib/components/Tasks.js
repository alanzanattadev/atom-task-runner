'use babel'

import {React} from 'react-for-atom';
import Task from './Task';

export default React.createClass({
  getDefaultProps: function() {
    return {
      tasks: []
    }
  },
  render: function() {
    return (
      <div className="tasks">
        {this.props.tasks.map((task, i) => <Task key={`task${i}`} {...task}/>)}
      </div>
    )
  }
});
