import React, { Component } from 'react';
import './App.css';

class Login extends Component {
	
	render() {
			return (
			<div className="login-wrapper">
			<h1 id="chat-header">The world gr8test&#169; chat</h1>
			<div className="login">
					<p id="login-text">Please enter a username to start chat</p>
					<form>
						<input id="login-input" type="text" minLength="1" onChange={ this.props.onChange } ></input>
						<button id="login-button" onClick={this.props.checkUser} autoComplete="off">Start chat</button>
					</form>
					<p className="login-message">{ this.props.message } </p>
			</div>
			</div>
			)
	}
}

export default Login;