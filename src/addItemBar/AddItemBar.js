import React from 'react';

class AddItemBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value : ''};
        this.updateList = this.updateList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e){
        if (e.key === 'Enter') {
            this.props.intermediateFunc(this.state.value);
            this.setState({value : ''});
        }
    }

    handleChange(e) {
        this.setState({value : e.target.value});
    }

    updateList(e) {
        this.intermediateFunc(this.state.value);
        this.setState({value : ''});
    }

    render() {
        const buttonText = this.props.buttonText;
        return(
            <div className='AddItemBar'>
                <input type='text' value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder={this.props.placeholder} size='40'/>
                <button type='button' onClick={this.updateList}>{buttonText}</button>
            </div>

        );
    }
}

export default AddItemBar;