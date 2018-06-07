import React, {Component} from 'react';
import Task from './Task';
import {getList, addTask, toComplete} from '../ducks/reducer';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      task: {
        id: 0,
        title: '',
        description: '',
        completed: false
      },
    }
  }

  componentDidMount() {
    this.props.getList()
  }
  
  handleInput(e) {
    let task = {...this.state.task, title: e.target.value}
    this.setState({task})
  }
  
  addTask() {
    if (this.state.task.title) {
      this.props.addTask(this.state.task).then(
        res => {
          this.props.getList()
        }
        
      )
      this.setState({
        task: {
        title: '',
        description: '',
        completed: false
      }})
    }
  }

  deleteTask(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(
      res => {
        this.props.getList();
      }
    )

    // let list = this.props.list.slice();
    // list.splice(i, 1);
    // this.props.toDelete(list)
  }

  update() {
    
  }

  completeTask(id) {
    let list = this.props.list.map((item, i) => {
      if (i === id) {
        item.completed = !item.completed;
      }
      return item;
    })
    this.props.toComplete(list)
  } 

  render() {

    let todos = this.props.list.map((item, i) => {
      return (
        <Task key={i} title={item.title} id={item.id} 
        deleteTask={(id) => this.deleteTask(id)}
        completeTask={(id) => this.completeTask(id)}
        completed={item.completed}
        />
      )
    })
    return (
      <div>
        <h2> TO-DO: </h2>
        <input type="text" value={this.state.task.title} onChange={this.handleInput.bind(this)}/>
        <button onClick={this.addTask.bind(this)}>Add new To-do</button>
        {todos}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const actionCreators = {

  getList,
  toComplete,
  addTask
}

export default connect(mapStateToProps, actionCreators)(ToDo);