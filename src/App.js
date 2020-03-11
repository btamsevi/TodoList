import React from 'react';
import AddItemBar from './addItemBar/AddItemBar';
import ItemList from './itemList/ItemList';
import {default as DefaultTodos} from './DefaultTodos';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this); 
    this.resetTodo = this.resetTodo.bind(this);
    this.deleteCompletedTodos = this.deleteCompletedTodos.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {todos: DefaultTodos};
  }

  addTodo(todo) {
    const todos = this.state.todos;
    const newTodo = {text: todo, completed: false};
    todos.push(newTodo);
    this.setState({todos : todos});
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  resetTodo() {
    const todos = this.state.todos;
    todos.forEach(todo => todo.completed = false);
    this.setState({todos : todos});
  }

  deleteCompletedTodos() {
    const newTodos = []
    this.state.todos.forEach(_todo => {
      if(_todo.completed === false)
        newTodos.push(_todo)
      });
    console.log(newTodos);
    this.setState({todos : newTodos});
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  toggle(todo) {
    const newTodos = this.state.todos.map((_todo) => {
      if(todo === _todo)
        return {
          text: todo.text,
          completed: !todo.completed
        }
      else
        return _todo
    });
    this.setState({todos : newTodos});
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

   componentDidMount() {
    const savedTodosStrings = localStorage.getItem('todos');
    if(savedTodosStrings) {
      const savedTodos = JSON.parse(savedTodosStrings);
      this.setState({todos : savedTodos});
    }
  }

  render(){
    const todos = this.state.todos;

    return(
      <div>
          <h1>Todo List</h1>
          <AddItemBar placeholder='Add Todo' buttonText='+' intermediateFunc={this.addTodo}/>
          <button onClick={this.resetTodo}>Reset</button>
          <button onClick={this.deleteCompletedTodos}>Delete</button>
          <ItemList todos={todos} toggleFn={this.toggle}/>
      </div>
    );
  }
}
export default App;
