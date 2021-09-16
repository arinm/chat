const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 },
	() => console.log('sv port 8080!'),
);

const users = new Set();

const sendMessage = (message) => {
	for (const user of users) {
		user.socket.send(JSON.stringify(message));
	}
};

server.on('connection', (socket) => {
	console.log('New user');

	const userRef = {
		socket: socket,
	};
	users.add(userRef);

	socket.on('message', (message) => {
		try {
			const parsedMessage = JSON.parse(message);

			if (
				typeof parsedMessage.sender !== 'string' ||
				typeof parsedMessage.body !== 'string'
			) {
				console.error('Invalid message received!', message);
				return;
			}

			const verifiedMessage = {
				sender: parsedMessage.sender,
				body: parsedMessage.body,
			};

			sendMessage(verifiedMessage);
		} catch (error) {
			console.error('Error parsing message!', error);
		}
	});
});
