import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <ul className="list"> {this.props.children}
      </ul>
    );
  }
}

export default List;
