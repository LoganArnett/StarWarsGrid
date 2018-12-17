import React from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import { actions } from '../redux';
import { getStarWarsPeople, searchStarWarsPeople, getStarWarsSpecies, formatSpecies } from '../utils';
import Placeholder from './Placeholder';
import Person from './Person';
import '../styles/App.scss';

class App extends React.Component {
  state = {
    loading: true,
    sortBy: ''
  }
  async componentDidMount() {
    await this.buildStarWarsData();
  }
  async buildStarWarsData(next) {
    const { dispatch, species } = this.props;
    const speciesData = await getStarWarsSpecies(next);

    dispatch(actions.change('species', Object.assign(species, formatSpecies(speciesData.results))));

    if (speciesData.next) {
      this.buildStarWarsData(speciesData.next);
    } else {
      await this.getPeople();
      this.setState({ loading: false });
    }
  }
  async getPeople() {
    const { dispatch } = this.props;
    const peopleData = await getStarWarsPeople();

    dispatch(actions.change('people', peopleData.results));

    if (!peopleData.count) {
      dispatch(actions.change('peopleCount', peopleData.count));
    }
  }
  async searchPeople(name) {
    const { dispatch } = this.props;
    const people = await searchStarWarsPeople(name);
    dispatch(actions.change('people', people));
    this.setState({ loading: false });
  }
  handleChange(sortBy) {
    if (sortBy) {
      const { dispatch, people } = this.props;

      dispatch(actions.change('people', orderBy(people, 'name', sortBy === 'A-Z' ? 'asc' : 'desc')))
    }
    this.setState({ sortBy });
  }
  handleEnter(e) {
    if (e.keyCode === 13) {
      const { value } = e.target;
      this.setState({ loading: true }, () => this.searchPeople(value))
    }
  }
  handleBlur(e) {
    const { people } = this.props;
    if (!e.target.value && people.length < 10) {
      this.getPeople();
    }
  }
  render() {
    const { loading, sortBy } = this.state;
    const { people, species } = this.props;

    return (
      <section className="App">
        <div className="filters row between">
          <input type="text" className="input search" placeholder="Search..." onKeyDown={(e) => this.handleEnter(e)} onBlur={(e) => this.handleBlur(e)} />
          <div className="select is-black">
            <select name="sortBy" className="sort " value={sortBy} onChange={({ target: { value } }) => this.handleChange(value)}>
              <option value="">Sort By:</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
        </div>
          {
            loading || !people.length ? (
              <Placeholder loading={loading} />
            ) : (
              <ul className="People">
                {
                  people.map((person, i) => <Person key={i} info={person} species={species[person.species[0]]} />)
                }
              </ul>
            )
          }
      </section>
    );
  }
}

export default connect(state => state)(App);