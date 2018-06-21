function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (msg) => {
			msg.channels.forEach(channel => {
				socket.join(channel);
			});
			msg.channels.forEach(channel => {
				socket.emit('addedToChannel', { "channel": channel });
			});
			const welcomeMessage = `Welcome ${msg.username} !!`;
			socket.username = msg.username;
			socket.emit('welcomeMessage', welcomeMessage);
			socket.on("joinChannel", data => {
				socket.join(data.channel);
				socket.emit('addedToChannel', data);
			});
			socket.on("leaveChannel", data => {
				socket.leave(data.channel);
				socket.emit("removedFromChannel", data);
			});
		});
		socket.on("message", (msg) => {
			socket.to(msg.channel).emit("newMessage", { username: msg.username, message: msg.message, channel: msg.channel });
		});
	});
}
module.exports = bootstrapSocketServer;