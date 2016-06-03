'use babel'

import { CompositeDisposable } from 'atom';
import {React, ReactDOM} from 'react-for-atom';
import TaskRunnerPanel from './components/TaskRunnerPanel';
import {createTaskStartedAction, createTaskFinishedAction, createTaskProgressionUpdatedAction} from './redux/actions';
import store from './redux/store';

export default {

  taskRunnerView: null,
  topPanel: null,
  subscriptions: null,

  activate(state) {
    this.taskRunnerView = document.createElement('div');
    this.taskRunnerView.classList.add('task-runner');
    // this.topPanel = atom.workspace.addTopPanel({
    //   item: this.taskRunnerView,
    //   visible: false
    // });
    this.topPanel = {
      show: function() {

      },
      hide: function() {

      },
      isVisible: function() {
        return false;
      },
      destroy: function() {

      }
    }
    this.nextTaskId = 0;
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'task-runner:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.topPanel.destroy();
    this.statusTile.destroy();
    this.subscriptions.dispose();
    this.taskRunnerView.remove();
  },

  serialize() {
    return {

    };
  },

  taskIsStarted: function(task) {
    var taskId = this.nextTaskId;
    this.nextTaskId += 1;
    store.dispatch(createTaskStartedAction(taskId, task));
    if (!this.topPanel.isVisible())
      this.topPanel.show();
    return taskId;
  },

  taskIsFinished: function(taskId, state = "success") {
    let task = store.getState().tasks.find(task => task.id == taskId);
    if (state == "success") {
      atom.notifications.addSuccess(`${task.package} ${task.action} Successed`);
    } else if (state == "error") {
      atom.notifications.addError(`${task.package} ${task.action} Errored`);
    } else if (state == "cancel") {
      atom.notifications.addWarning(`${task.package} ${task.action} Cancelled`);
    }
    store.dispatch(createTaskFinishedAction(taskId));
    if (this.topPanel.isVisible()) {
      if (store.getState().tasks.length == 0)
        this.topPanel.hide();
    }
  },

  taskProgressionIs: function(taskId, progression) {
    store.dispatch(createTaskProgressionUpdatedAction(taskId, progression));
  },

  provideTaskRunner: function() {
    return {
      taskIsStarted: this.taskIsStarted.bind(this),
      taskIsFinished: this.taskIsFinished.bind(this),
      taskProgressionIs: this.taskProgressionIs.bind(this)
    };
  },
  consumeStatusBar: function(statusBar) {
    this.statusBar = statusBar;
    this.statusTile = this.statusBar.addLeftTile({
      item: this.taskRunnerView,
      priority: 500
    });
    ReactDOM.render(<TaskRunnerPanel/>, this.taskRunnerView);
  },
  toggle() {
    console.log('TaskRunner was toggled!');
    return (
      this.topPanel.isVisible() ?
      this.topPanel.hide() :
      this.topPanel.show()
    );
  }

};
