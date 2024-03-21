class channel_construct {
	invites(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/invites`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	invite(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/invites`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	permissions(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	create(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	delete(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	edit(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/permissions/${message.target_id}`, 'PUT', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/permissions/${message.target_id}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	modify(message) {
		let constructed_message = {
			name: message.name,
			parent_id: message.parent_id,
			topic: message.topic,
			nsfw: message.nsfw,
			rate_limit_per_user: message.rate_limit_per_user,
			position: message.position,
		};

		if (!message.name) delete constructed_message['name'];
		if (!message.parent_id) delete constructed_message['parent_id'];
		if (!message.topic) delete constructed_message['topic'];
		if (!message.nsfw) delete constructed_message['nsfw'];
		if (!message.rate_limit_per_user) delete constructed_message['rate_limit_per_user'];
		if (!message.position) delete constructed_message['position'];

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}`, 'PATCH', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	get(message) {
		return fly.send('', `/api/channels/${message}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	messages(message) {
		let constructed_message = {
			limit: message.limit,
			before: message.before,
			after: message.after,
			around: message.around,
		};

		if (!message.limit) delete constructed_message['limit'];
		if (!message.before) delete constructed_message['before'];
		if (!message.after) delete constructed_message['after'];
		if (!message.around) delete constructed_message['around'];

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	message(message) {
		return fly.send('', `/api/channels/${message.channel}/messages/${message.id}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	crosspost(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/crosspost`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}
}

module.exports = channel_construct;
