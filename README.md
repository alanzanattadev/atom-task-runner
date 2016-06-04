# Task Runner Provider

UI Provider for packages that run background tasks.

![Task runner status-bar screenshot](https://raw.githubusercontent.com/alanzanattadev/atom-task-runner/master/task-runner-screenshot.png)

## Features
  - Real time status rendering in status-bar
  - Service API to announce task status

## How to use it

1) Consume task-runner service
``` json
"consumedServices": {
  "taskRunner": {
    "versions": {
      "^1.0.0": "consumeTaskRunner"
    }
  }
},
```
2) Add consumeTaskRunner function in your main file
``` javascript
consumeTaskRunner: function(taskRunner) {
  this.taskRunner = taskRunner;
},
```
3) Announce started tasks

package is your package's name or theme (example npm for atom-npm package)
action is a short description of the running task
``` javascript
let id = taskRunner.taskIsStarted({
  package: "yeoman",
  action: `run angular:app`
});
```
4) Announce finished tasks

For successful task
``` javascript
taskRunner.taskIsFinished(id);
```

For errored task
``` javascript
taskRunner.taskIsFinished(id, "error");
```

For cancelled task
``` javascript
taskRunner.taskIsFinished(id, "cancel");
```

## More To Come
  - Log API
  - Real time log output of hovered task
  - Persistance for finished with error tasks
