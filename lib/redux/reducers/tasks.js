'use babel'

import {fromJS} from 'immutable';

function tasks(state = [], action) {
  switch (action.type) {
    case "TASK_STARTED":
      return fromJS(state).push(fromJS(action.task).set('id', action.taskId)).toJS();
      break;
    case "TASK_FINISHED":
      return fromJS(state).delete(state.findIndex(task => task.id == action.taskId)).toJS();
      break;
    case "TASK_PROGRESSION_UPDATED":
      return fromJS(state).updateIn([state.findIndex(task => task.id == action.taskId), "progression"], action.progression).toJS();
      break;
    default:
      return state;
  }
}

export default tasks;
