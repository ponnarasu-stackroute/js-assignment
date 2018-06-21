function sendMessage(event, socket) {
	event.preventDefault();
	const channel = document.getElementById("channel").value;
	const message = document.getElementById("message").value;
	const username = document.getElementById('username').value;
	const messageContainer = document.createElement('div');
	messageContainer.setAttribute("class", "col-12")
	messageContainer.innerHTML = `
		<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">Me : ${message}</p>
			</div>
		</div>`;
	const list = document.getElementById("chatContainer");
	list.insertBefore(messageContainer, list.childNodes[0]);
	socket.emit("message", { "channel": channel, "message": message, "username": username });
}
function joinChannel(event, socket) {
	event.preventDefault();
	let channel = document.getElementById("newchannel").value;
	socket.emit("joinChannel", { "channel": channel });
}
function leaveChannel(event, socket) {
	event.preventDefault();
	const channel = document.getElementById("newchannel").value;
	socket.emit("leaveChannel", { "channel": channel });
}
function onWelcomeMessageReceived(welcomeMessage) {
	const welcomeContainer = document.createElement('div');
	welcomeContainer.setAttribute("class", "col-12")
	welcomeContainer.innerHTML = `
	<div class="card received-message">
		<div class="card-body">
			<p class="card-text">System : ${welcomeMessage}</p>
		</div>`;
	document.getElementById('chatContainer').innerHTML += welcomeContainer.outerHTML;
}
function onNewMessageReceived(message) {
	var messageContainer = document.createElement('div');
	messageContainer.setAttribute("class", "col-12")
	messageContainer.innerHTML = `
	<div class="card received-message">
	<div class="card-body">
		<p class="card-text">${message.username} : ${message.message}</p>
	</div>`;
	const list = document.getElementById("chatContainer");
	list.insertBefore(messageContainer, list.childNodes[0]);
}
function onAddedToNewChannelReceived(data) {
	const alertContainer = document.getElementById("alertContainer");
	alertContainer.style.display = 'block';
	alertContainer.innerHTML += `
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		You are added to <strong>${data.channel}</strong> successfully!
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>`
	document.getElementById('channelsList').innerHTML += `<option value=${data.channel}>`;
}
function onRemovedFromChannelReceived(data) {
	const channelList = document.getElementById("channelsList");
	const options = channelList.children;
	const channelToBeRemoved = options.findIndex(option => option.value == data.channel);
	channelList.removeChild(channelToBeRemoved);
}
module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};
// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution