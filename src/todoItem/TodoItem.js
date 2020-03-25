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
        const {description, isComplete} = this.props.todo;
        return(<li className={isComplete ? 'completed' : 'incomplete'}  onClick={this.toggleFn}>{description}</li>);
    }
}

export default TodoItem;