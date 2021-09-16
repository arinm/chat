import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ChatPage = () => {
	const { name } = useParams();
	const [messages, setMessages] = useState([]);
	const [messageBody, setMessageBody] = useState('');
	const [isConnectionOpen, setConnectionOpen] = useState(false);
	const scrollTarget = useRef(null);
	const wSocket = useRef();

	useEffect(() => {
		wSocket.current = new WebSocket('ws://localhost:8080');
		wSocket.current.onopen = () => {
			console.log('onopen');
			setConnectionOpen(true);
		};
		wSocket.current.onmessage = (ev) => {
			const message = JSON.parse(ev.data);
			setMessages((_messages) => [..._messages, message]);
		};
	}, []);

	const send = () => {
		const regex = new RegExp("^[a-zA-Z]+$");
		if (messageBody === '') return;
		wSocket.current.send(JSON.stringify({ sender: name, body: messageBody }));
		setMessageBody('');
	};

	useEffect(() => {
		if (scrollTarget.current) {
			scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages.length]);

	return (
		<div className='chat-wrapper'>
			<div className='chat-view-container'>
				{messages.map((message, i) => (
					<div
						key={i}
						className={'message-container' + (message.sender === name ? ' own-message' : '')}>
						<div className='message-header'>
							<h4 className='message-sender'>{message.sender === name ? 'You' : message.sender}</h4>
						</div>
						<p className='message-body'>{message.body}</p>
					</div>
				))}
				<div ref={scrollTarget} />
			</div>

			<footer className='message-input-container'>
				<p className='chat-as'>“{name}”</p>
				<div className='message-input-container-inner message'>
					<input
						type='text'
						autoFocus
						aria-label='Type message'
						placeholder='Type message'
						value={messageBody}
						pattern="/^[aA-zZ\s]+$/"
						onChange={(e) => setMessageBody(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') send();
						}}
					/>

					<button
						aria-label='Send'
						className='icon-button'
						onClick={send}
						disabled={!isConnectionOpen}>
						>
					</button>
				</div>
			</footer>
		</div>
	);
};
