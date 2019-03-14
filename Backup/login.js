import React, { Component } from 'react';

	class Login extends Component {
	
	constructor(props) {
	super(props); 
	this.state = { 
		user: '',
	};
	}  

	onChange = (e) => {
		this.setState({user: e.target.value})
	}
	
	render() {
			return(
			<div className="login">
					<p>Please enter a username to start chat</p>
					<form>
					<input type="text" onChange={ this.onChange }></input>
					<button onClick={() => {this.props.checkUser(this.state.user)}}>Start chat</button>
					</form>
			</div>
			)
	}
}

export default Login;