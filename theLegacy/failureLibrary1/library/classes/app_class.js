class app_construct {
	delete(message) {
		if (message && message.guild) return fly.send('', `/api/applications/${application_id}/guilds/${message.guild}/commands/${message.command}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });

		return fly.send('', `/api/applications/${application_id}/commands/${message.command}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	create(message) {
		let constructed_message = {
			name: message.name,
			type: 1,
			description: 'Send a random adorable animal photo',
			options: [
				{
					name: 'animal',
					description: 'The type of animal',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Dog',
							value: 'animal_dog',
						},
						{
							name: 'Bird',
							value: 'animal_bird',
						},
						{
							name: 'Snake',
							value: 'animal_snake',
						},
					],
				},
				{
					name: 'only_smol',
					description: 'Whether to show only baby animals',
					type: 5,
					required: false,
				},
			],
		};

		return fly.send(JSON.stringify(constructed_message), `/api/applications/${application_id}/commands`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	view(message) {
		if (message && message.guild && message.command) return fly.send('', `/api/applications/${application_id}/guilds/${message.guild}/commands/${message.command}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });

		if (message && message.guild) return fly.send('', `/api/applications/${application_id}/guilds/${message.guild}/commands`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });

		if (message && message.command) return fly.send('', `/api/applications/${application_id}/commands/${message.command}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });

		return fly.send('', `/api/applications/${application_id}/commands`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	permissions(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/applications/${application_id}/commands`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}
}

module.exports = app_construct;
