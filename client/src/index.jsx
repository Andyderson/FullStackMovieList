import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Movie} from './components/Movie.jsx';
import {Search} from './components/Search.jsx';
import {AddMovie} from './components/AddMovie.jsx';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

componentDidMount() {
  axios.get('/movies')
  .then((res) => {
    console.log('Axios GET Success', res);
    this.setState({
      movies: res.data,
    })
  })
  .catch((error) => {
    console.log('Axios GET Failure', error);
  });
}

  handleSearch (e) {
    if (e.key === 'Enter') {
      axios.get('/search', {params: {
        query: e.target.value}})
        .then((res) => {
          console.log('Axios Search Success');
          this.setState({
            movies: [res.data]
          })
        })
        .catch((error) => {
          console.log('Axios Search Failure', error);
        })
      } 
  };

  handleAdd (e) {
    if (e.key === 'Enter') {
      axios.post('/movies', {title: e.target.value})
      .then((res) => {
        console.log('Axios POST Success', res);
        this.setState({
          movies: res.data
        })
      })
      .catch((error) => {
        console.log('Axios POST Error', error);
      });
    }
  }
 
  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch}/>
        <AddMovie handleAdd={this.handleAdd}/>
        <ul>{this.state.movies.map((movie, i) => <Movie key={i} movie={movie}/>)}</ul>
      </div>
    )
  }
}

ReactDOM.render( <MovieList />, document.getElementById('app'));
