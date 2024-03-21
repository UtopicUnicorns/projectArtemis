class message_construct {
	image(message) {
		let constructed_message = {
			content: "Hi all",
			attachments: [{
				id: 0,
				description: "Image of a cute little cat",
				filename: "pic.png",
			}],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: "Click me!",
							style: 1,
							custom_id: "click_one"
                }
            ]

        }
    ],
			embeds: [
				{
					type: "rich",
					title: `no`,
					description: `yes`,
					color: 0x00FFFF,
					image: {
						url: 'attachment://pic.png',
					},
    }
  ]
		};

		let convertJSON = JSON.stringify(constructed_message);

		let promise = new Promise((resolve, reject) => {
			let imageArray = [];

			imageArray.push(fs.readFileSync('pic.png'));
			imageArray.push(fs.readFileSync('rick.gif'));

			resolve(imageArray);
		});

		return promise.then((x) => {
			const fields = {
				payload_json: convertJSON,

				'files[0]': {
					name: 'pic.png',
					type: 'image/png',
					data: x[0],
				},
				
	
			};

			const boundary = fd.generateBoundary();
			const header = {
				'Content-Type': `multipart/form-data; boundary=${boundary}`
			};
			const body = fd(fields, boundary);

			let split = body.split("IMAGEBUFFER");

			console.log(split);
			let split1 = Buffer.from(x[0]);
			let split2 = Buffer.from(split[0]);
			let split3 = Buffer.from(split[1]);
			let finalArray = [split2, split1, split3];
			console.log(finalArray);
			let newBuffer = Buffer.concat(finalArray);


			return fly.send(newBuffer,
				`/api/channels/${message.channel}/messages`,
				'POST',
				'discord.com',
				443, {
					'Content-Type': `multipart/form-data; boundary=${boundary}`,
					Authorization: `Bot ${token}`,
				}
			);
		});
	}

	send(message) {
		let constructed_message = {
			content: message.content,
			components: [message.components],
			embeds: [message.embeds],
			tts: message.tts,
			message_reference: { message_id: message.reference, channel_id: message.channel, guild_id: message.guild_id, fail_if_not_exists: false },
			sticker_ids: message.sticker,
			files: message.files,
			flags: message.flags,
			attachments: message.attachments,
			payload_json: message.payload,
			allowed_mentions: {
				parse: [],
			},
		};

		if (!message.embeds) delete constructed_message['embeds'];
		if (!message.components) delete constructed_message['components'];
		if (!message.content) delete constructed_message['content'];
		if (!message.tts) delete constructed_message['tts'];
		if (!message.reference) delete constructed_message['message_reference'];
		if (!message.flags) delete constructed_message['flags'];
		if (!message.sticker) delete constructed_message['sticker_ids'];
		if (!message.files) delete constructed_message['files'];
		if (!message.attachments) delete constructed_message['attachments'];
		if (!message.payload) delete constructed_message['payload_json'];

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	edit(message) {
		let constructed_message = {
			content: message.content,
			components: [message.components],
			embeds: [message.embeds],
			tts: message.tts,
			message_reference: message.reference,
			sticker_ids: message.sticker,
			files: message.files,
			flags: message.flags,
			attachments: message.attachments,
			payload_json: message.payload,
			allowed_mentions: {
				parse: [],
			},
		};

		if (!message.embeds) delete constructed_message['embeds'];
		if (!message.components) delete constructed_message['components'];
		if (!message.content) delete constructed_message['content'];
		if (!message.tts) delete constructed_message['tts'];
		if (!message.reference) delete constructed_message['message_reference'];
		if (!message.flags) delete constructed_message['flags'];
		if (!message.sticker) delete constructed_message['sticker_ids'];
		if (!message.files) delete constructed_message['files'];
		if (!message.attachments) delete constructed_message['attachments'];
		if (!message.payload) delete constructed_message['payload_json'];

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}`, 'PATCH', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	react(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/reactions/${message.emoji}/@me`, 'PUT', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	react_delete_self(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/reactions/${message.emoji}/@me`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	react_delete(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/reactions/${message.emoji}/${message.user}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	react_delete_all(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/reactions`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	react_delete_emoji(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/reactions/${message.emoji}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	reactions(message) {
		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}/reactions/${message.emoji}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	delete(message) {
		let constructed_message = {
			channel: message.channel,
			id: message.id,
			reason: message.reason,
		};

		if (!message.reason) delete constructed_message['reason'];
		if (!message.channel) delete constructed_message['channel'];
		if (!message.id) delete constructed_message['id'];

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/${message.id}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	bulk_delete(message) {
		let constructed_message = {
			messages: message.array,
		};

		return fly.send(JSON.stringify(constructed_message), `/api/channels/${message.channel}/messages/bulk-delete`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}

	interaction(reply, message) {
		let constructed_message = {
			type: reply.type,
			data: {
				content: reply.content,
				components: [reply.components],
				embeds: [reply.embeds],
				tts: reply.tts,
				message_reference: reply.reference,
				sticker_ids: reply.sticker,
				files: reply.files,
				flags: reply.flags,
				attachments: reply.attachments,
				payload_json: reply.payload,
				allowed_mentions: {
					parse: [],
				},
			},
		};

		if (!reply.embeds) delete constructed_message.data['embeds'];
		if (!reply.components) delete constructed_message.data['components'];
		if (!reply.content) delete constructed_message.data['content'];
		if (!reply.tts) delete constructed_message.data['tts'];
		if (!reply.reference) delete constructed_message.data['message_reference'];
		if (!reply.flags) delete constructed_message.data['flags'];
		if (!reply.sticker) delete constructed_message.data['sticker_ids'];
		if (!reply.files) delete constructed_message.data['files'];
		if (!reply.attachments) delete constructed_message.data['attachments'];
		if (!reply.payload) delete constructed_message.data['payload_json'];
		if (!reply.type) delete constructed_message['type'];

		console.log(constructed_message);

		return fly.send(JSON.stringify(constructed_message), `/api/interactions/${message.message.d.id}/${message.message.d.token}/callback`, 'POST', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
	}
}

module.exports = message_construct;
