import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const goToChat = () => {
		name !== '' ? navigate(`/chat/${name}`) : null;
	};

	return (
		<div className='chat-wrapper'>
			<p>Salutare</p>
			<p id='name-label' className='chat-subhead'>
				Enter your name
			</p>
			<div className='chat-section'>
				<input
					type='text'
					aria-labelledby='name-label'
					placeholder='Your name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='chat-section'>
				<button onClick={goToChat}>Go to Chat</button>
			</div>
		</div>
	);
};
