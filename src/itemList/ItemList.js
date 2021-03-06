import React from 'react';
import TodoItem from '../todoItem/TodoItem';

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(todo) {
        this.props.toggleFn(todo);
    }

    render() {
        const todos = this.props.todos;

        return(
            <div className='ItemList'>
                <ul>{todos.map(todo => <TodoItem todo={todo} key={todo.id} toggle={this.toggle}/>)}</ul>
            </div>
        );
    }
}

export default ItemList;