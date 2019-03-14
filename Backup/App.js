import React, { Component } from 'react';
import Login from './login.js';
import Chat from './chat.js';
import './App.css';


class App extends Component {
	constructor(props) {
    super(props); 
    this.state = { 
      logIn: false,
      user: 'Jim',
    };
}   

// var funcName = (params) => params + 2
  checkUser = (user, e) => {
		e.preventDefault();
		const regex = /^[a-zA-Z_-\s]+$/
		if (user.length <= 12 && user.match(regex)) {
      console.log('Good');
      console.log(this.state.user);
			this.setState({ logIn: true, user: user })
		} else {
      console.log('Not Good');
      console.log(this.state.user);
			this.setState({ logIn: false, user: user })
		}
}

  render() {
    return (
      <div className="App"> 
      {this.state.logIn? <Chat user={this.state.user}></Chat> : <Login user={ this.checkUser }></Login>} 
      </div>
    )
  }
}

export default App;

/*
 console.log(this.state.logIn)
    if(!this.state.logIn) {
      return(<Login user={ this.checkUser }></Login>)
    } else {
      return(<Chat user={ this.state.user }></Chat> )
    }


*/


