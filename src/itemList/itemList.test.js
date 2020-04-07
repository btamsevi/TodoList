import React from 'react';
import ItemList from './ItemList';
import { shallow } from 'enzyme';
import {cleanup, fireEvent, render} from '@testing-library/react';

afterEach(cleanup);

let todos = [{'todos' : 'todos'}];

test('ItemList, when constructed, has classname "ItemList"', () => {
    //arrange
    const itemlist = shallow(<ItemList todos={todos}/>);
    
    //act


    //assert
    expect(itemlist.hasClass('ItemList'));
});

test('ItemList.props.todos, when ItemList is constructed, is populated', () => {
    //arrange
    
    //act
    const itemList = shallow(<ItemList todos={todos}/>);
    
    //assert
    expect(itemList.props.todos);
});

test('separate li elements, when ItemList is rendered, return with the descriptions provdied by props', () => {
    //arrange
    todos = [{'description': 'description 1'}, {'description': 'description 2'}];

    //act
    const { getByText } = render(<ItemList todos={todos}/>);

    const firstTodo = getByText('description 1');
    const secondTodo = getByText('description 2');

    //assert
    expect((firstTodo != secondTodo) && firstTodo && secondTodo).toBeTruthy();
});

test('this.props.toggleFn, when toggleFn is called, is called', () => {
    //arrange
    const mockToggleFn = jest.fn();
    const wrapper = shallow(<ItemList todos={todos} toggleFn={mockToggleFn} />);
    const instance = wrapper.instance();
    //act
    instance.toggle();
    //assert
    expect(mockToggleFn).toHaveBeenCalledTimes(1);
});