'use babel';

import {React} from 'react-for-atom';
import Tasks from './Tasks';
import TasksConnecter from '../redux/containers/tasks';

export default React.createClass({
  render: function() {
    return (
      <div className="task-runner-panel">
        <TasksConnecter>
          <Tasks/>
        </TasksConnecter>
      </div>
    );
  }
});
