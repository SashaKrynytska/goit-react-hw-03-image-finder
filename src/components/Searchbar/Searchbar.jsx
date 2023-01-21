import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.query) return; // запрет отправки пустого инпута
    this.props.onSubmit(this.state.query.toLowerCase().trim());
    this.resetForm();
  };

  resetForm = () => this.setState({ query: '' });

  render() {
    const { query } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
