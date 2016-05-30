'use babel'

import { combineReducers } from 'redux'
import tasks from './tasks';

const reducers = combineReducers({
  tasks: tasks
});

export default reducers
