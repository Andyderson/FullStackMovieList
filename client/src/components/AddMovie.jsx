import React from 'react';
import ReactDOM from 'react-dom';

export class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>
            <input type="text" placeholder="Add a movie" onKeyUp={this.props.handleAdd}></input>
            </div>
        )
    }
}