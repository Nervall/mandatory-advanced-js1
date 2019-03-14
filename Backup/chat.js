import React, { Component } from 'react';
import io from 'socket.io-client';
import List from "./list.js";
import ListItem from "./listItem.js";
import './chat.css';

function scrollBottom(){
  let element = document.querySelector(".chat-box");
      element.scrollTop = element.scrollHeight;
}

class Chat extends Component {
	constructor(props) {
    super(props); 
			this.state = { 
				messages: [ ],
				text : 'Test',
			};
	}  


  componentDidMount() {
		this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('messages', (data) => {
			this.setState({messages: data}, scrollBottom)
      console.log(this.state.messages)
    });   
    this.socket.on('new_message', (data) => {
      this.setState({messages: [...this.state.messages, data]}, scrollBottom)
			//console.log(this.state.messages)
		}); 
} 

componentWillUnmount() {
		this.socket.disconnect();
		this.socket = null;
}


addMessage = () => {
	this.socket.emit('message', {
		username: this.props.user,
		content: this.state.text
	 }, (response) => {
			 console.log(response);
			 if(response.status === 'success'){
				this.setState({messages: [...this.state.messages, response.data.newMessage]}, scrollBottom)
			}
	 });
	 document.querySelector('.write-box').value = '';
	} 

	handleText = (e) => {
		this.setState({ text: e.target.value})
	}

	logOff = () => {
		this.setState({ user: false }) 
	}

	render() {
		return(
			<div className="chat">
				<div className="chat-box"> 
					<List className="chat-list">
					{this.state.messages.map((data) => 
					<ListItem>
						<div className="chat-userName">{data.username}</div> 
						<div className="chat-content">{data.content}</div>
					</ListItem>)}
					</List>
				</div>
				<textarea className="write-box" 
									placeholder="Skriv ditt meddelande här..." 
									minLength="1"
									maxLength="200"
									onChange={ this.handleText }></textarea><br></br>
				<button onClick={ this.addMessage }>Send Message</button>
				<div className="chat-name">Du är inloggad som {this.props.user}
					<button className="chat-logoff" onClick="this.logOff">x</button>
				</div>
			</div>
		)
	}
}

export default Chat;