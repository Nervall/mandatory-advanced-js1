import React, { Component } from 'react';
import Chat from './chat.js';
import './App.css';
import Login from './login.js';

class App extends Component {
	constructor(props) {
    super(props); 
    this.state = { 
      loggedIn: false,
      user: '',
      message: '',
    };
  }   

  checkUser = (e) => {
    e.preventDefault();
    const check = this.state.user;
		const regex = /^[a-zåäöA0-9A-ZÅÄÖ_-\s]+$/
		if (check.length <= 12 && check.length >= 1 && check.match(regex)) { 
        this.setState({ loggedIn: true, user: check })
        this.setState({ message: '' });
		} else if (check.length > 12 || check.length === 0) {
				this.setState({ loggedIn: false, user: check })
				this.setState({ message: 'The username must be between 1 and 12 characters long.' });
		} else if (check !== regex) {
				this.setState({ loggedIn: false, user: check })
				this.setState({ message: 'The username can only contain alphanumeric characters and "-", "_" and spaces' });
    }
  }

  onChange = (e) => {
    this.setState({ user: e.target.value })
  }

  logOff = () => {
    this.setState({ loggedIn: false }) 
    this.setState({ user: ''})
  }

  render() {
    if(!this.state.loggedIn) {
      return (
        <div className="App">
        <Login onChange={ this.onChange } checkUser={ this.checkUser } message={ this.state.message}></Login>
        </div>
      )
    } else {
      return ( <Chat user={ this.state.user } logged={ this.state.loggedIn } logOff={ this.logOff }></Chat> )
    }
  }
}

export default App;



