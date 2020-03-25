import React from 'react';
import axios from 'axios';
import LoginOrLogoutButton from './loginOrLogoutButton/LoginOrLogoutButton';
import AddItemBar from './addItemBar/AddItemBar';
import ItemList from './itemList/ItemList';
import { Auth0Context } from './contexts/auth0-context';

import './App.css';



class App extends React.Component {

  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.resetTodos = this.resetTodos.bind(this);
    this.deleteCompletedTodos = this.deleteCompletedTodos.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = { todos: [], accessToken: null };
  }


  async addTodo(description) {
    const todos = this.state.todos;
    const isLoggedIn = !!this.context.user;
    let newTodo = { description: description };

    if (isLoggedIn) {
      const url = '/tasks'
      const { data: newTodoWithId } = await axios.post(url, newTodo);
      newTodo = newTodoWithId;
    }

    todos.push(newTodo);
    this.setState({ todos: todos });

  }

  resetTodos() {
    const isLoggedIn = !!this.context.user;
    const todos = this.state.todos;

    todos.forEach(async (todo) => {
      if (todo.isComplete === true) {
        todo.isComplete = false;

        if (isLoggedIn) {
          const url = `/tasks/${todo.id}`;
          await axios.put(url, todo)
        }
      }
    });
    this.setState({ todos: todos });
  }

  deleteCompletedTodos() {
    const isLoggedIn = !!this.context.user;
    const incompleteTodos = [];


    this.state.todos.forEach(todo => {

      if (!todo.isComplete) {
        incompleteTodos.push(todo);
      }

      if (isLoggedIn && todo.isComplete) {
        const url = `/tasks/${todo.id}`;

        axios.delete(url);
      }
    });
    this.setState({ todos: incompleteTodos });
  }

  toggle(clickedTodo) {
    const isLoggedIn = !!this.context.user;
    const taskId = clickedTodo.id;

    const todos = this.state.todos.map(todo => {
      if(todo === clickedTodo) {
        todo.isComplete = !todo.isComplete

        if (isLoggedIn) {
          const url = `/tasks/${taskId}`;
          axios.put(url, todo)
        };
      };
      return todo;
    });
  
    this.setState({todos : todos}); 
  }


  render() {
    const todos = this.state.todos;
    const { isLoading, user, getTokenSilently } = this.context;
    const isLoggedIn = !!user;

    if (isLoggedIn && this.state.accessToken === null) {
      getTokenSilently()
        .then(accessToken => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          axios.defaults.headers.common['Content-Type'] = 'application/json';

          axios.get('/tasks')
            .then(result => {
              const { data: todos } = result;
              this.setState({ todos: todos, accessToken: accessToken });
            });
        });
    };

    return (
      <div>
        {!isLoading
          ? (
            <>
              <LoginOrLogoutButton />
              <h1>Todo List</h1>

              <AddItemBar placeholder='Add Todo'
                buttonText='+'
                intermediateFunc={this.addTodo}
                resetTodosFn={this.resetTodos}
                deleteCompletedTodosFn={this.deleteCompletedTodos} />

              <ItemList todos={todos} toggleFn={this.toggle} />
            </>
          )

          : <div>Loading...</div>}
      </div>
    );
  }
}


App.contextType = Auth0Context;
export default App;