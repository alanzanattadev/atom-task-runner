'use babel'

var creators = {
  createTaskStartedAction: function(taskId, task) {
    return {
      type: "TASK_STARTED",
      taskId: taskId,
      task: task
    };
  },
  createTaskFinishedAction: function(taskId) {
    return {
      type: "TASK_FINISHED",
      taskId
    };
  },
  createTaskProgressionUpdatedAction: function(taskId, progression) {
    return {
      type: "TASK_PROGRESSION_UPDATED",
      taskId: taskId,
      progression: progression
    };
  },
};

export default creators;
