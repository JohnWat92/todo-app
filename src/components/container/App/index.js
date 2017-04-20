import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

//importing presentational components
import ToDoItem from '../../presentational/ToDoItem';
import ToDoCount from '../../presentational/ToDoCount';
import ClearButton from '../../presentational/ClearButton';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        { id: 0, title: 'Learn React', complete: false },
        { id: 1, title: 'Learn Redux', complete: false },
        { id: 2, title: 'Learn Havascript', complete: false }
      ],
      lastId: 2,
      inputValue: ""
    };
    this.removeToDo = this.removeToDo.bind(this);
    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
  }

  hasCompleted() {
    let completedTodos = this.state.todos.filter((todo) => todo.complete);
    if (completedTodos.length > 0) {
      return true;
    } else{
      return false;
    }
  }

  toggleComplete(item){
    let newTodos = this.state.todos.map((todo)=> {
      if (item.id === todo.id){
        todo.complete = !todo.complete;
      }
      return todo;
    });
    this.setState({
      todos: newTodos
    })
  }

  removeToDo(item) {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== item.id;
    });
    this.setState({ todos: newTodos })
  }

  removeCompleted() {
    let newTodos = this.state.todos.filter((todo) => (!todo.complete));
    this.setState({ todos: newTodos })
  }

  addToDo(event){
    event.preventDefault();
    if (this.state.inputValue){
      const id = this.state.lastId +1;
      const newTodos = this.state.todos.concat({
        id,
        title: this.state.inputValue,
        complete:false
      });
      this.setState({
        todos: newTodos,
        lastId: id
      });
      this.setState((this.inputValue: ''));
    }
  }

  onInputChange(event){
    this.setState({inputValue: event.target.value});
  }

  componentDidMount(){
    this.toDoInput.focus();
  }

  render() {
    console.log(this.state.inputValue);
    // const todos = this.state.todos;
    return (
      <div className="todo-list">
        <h1> Le Task Manager </h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            {/*<input type="text" ref={(input) => (this.toDoInput = input)} />*/}
            <input type="text" value={this.state.inputValue} ref={(input) => (this.toDoInput = input)} onChange={(e) => this.onInputChange(e)} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.todos.map((todo, i) => (
            <ToDoItem 
              key={i} 
              item={todo} 
              toggleComplete={this.toggleComplete.bind(this, todo)} 
              removeToDo={() => this.removeToDo(todo)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() &&
            <ClearButton removeCompleted={() => this.removeCompleted()} />
          }
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    complete: PropTypes.bool
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired
};
ToDoCount.propTypes = {
 number: PropTypes.number.isRequired
};
ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default App;
