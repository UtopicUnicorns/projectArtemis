class bot_construct {
	presence(info, client) {
		this.input = {
			since: info.start,
			activities: [
				{
					name: info.name,
					type: info.type,
				},
			],
			status: info.status,
			afk: false,
		};

		this.presence_update = {
			op: 3,
			d: this.input,
		};

		client.socket.send(JSON.stringify(this.presence_update));
	}
}

module.exports = bot_construct;
