import React from 'react';
import TodoItem from '../todoItem/TodoItem';

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.todos;
        this.toggle = this.toggle.bind(this);
    }

    toggle(todo) {
        this.props.toggleFn(todo);
    }

    render() {
        const todos = this.props.todos;

        return(
            <div className='ItemList'>
                <ul>{todos.map(todo => <TodoItem todo={todo} toggle={this.toggle}/>)}</ul>
            </div>
        );
    }
}

export default ItemList;