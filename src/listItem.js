import React, { Component } from 'react';

class TabelItem extends Component {
  render() {
    return (
      <li className="listItem"> {this.props.children}
      </li>
    );
  }
}

export default TabelItem;
