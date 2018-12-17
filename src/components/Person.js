import React from 'react';
import '../styles/Person.scss';

export default class Person extends React.Component {
  renderIcon(species) {
    const unknown = 'question-circle-o';
    if (species) {
      switch(species.toLowerCase()) {
        case 'human':
          return 'user-circle-o';
        case 'droid':
          return 'android';
        default:
          return unknown;
      }
    }
    return unknown;
  }
  render() {
    const { info, species } = this.props;
    return (
      <li className="person columns is-mobile">
        <div className="column is-one-fifth">
          <i className={`fa fa-${this.renderIcon(species)}`}/>
        </div>
        <div className="column">
          <div className="row header">
            {info.name}
          </div>
          <div className="row info">
            Height: {info.height} <i className="fa fa-square" /> Mass: {info.mass} <i className="fa fa-square" /> Gender: {info.gender.toUpperCase()}
          </div>
        </div>
      </li>
    )
  }
};