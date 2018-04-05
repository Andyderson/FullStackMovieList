import React from 'react';
import ReactDOM from 'react-dom';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    
        }
    }

    render () {
        return (
            <div>
                <input type="text" placeholder="Search for movie" onKeyPress={this.props.handleSearch}></input>
            </div>
        )
    }
}