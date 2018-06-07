import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getList} from '../ducks/reducer';
import axios from 'axios';

class DetailedTask extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      completed: false
    }
  }

  componentDidMount() {
    let {id} = this.props.match.params;
    let items = this.props.list.filter((item, i) => {
      console.log(item.id, id)
      if (item.id === +id) {
        return item;
      }
    })

    console.log(items)
    this.setState({ 
      title: items[0].title,
      description: items[0].description
      // title: this.props.list[id].title,
      // description: this.props.list[id].description
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  updateTask() {
    let {id} = this.props.match.params;
    axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, this.state).then(
      res => {
        this.props.getList();
      }
    )
  }

  updateCompleted() {
    let {id} = this.props.match.params;
    console.log(id)
    axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`, true)
  }

  delete() {
    let {id} = this.props.match.params;
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(res => {
      this.props.getList();
    })
  }

  cancel() {
    let {id} = this.props.match.params;
    let items = this.props.list.filter((item, i) => {
      console.log(item.id, id)
      if (item.id === +id) {
        return item;
      }
    })

    console.log(items)
    this.setState({ 
      title: items[0].title,
      description: items[0].description
      // title: this.props.list[id].title,
      // description: this.props.list[id].description
    })
  }
  
  render() {
    let {id} = this.props.match.params;
    return (
      <div>
        <Link to="/todo">
        <p>Back to Tasks</p>
        </Link>

        <p>Task</p>
        <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
        <button onClick={() => this.updateCompleted()}> Complete </button>
        <p>Description</p>
        <input type="text" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
        <Link to="/todo"><button onClick={() => this.updateTask()}>Save</button></Link>
        <button onClick={() => this.cancel()}>Cancel</button>
        <Link to="/todo"><button onClick={() => this.delete()}>Delete</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}
export default connect(mapStateToProps, {getList})(DetailedTask);