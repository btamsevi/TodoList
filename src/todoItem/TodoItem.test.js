import React from 'react';
import TodoItem from './TodoItem';
import { shallow } from 'enzyme';

// To name a test:  name, scenario, expected behavior
// To arrange a test: arrange(create and setup your objects), act (on an object), assert (expected output)

test('this.props.todo, when TodoItem is constructed, is populated', () => {
    //arrange
    const todo = { 'description': 'description text', 'isComplete': false };

    //act
    const todoItem = <TodoItem todo={todo} />;

    //assert
    expect(todoItem.props.todo).not.toBeNull();
});

test('this.props.todo.description, when TodoItem is constructed, is populated', () => {
    //arrange
    const todo = { 'description': 'description text', 'isComplete': false };

    //act
    const todoItem = <TodoItem todo={todo} />;

    //assert
    expect(todoItem.props.todo).toHaveProperty('description');
});

test('this.props.todo.isComplete, when TodoItem is constructed, is populated', () => {
    //arrange
    const todo = { 'description': 'description text', 'isComplete': false };

    //act
    const todoItem = <TodoItem todo={todo} />;

    //assert
    expect(todoItem.props.todo).toHaveProperty('isComplete');
});



test('toggleFn, when <li> is clicked once, is called once', () => {
    //arange
    const todo = { "description": "description", "isComplete": false };
    const mockToggle = jest.fn();

    const wrapper = shallow(<TodoItem todo={todo} toggle={mockToggle} />);
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'toggleFn');
    instance.forceUpdate();


    //act
    wrapper.find('li').simulate('click');

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('this.props.toggle, when toggleFn is called, is called', () => {
    //arange
    const todo = { "description": "description", "isComplete": false };
    const mockToggle = jest.fn();

    const wrapper = shallow(<TodoItem todo={todo} toggle={mockToggle} />);
    const instance = wrapper.instance();

    //act
    instance.toggleFn();

    //assert
    expect(mockToggle).toHaveBeenCalledTimes(1);
});

test('todoItem classname, when this.props.todo.isComplete is false, is set to incomplete', () => {
    //arange
    const todo = { 'isComplete': false };

    //act
    const todoItem = shallow(<TodoItem todo={todo} />);

    //assert
    expect(todoItem.hasClass('incomplete'));
});

test('todoItem classname, when this.props.todo.isComplete is true, is set to complete', () => {
    //arange
    const todo = { 'isComplete': true };

    //act
    const todoItem = shallow(<TodoItem todo={todo} />);

    //assert
    expect(todoItem.hasClass('complete'));
});

test('todoItem text, when todoItem is rendered, is set to this.props.todo.description', () => {
    //arange
    const todo = { 'description': 'description text' };

    //act
    const todoItem = shallow(<TodoItem todo={todo} />);
    const text = todoItem.text();

    //assert
    expect(text).toEqual('description text');
});
