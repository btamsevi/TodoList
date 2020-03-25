import React from 'react';

class AddItemBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateList = this.updateList.bind(this);
        this.resetTodos = this.resetTodos.bind(this);
        this.deleteCompletedTodos = this.deleteCompletedTodos.bind(this);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.updateList();
        }
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    updateList(e) {
        this.props.intermediateFunc(this.state.value);
        this.setState({ value: '' });
    }

    resetTodos() {
        this.props.resetTodosFn();
    }

    deleteCompletedTodos() {
        this.props.deleteCompletedTodosFn();
    }

    render() {
        const buttonText = this.props.buttonText;
        return (
            <div className='AddItemBar'>
                <input type='text' value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder={this.props.placeholder} size='40' />
                <button type='button' onClick={this.updateList}>{buttonText}</button>
                <button onClick={this.resetTodos}>Reset</button>
                <button onClick={this.deleteCompletedTodos}>Delete</button>
            </div>

        );
    }
}

export default AddItemBar;