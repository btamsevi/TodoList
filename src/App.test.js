import React from 'react';
import App from './App';
import axios from 'axios';

afterEach(() => {
    jest.clearAllMocks();
});
jest.mock('axios');

function setup(loggedInUser = null) {
    let user = loggedInUser;
    const isLoading = false;

    const mockGetTokenSilently = jest.fn().mockImplementation(() => 
        Promise.resolve('accessToken')
    );

    const mockloginWithRedirect = jest.fn().mockImplementation(() => 
        Promise.resolve({})
    );

    const context = {
        user, 
        isLoading,
        getTokenSilently: () => mockGetTokenSilently(),
        loginWithRedirect: () => mockloginWithRedirect()
    };

    const instance = new App();

    instance.context = context;

    return instance
};

test('App.state, when App is constructed, equals {todos: [], accessToken: null}', () => {
    //arrange

    //act
    const instance = new App();
    const state = instance.state;

    //assert
    expect(state).toEqual({todos: [], accessToken: null});
});

test('App.state, when addTodo is called (while user is logged in), is appended with todo ', async () => {
    //arrange
    const instance = setup('user');

    const todoDescription = 'description';
    let argsPassed;

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp));

    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsPassed = args});

    //act
    await instance.addTodo(todoDescription);

    const { todos } = argsPassed;

    //assert
    expect(todos).toEqual([{ description: 'description', id: 'id', isComplete: false }]);
});

test('App.state, when addTodo is called (while no user is logged in), is appended with todo ', async () => {
    //arrange
    const instance = setup();
    const todoDescription = 'description';
    let argsPassed;

    const spy = jest.spyOn(instance, 'setState').mockImplementation((args) => {argsPassed = args});

    //act
    await instance.addTodo(todoDescription);

    const { todos } = argsPassed;

    //assert
    expect(todos).toEqual([{description: 'description', isComplete: false}]);
});

test('axios.post, when addTodo is called (while user is logged in), is called', async () => {
    //arrange
    const instance = setup('user');

    const todoDescription = 'description';

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp));
    const spy = jest.spyOn(axios, 'post');

    //act
    await instance.addTodo(todoDescription);

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('App.state.todos, when addTodo is called (while user is logged in), has an id property', async () => {
    //arrange
    const instance = setup('user');
    const todoDescription = 'description';
    let argsPassed;

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp));

    const spy = jest.spyOn(instance, 'setState').mockImplementation((args) => {argsPassed = args});


    //act
    await instance.addTodo(todoDescription);

    const {todos: [{ id }]} = argsPassed;

    //assert
    expect(id).toBeTruthy();
});

test('App, when resetTodos is called (while no user is logged in) and App.state.todos is empty, does not crash', () => {
    //arrange
    const instance = setup();


    //act
    instance.resetTodos();

    //assert
    expect(instance);
});

test('this.setState args, when resetTodos is called (while no user is logged in) and todo.isComplete is true, have isComplete prop set to false', async () => {
    //arrange
    const instance = setup();
    const todos = [{description: 'description', isComplete: true}];
    let argsCalled;

    instance.state = {todos: todos};

    jest.spyOn(instance, 'setState').mockImplementation((args) => {
        argsCalled = args;
    });

    //act
    instance.resetTodos();
    const { todos: [ { isComplete: todoIsCompleteProp } ] } = argsCalled;

    //assert
    expect(todoIsCompleteProp).toEqual(false);
});


test('this.setState args, when resetTodos is called(while no user is logged in) and todo.isComplete is false, isComplete prop remains false', async () => {
    //arrange
    const instance = setup();
    const todos = [{description: 'description', isComplete: false}];
    let argsCalled;

    instance.state = {todos: todos};

    jest.spyOn(instance, 'setState').mockImplementation((args) => {
        argsCalled = args;
    });

    //act
    instance.resetTodos();
    const { todos: [ { isComplete: todoIsCompleteProp } ] } = argsCalled;

    //assert
    expect(todoIsCompleteProp).toEqual(false);
});

test('App, when resetTodos is called (while user is logged in) and App.state.todos is empty, does not crash', () => {
    //arrange
    const instance = setup('user');

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp))

    //act
    instance.resetTodos();

    //assert
    expect(instance);
});

test('this.setState args, when resetTodos is called (while user is logged in) and todo.isComplete is true, has isComplete prop set to false', async () => {
    //arrange
    const instance = setup('user');

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp))

    const todos = [{description: 'description', isComplete: true}];
    let argsCalled;

    instance.state = {todos: todos};

    jest.spyOn(instance, 'setState').mockImplementation((args) => {
        argsCalled = args;
    });

    //act
    instance.resetTodos();
    const { todos: [ { isComplete: todoIsCompleteProp } ] } = argsCalled;

    //assert
    expect(todoIsCompleteProp).toEqual(false);
});

test('this.setState args, when resetTodos is called(while user is logged in) and todo.isComplete is false, has isComplete prop set to false', async () => {
    //arrange
    const instance = setup('user');

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp))

    const todos = [{description: 'description', isComplete: false}];
    let argsCalled;

    instance.state = {todos: todos};

    jest.spyOn(instance, 'setState').mockImplementation((args) => {
        argsCalled = args;
    });

    //act
    instance.resetTodos();
    const { todos: [ { isComplete: todoIsCompleteProp } ] } = argsCalled;

    //assert
    expect(todoIsCompleteProp).toEqual(false);
});

test('axios.put, when resetTodos is called (while user is logged in) and there are completed todos, is called once per completed todo', async () => {
    //arrange
    const instance = setup('user');
    const todos = [{description: 'description', isComplete: true, id: 'id'}];
    instance.state = {todos: todos};

    const resp = {data: {description: 'description', id: 'id', isComplete: false}};
    axios.post.mockImplementation(() => Promise.resolve(resp))
    
    const spy = jest.spyOn(axios, 'put');

    //act
    await instance.resetTodos();

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('App, when deleteCompletedTodos is called (while no user is logged in) and this.state.todos is empty, does not crash', () => {
    //arrange
    const instance = setup();

    //act
    instance.deleteCompletedTodos();

    //assert
    expect(instance);
});

test('App, when deleteCompletedTodos is called (while user is logged in) and this.state.todos is empty, does not crash', () => {
    //arrange
    const instance = setup('user');

    axios.delete.mockImplementation(() => {});

    //act
    instance.deleteCompletedTodos();

    //assert
    expect(instance);
});

test('this.setState args, when deleteCompletedTodos is called (while user is logged in), does not contain completed todos', () => {
    //arrange
    const instance = setup('user');
    const todos = [{description: 'description', isComplete: true, id: 'id'}];
    let argsCalled;

    instance.state = {todos: todos};

    axios.delete.mockImplementation(() => {});
    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsCalled = args});

    //act
    instance.deleteCompletedTodos();

    const { todos: passedTodos } = argsCalled;

    //assert
    expect(passedTodos === []);
});

test('this.setState, when deleteCompletedTodos is called (while no user is logged in), does not contain completed todos', () => {
    //arrange
    const instance = setup();
    const todos = [{description: 'description', isComplete: true, id: 'id'}];
    let argsCalled;

    instance.state = {todos: todos};

    axios.delete.mockImplementation(() => {});
    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsCalled = args});

    //act
    instance.deleteCompletedTodos();

    const { todos: passedTodos } = argsCalled;

    //assert
    expect(passedTodos === []);
});

test('this.setState args, when deleteCompletedTodos is called (while no user is logged in), contains incomplete todos', () => {
    //arrange
    const instance = setup();
    const todos = [{description: 'description', isComplete: false, id: 'id'}];
    let argsCalled;

    instance.state = {todos: todos};

    axios.delete.mockImplementation(() => {});
    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsCalled = args});

    //act
    instance.deleteCompletedTodos();

    const { todos: passedTodos } = argsCalled;

    //assert
    expect(passedTodos).toBeTruthy();
});

test('this.setState args, when deleteTodos is called (while user is logged in), contains incomplete todos', () => {
    //arrange
    const instance = setup('user');
    const todos = [{description: 'description', isComplete: false, id: 'id'}];
    let argsCalled;

    instance.state = {todos: todos};

    axios.delete.mockImplementation(() => {});
    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsCalled = args});

    //act
    instance.deleteCompletedTodos();

    const passedTodos = argsCalled;

    //assert
    expect(passedTodos).toEqual({"todos": [{"description": "description", "id": "id", "isComplete": false}]});
});

test('axios.delete, when deleteTodos is called (while user is logged in) and completed todos are present, is called once per completed todo', () => {
    //arrange
    const instance = setup('user');
    const todos = [{description: 'description', isComplete: true, id: '1'}];
    instance.state = {todos: todos};

    axios.delete.mockImplementation(() => {});
    const spy = jest.spyOn(axios, 'delete');

    //act
    instance.deleteCompletedTodos();

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('todo.isComplete, when toggle is called (and no user is logged in), is set to !todo.isComplete', () => {
    //arrange
    const instance = setup();
    const initialIsComplete = false;
    const todo = {description: 'description', isComplete: initialIsComplete, id: 'id'};
    
    instance.state = {todos: [todo]};

    //act
    instance.toggle(todo);

    const [stateTodo] = instance.state.todos;
    const newIsComplete = stateTodo.isComplete;

    //assert
    expect(initialIsComplete === !newIsComplete);
});

test('todo.isComplete, when toggle is called (and user is logged in), is set to !todo.isComplete', () => {
    //arrange
    const instance = setup('user');
    const initialIsComplete = false

    const todos = [{description: 'description', isComplete: initialIsComplete, id: 'id'}];
    instance.state = {todos: todos};
    const clickedTodo = todos[0];
    let argsPassed;

    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsPassed = args});

    //act
    instance.toggle(clickedTodo);

    const {todos: [ {isComplete : newIsComplete} ] } = argsPassed;

    //assert
    expect(newIsComplete === !initialIsComplete);
});

test('axios.put, when toggle is called (and user is logged in), is called', () => {
    //arrange
    const instance = setup('user');

    const todos = [{description: 'description', isComplete: false, id: 'id'}];
    instance.state = {todos: todos};

    const clickedTodo = todos[0];

    axios.put.mockImplementation(() => {});
    const spy = jest.spyOn(axios, 'put');

    //act
    instance.toggle(clickedTodo);


    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('loginWithRedirect, when loginWithRedirectFn is called, is called', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: {todos: []}};

    axios.get.mockImplementation(() => Promise.resolve(resp));

    const spy = jest.spyOn(instance.context, 'loginWithRedirect');

    //act

    await instance.loginWithRedirectFn();

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('getTokenSilently, when loginWithRedirectFn is called, is called', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: {todos: []}};

    axios.get.mockImplementation(() => Promise.resolve(resp));

    const spy = jest.spyOn(instance.context, 'getTokenSilently');

    //act

    await instance.loginWithRedirectFn();

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('axios.get, when loginWithRedirectFn is called, is called', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: {todos: []}};

    axios.get.mockImplementation(() => Promise.resolve(resp));

    const spy = jest.spyOn(axios, 'get');

    //act
    await instance.loginWithRedirectFn();

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('instance.setState, when loginWithRedirectFn is called, is called with an arg containing an accessToken', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: {todos: []}};
    let argsPassed;

    axios.get.mockImplementation(() => Promise.resolve(resp));

    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsPassed = args});

    //act
    await instance.loginWithRedirectFn();

    const { accessToken } = argsPassed;

    //assert
    expect(accessToken).toEqual('accessToken');
});

test('instance.setState args, when loginWithRedirectFn is called, contain todos', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: ['todo']};
    let argsPassed;

    axios.get.mockImplementation(() => Promise.resolve(resp));

    jest.spyOn(instance, 'setState').mockImplementation((args) => {argsPassed = args});

    //act
    await instance.loginWithRedirectFn();

    const { todos } = argsPassed;

    //assert
    expect(todos).toEqual(['todo']);
});

test('axios.defaults.headers.common.Authorization, when loginWithRedirectFn is called, equals `Bearer ${accessToken}` ', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: []};

    axios.get.mockImplementation(() => Promise.resolve(resp));

    //act
    await instance.loginWithRedirectFn();

    //assert
    expect(axios.defaults.headers.common.Authorization).toEqual('Bearer accessToken');
});

test('axios.defaults.headers.common["Content-Type"], when loginWithRedirectFn is called, equals "application/json" ', async () => {
    //arrange
    const instance = setup('user');
    const resp = {data: []};

    axios.get.mockImplementation(() => Promise.resolve(resp));

    //act
    await instance.loginWithRedirectFn();

    //assert
    expect(axios.defaults.headers.common['Content-Type']).toEqual('application/json');
});

test('App, when context.isLoading is false, returns expected tree', () => {
    //arrange
    const instance = setup();
    instance.context = {isLoading: false};

    //act
    const response = instance.render();

    //assert
    expect(response !== <div><div>Loading...</div></div>);
});

test('App, when context.isLoading is true, returns Loading div', () => {
    //arrange
    const instance = setup();
    instance.context = {isLoading: true};

    //act
    const response = instance.render();

    //assert
    expect(response).toEqual(<div><div>Loading...</div></div>);
});
