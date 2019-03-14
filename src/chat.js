import React, { Component } from 'react';
import io from 'socket.io-client';
import List from "./list.js";
import ListItem from "./listItem.js";
import './App.css';
import Linkify from 'linkifyjs/react';
import {emojify} from 'react-emojione';

function scrollBottom(){
  let element = document.querySelector(".chat-box");
      element.scrollTop = element.scrollHeight;
}

function convertUrl(content) {
const options = {/* … */};
const eOptions = {style: {height: 18, width: 18, position: 'relative', top: '-1px'}}
const emoj = emojify(content, eOptions);
return <Linkify tagName="p" options={options}>{emoj}</Linkify>;
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
    });   
    this.socket.on('new_message', (data) => {
      this.setState({messages: [...this.state.messages, data]}, scrollBottom)
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
					if (response.status === 'success'){
					this.setState({messages: [...this.state.messages, response.data.newMessage]}, scrollBottom)
				}
		});
		document.querySelector('.chat-message-textarea').value = '';
	} 

	handleText = (e) => {
		this.setState({ text: e.target.value})
	}

	enterKey = (e) => {
    if (e.keyCode === 13) {
      this.addMessage();
    }
  }

	render() {
		return(
			<div className="chat">
				<div className="chat-message-wrapper">
					<textarea className="chat-message-textarea" 
										placeholder="Write your message..." 
										minLength="1"
										maxLength="200"
										onChange={ this.handleText }
										onKeyDown= {this.enterKey }>
					</textarea><br></br>
					<button id="chat-button" onClick={ this.addMessage }>Send Message</button>
					<div className="chat-logoff-wrap">
						<span className="chat-logoff-text">Du är inloggad som <b> {this.props.user} </b></span>
						<button className="chat-logoff-button" title="logout" onClick={this.props.logOff}><p id="chat-logoff-x">x</p></button>
					</div>
				</div>
				<div className="chat-wrapper">
					<h2 id="chat-header">The world gr8test&#169; chat</h2>
					<div className="chat-box"> 
						<List className="chat-list">
						{this.state.messages.map((data) => 
						<ListItem key={ data.id }>
						<div className="chat-content">
							<div className="chat-userName">{ data.username }</div> 
							<div className="chat-text">{ convertUrl(data.content) }</div>
						</div>
						</ListItem>)}
						</List>
					</div>
						<hr></hr>
				</div>
			</div>
		)
	}
}

export default Chat;