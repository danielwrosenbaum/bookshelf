import React from 'react';
import parseRoute from '../lib/parse-route';
import AdvancedSearch from './advanced-search';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isClicked: false,
      route: parseRoute(window.location.hash)
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdvancedButton = this.handleAdvancedButton.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleAdvancedButton() {
    this.setState({ isClicked: true });

  }

  renderPage() {

  }

  render() {
    if (this.state.isClicked) return <AdvancedSearch />;
    return (
      <div className="search-container home">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
            <div className="heading">Search</div>
            <input placeholder="Search Books" required className="text-box" type="text" name="search" onChange={this.handleChange} />
          </label>
          <div>
            <input className="button submit" type="submit" value="Submit" />
          </div>
        </form>
        <button onClick={this.handleAdvancedButton} className="button advanced-btn">Advanced Search</button>
      </div>
    );
  }
}
