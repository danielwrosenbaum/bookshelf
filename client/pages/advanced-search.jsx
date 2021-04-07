import React from 'react';
import parseRoute from '../lib/parse-route';

const apiKey = 'key=AIzaSyAvazhS5IpqO0KVFL5XyOvDA-Gns7YyFJ8';
const bookURL = 'https://www.googleapis.com/books/v1/volumes?q=';

export default class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitleValue: '',
      inputAuthorValue: '',
      inputIsbnValue: '',
      route: parseRoute(window.location.hash),
      data: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let query;
    let terms;
    const name = event.target.name;
    if (name === 'title') {
      query = this.state.inputTitleValue;
      terms = 'intitle';
    } else if (name === 'author') {
      query = this.state.inputAuthorValue;
      terms = 'inauthor';
    } else if (name === 'ISBN') {
      query = this.state.inputIsbnValue;
      terms = 'isbn';
    }
    fetch(bookURL + terms + ':' + query + '&' + apiKey)
      .then(res => res.json())
      .then(
        result => {
          // console.log(query, result);
          this.setState({
            data: result
          });
        }
      )
      .catch(error => console.error(error));
  }

  handleChange(event) {
    const name = event.target.name;
    if (name === 'title') {
      this.setState({ inputTitleValue: event.target.value });

    } else if (name === 'author') {
      this.setState({ inputAuthorValue: event.target.value });

    } else if (name === 'ISBN') {
      this.setState({ inputIsbnValue: event.target.value });

    }

  }

  render() {
    return (
      <div className="search-container advanced">
        <div className="heading two">Advanced Search</div>
        <form name="title" className="search-form" onSubmit={this.handleSubmit}>
          <label>
            <div className="heading three">Search by Title</div>
            <input name="title" className="text-box" type="text" placeholder="Title Name..." required onChange={this.handleChange} />
            <div>
              <input className="button submit" type="submit" value="Submit" />
            </div>
          </label>
        </form>
        <form name="author" className="search-form" onSubmit={this.handleSubmit}>
          <label>
            <div className="heading three">Search by Author</div>
            <input name="author" className="text-box" type="text" placeholder="Author Name..." required onChange={this.handleChange} />
            <div>
              <input className="button submit" type="submit" value="Submit" />
            </div>
          </label>
        </form>
        <form name="ISBN" className="search-form" onSubmit={this.handleSubmit}>
          <label>
            <div className="heading three">Search by ISBN</div>
            <input name="ISBN" className="text-box" type="text" placeholder="ISBN number..." required onChange={this.handleChange} />
            <div>
              <input className="button submit" type="submit" value="Submit" />
            </div>
          </label>
        </form>
      </div>
    );
  }

}
