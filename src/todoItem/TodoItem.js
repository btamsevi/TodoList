import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFn = this.toggleFn.bind(this);
    }

    

    toggleFn() {
        this.props.toggle(this.props.todo);
    }

    render() {
        const {text, completed} = this.props.todo;
        return(<li className={completed ? 'completed' : 'incomplete'}  onClick={this.toggleFn}>{text}</li>);
    }
}

export default TodoItem;