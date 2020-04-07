import React from 'react';
import AddItemBar from './AddItemBar';
import { shallow } from 'enzyme';

function setup() {
    const mockAddTodo = jest.fn();
    const mockResetTodosFn = jest.fn();
    const mockDeleteCompletedTodosFn = jest.fn();

    const wrapper = shallow(<AddItemBar
        addTodo={mockAddTodo}
        resetTodosFn={mockResetTodosFn}
        deleteCompletedTodosFn={mockDeleteCompletedTodosFn}
    />);

    return {wrapper, mockDeleteCompletedTodosFn, mockAddTodo, mockResetTodosFn}
};


test('handleKeyDown, when key is pressed in text input dialog, is called', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'handleKeyDown');
    instance.forceUpdate();

    //act
    wrapper.find('input')
        .simulate('keydown', { key: 'Enter' });

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('this.updateList, when handleKeydown is called with enter key parameter, is called', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'updateList');
    instance.forceUpdate();

    //act
    wrapper.find('input')
        .simulate('keydown', { key: 'Enter' });

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('handleChange, when value in text dialogue changes, is called', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'handleChange');
    instance.forceUpdate();

    //act
    wrapper.find('input')
        .simulate('change', { target: { value: 'value' } });

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('this.state, when value in text dialogue changes, is equal to text dialogue value', () => {
    //arrange
    const { wrapper } = setup()

    //act
    wrapper.find('input')
        .simulate('change', { target: { value: 'value' } });

    const state = wrapper.state('value');

    //assert
    expect(state).toEqual('value');
});

test('resetTodos, when reset button is clicked, is called', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'resetTodos');
    instance.forceUpdate();

    //act
    wrapper.find('#resetButton').simulate('click');

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('deleteCompletedTodos, when delete button is clicked, is called', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'deleteCompletedTodos');
    instance.forceUpdate();

    //act
    wrapper.find('#deleteButton').simulate('click');

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('updateList, when addButton is clicked, is called', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    const spy = jest.spyOn(instance, 'updateList');
    instance.forceUpdate();

    //act
    wrapper.find('#addButton').simulate('click');

    //assert
    expect(spy).toHaveBeenCalledTimes(1);
});

test('addTodo, when updateList is called, is called', () => {
    //arrange
    const { wrapper, mockAddTodo } = setup()
    const instance = wrapper.instance();

    //act
    instance.updateList();

    //assert
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
});

test('this.state.value, when updateList is called, equals an empty string', () => {
    //arrange
    const { wrapper } = setup()
    const instance = wrapper.instance();

    //act
    instance.updateList();
    const stateValue = wrapper.state('value');

    //assert
    expect(stateValue).toEqual("");
});

test('resetTodosFn, when resetTodos is called, is called', () => {
    //arrange
    const { wrapper, mockResetTodosFn } = setup()
    const instance = wrapper.instance();

    //act
    instance.resetTodos();

    //assert
    expect(mockResetTodosFn).toHaveBeenCalledTimes(1);
});

test('deleteCompletedTodosFn, when deleteCompletedTodos is called, is called', () => {
    //arrange
    const { wrapper, mockDeleteCompletedTodosFn } = setup()
    const instance = wrapper.instance();

    //act
    instance.deleteCompletedTodos();

    //assert
    expect(mockDeleteCompletedTodosFn).toHaveBeenCalledTimes(1);
});