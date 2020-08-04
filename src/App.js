import React from 'react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Typography,
  LinearProgress
} from '@material-ui/core';

import deleteIcon from './assets/delete_icon.png';

export default class App extends React.Component {

  state = {
    newTasks: null,
    tasks: [],
    taskQueue: [],
    servers: 0,
    currentTaskCount: 0,
    tasksCompleted: []
  }

  addTask = () => {
    const { newTasks, tasks, currentTaskCount } = this.state;
    const newTasksAssigned = Array(newTasks).fill({ status: 'pending' }).map((task, index) => ({ ...task, name: `Task ${index + 1 + currentTaskCount}`, value: 0}));
    const newsTaskList = [...tasks, ...newTasksAssigned ];
    this.setState({ tasks: newsTaskList, newTasks: 0, currentTaskCount: currentTaskCount + newTasksAssigned.length });
  }

  addServer = () => {
    const { servers } = this.state;
    this.setState({ servers: servers+1 }, () => {
      if (!this.execution) {
        this.startExecution();
      }
    });
  }

  removeServer = () => {
    const { servers } = this.state;
    this.setState({ servers: servers-1 });
  }

  deletetask = (task) => {
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter(tsk => tsk.name !== task.name) })
  }

  startExecution = () => {
    if (this.state.tasks.length) {
      this.execution = setInterval(() => {
        const { tasks, servers, tasksCompleted } = this.state;
        for(let i=0;i<servers; i++) {
          const currentTask = tasks[i];
          if (currentTask && currentTask.status !== 'done') {
            currentTask.value = currentTask.value + 5;
            currentTask.status = 'active';
            if (currentTask.value === 100) {
              currentTask.status = 'done';
              tasksCompleted.push(currentTask);
            }
            tasks[i] = currentTask;
          }
        }
        const modifiedTasks = tasks.filter(task => task.status !== 'done');
        if (!modifiedTasks.length) {
          clearInterval(this.execution);
          this.execution = null;
          this.setState({ servers: 0 })
        }
        this.setState({ tasks: modifiedTasks, tasksCompleted });
      }, 1000);
    } else {
      alert('No task queued. Cannot start server.')
      this.setState({ servers: 0 });
    }
  }

  // Renderers

  renderHeader = () => {
    const { servers, newTasks } = this.state;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          id="standard-number"
          label="Tasks"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={newTasks}
          onChange={(e) => this.setState({ newTasks: parseInt(e.target.value) })}
        />
        <Button variant="contained" color="primary" onClick={this.addTask} style={{ marginLeft: 10 }} disabled={!newTasks}>Add Task</Button>
        <div style={{ flex: 1 }} />
        <Typography variant="h5" gutterBottom style={{ marginRight: 50 }}>{`Active Servers: ${servers}`}</Typography>
        <Button variant="contained" color="primary" onClick={this.addServer} style={{ marginRight: 10 }}>Add Server</Button>
        <Button variant="contained" color="secondary" onClick={this.removeServer} disabled={!servers || (servers ===1 && this.execution)}>Remove Server</Button>
      </div>
    )
  }

  renderCompletedTasks = () => {
    const { tasksCompleted } = this.state;
    return (
      <div style={{ width: '50%', paddingLeft: 20 }}>
        <Typography variant="h4" gutterBottom>Tasks Completed</Typography>
        <Card style={{ height: 500, overflow: 'scroll' }}>
          <CardContent>
            {tasksCompleted.map(task => (
              <Typography variant="h5" gutterBottom style={{ marginRight: 20 }}>{task.name}</Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  renderTaskQueue = () => {
    const { tasks } = this.state;
    return (
      <div style={{ width: '50%' }}>
        <Typography variant="h4" gutterBottom>Task Queue</Typography>
        <Card style={{ height: 500, overflow: 'scroll' }}>
          <CardContent>
            {tasks.map((task, index) => {
              const { name, status, value = 0 } = task;
              return (
                <div key={name}>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h5" gutterBottom style={{ marginRight: 20 }}>{name}</Typography>
                    <Typography variant="button" display="block" gutterBottom style={{ marginRight: 10}}>{status}</Typography>
                    <div style={{ marginRight: 10, flex: 1}}>
                      <LinearProgress variant="determinate" value={value}  />
                    </div>
                    {status !== 'active' && (
                      <div onClick={() => this.deletetask(task, index)}>
                        <img src={deleteIcon} style={{ height: 30, width: 30 }} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {tasks.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto'}}>
                No tasks queued
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Typography variant="h2" gutterBottom style={{ marginBottom: 50, fontWeight: 'bold' }}>Task Scheduler</Typography>
        {this.renderHeader()}
        <div style={{ display: 'flex', marginTop: 40, width: '100%' }}>
          {this.renderTaskQueue()}
          {this.renderCompletedTasks()}
        </div>
      </div>
    )
  }
}
