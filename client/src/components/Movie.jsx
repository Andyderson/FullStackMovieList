import React from 'react';
import ReactDOM from 'react-dom';

export class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: true,
        }
        this.toggleDescription = this.toggleDescription.bind(this);
    }

    toggleDescription (e) {
        this.setState({
          description: !this.state.description
        })
      }

    render() {
        return (
            <div>
                <li onClick={this.toggleDescription}> {this.props.movie.title}: {this.state.description ? <b>{this.props.movie.description}</b> : null} </li>
            </div>
        )
    }
}
