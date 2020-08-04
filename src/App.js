import React from 'react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Typography
} from '@material-ui/core';

import deleteIcon from './assets/delete_icon.png';

export default class App extends React.Component {

  state = {
    newTasks: null,
    tasks: [],
    taskQueue: [],
    servers: 0,
    currentTaskCount: 0
  }

  addTask = () => {
    const { newTasks, tasks, currentTaskCount } = this.state;
    const newTasksAssigned = Array(newTasks).fill({ status: 'pending' }).map((task, index) => ({ ...task, name: `Task ${index + 1 + currentTaskCount}`}));
    const newsTaskList = [...tasks, ...newTasksAssigned ];
    this.setState({ tasks: newsTaskList, newTasks: 0, currentTaskCount: currentTaskCount + newTasksAssigned.length });
  }

  addServer = () => {
    const { servers } = this.state;
    this.setState({ servers: servers+1 });
  }

  removeServer = () => {
    const { servers } = this.state;
    this.setState({ servers: servers-1 });
  }

  deletetask = (task) => {
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter(tsk => tsk.name !== task.name) })
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
        <Button variant="contained" color="secondary" onClick={this.removeServer} disabled={!servers}>Remove Server</Button>
      </div>
    )
  }

  renderExecution = () => {
    return (
      <div style={{ width: '50%', paddingLeft: 20 }}>
        <Typography variant="h4" gutterBottom>Execution</Typography>
        <Card style={{ height: 500, overflow: 'scroll' }}>
          <CardContent>
          
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
              const { name, status } = task;
              return (
                <div key={name}>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h5" gutterBottom style={{ marginRight: 20 }}>{name}</Typography>
                    <Typography variant="button" display="block" gutterBottom>{status}</Typography>
                    <div onClick={() => this.deletetask(task, index)}>
                      <img src={deleteIcon} style={{ height: 30, width: 30, marginLeft: 20 }} />
                    </div>
                  </div>
                </div>
              )
            })}
            {tasks.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto'}}>
                No tasks
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
          {this.renderExecution()}
        </div>
      </div>
    )
  }
}
