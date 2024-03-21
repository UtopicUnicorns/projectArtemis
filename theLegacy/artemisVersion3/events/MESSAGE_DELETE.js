////////////////////////////////////
//When a message is deleted
//this module gets triggered
////////////////////////////////////
module.exports = {
	eventTrigger: async function (c, client, CONFIG, npm) {
		try {
			const msg = c.d;
			const fetchMsg = await client.channels.cache
				.get(msg.channel_id)
				.messages.fetch(msg.id);

			const data = {
				user: fetchMsg.author,
				message: fetchMsg.content,
				time: fetchMsg.createdTimestamp,
				channel: msg.channel_id,
			};

			const gld = await client.guilds.cache.get(msg.guild_id);
			if (!gld) return;

			let veriCall = await getGuild.get(msg.guild_id);
			if (veriCall) {
				if (veriCall.verificationChannel) {
					if (veriCall.verificationChannel == msg.channel_id) return;
				}
			}

			let embed2 = new Discord.MessageEmbed()
				.setTitle("Message deleted")
				.setAuthor(
					`${data.user.username}#${data.user.discriminator}`,
					`https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}`
				)
				.setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
				.setColor("RED")
				.setDescription(`Deleted message:\n||${data.message.slice(0, 1000)}||`)
				.addField("In channel: ", `<#${data.channel}>`)
				.setFooter(
					`Deleted on ${moment(data.time).format(
            "dddd, MMMM Do YYYY, HH:mm:ss"
          )}`,
					`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`
				);

			try {
				let reactChan = await getGuild.get(msg.guild_id);
				if (reactChan) {
					if (msg.channel_id !== reactChan.reactionChannel) {
						if ((await getLogs.get(msg.guild_id).msgdelete) == "ON")
							return await client.channels.cache
								.get(await getGuild.get(msg.guild_id).logsChannel)
								.send({ embed: embed2 });
					}
				}
			} catch (err) {
				console.log("");
			}

		} catch (error) {
			console.log("");
		}

		const msg = c.d;

		const gld = await client.guilds.cache.get(msg.guild_id);
		if (!gld) return;

		let veriCall = await getGuild.get(msg.guild_id);
		if (veriCall) {
			if (veriCall.verificationChannel) {
				if (veriCall.verificationChannel == msg.channel_id) return;
			}
		}

		let embed = new Discord.MessageEmbed()
			.setColor("DARK_ORANGE")
			.setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
			.setDescription("Message deleted")
			.addField("message ID:", `${msg.id}`)
			.addField("In Channel:", `<#${msg.channel_id}>`)
			.setTimestamp();

		try {
			let reactChan = await getGuild.get(msg.guild_id);
			if (reactChan) {
				if (msg.channel_id !== reactChan.reactionChannel) {
					if ((await getLogs.get(msg.guild_id).msgdelete) == "ON")
						await client.channels.cache
						.get(await getGuild.get(msg.guild_id).logsChannel)
						.send({ embed });
				}
			}
		} catch (err) {
			console.log("");
		}
	},
};
