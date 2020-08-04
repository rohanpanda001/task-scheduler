import React from 'react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Typography
} from '@material-ui/core';

export default class App extends React.Component {

  state = {
    newTasks: null,
    tasks: [],
    taskQueue: [],
    servers: 0
  }

  addTask = () => {
    const { newTasks, tasks } = this.state;
    const newTasksAssigned = Array(newTasks).fill({ status: 'pending' });
    this.setState({ tasks: [...tasks, ...newTasksAssigned ] });
  }

  addServer = () => {
    const { servers } = this.state;
    this.setState({ servers: servers+1 });
  }

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
          onChange={(e) => this.setState({ newTasks: parseInt(e.target.value) })}
        />
        <Button variant="contained" color="primary" onClick={this.addTask} style={{ marginLeft: 10 }} disabled={!newTasks}>Add Task</Button>
        <div style={{ flex: 1 }} />
        <Typography variant="body2" gutterBottom style={{ marginRight: 10 }}>{`Active Servers: ${servers}`}</Typography>
        <Button variant="contained" color="secondary" onClick={this.addServer} style={{ marginLeft: 10 }}>Add Server</Button>
      </div>
    )
  }

  renderExecution = () => {}

  renderTaskQueue = () => {
    const { tasks } = this.state;
    return (
      <div style={{ marginTop: 40 }}>
        <Typography variant="h4" gutterBottom>Task Queue</Typography>
        <Card style={{ minHeight: 200 }}>
          <CardContent>
            {tasks.map((task, index) => {
              const { status } = task;
              const name = `Task ${index + 1}`;
              return (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h5" gutterBottom style={{ marginRight: 10 }}>{name}</Typography>
                    <Typography variant="button" display="block" gutterBottom>{status}</Typography>
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
        {this.renderExecution()}
        {this.renderTaskQueue()}
      </div>
    )
  }
}
