//config.jsbeautify_args = {"-r", "-q", "-t", "-p", "-k", "-a", "-b preserve-inline"}

message
	.send({
		content: message,
		channel: channel_id,
		components: [components],
		embeds: [embeds],
		tts: boolean,
		message_reference: reference_id,
		sticker_ids: sticker,
		files: files,
		flags: flags,
		attachments: attachments,
		payload_json: payload,
		guild: guild_id,
	})
	.then((val) => console.log(val))
	.catch((err) => console.error(err));

message
	.edit({
		id: message_id,
		content: message,
		channel: channel_id,
		components: [components],
		embeds: [embeds],
		tts: boolean,
		message_reference: reference_id,
		sticker_ids: sticker,
		files: files,
		flags: flags,
		attachments: attachments,
		payload_json: payload,
		guild: guild_id,
	})
	.then((val) => console.log(val))
	.catch((err) => console.error(err));

message
	.delete({ channel: channel_id, id: message_id, reason: reason })
	.then((val) => console.log(val))
	.catch((err) => console.error(err));

message
	.bulk_delete({ channel: channel_id, array: array })
	.then((val) => console.log(val))
	.catch((err) => console.error(err));

message
	.interaction({ type: int, content: message }, client)
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

channel
	.get(channel_id)
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

channel
	.message({ channel: channel_id, message: message_id })
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

channel
	.messages({
		channel: channel_id,
		limit: messages_amount,
		before: before_messageid,
		after: after_messageid,
		around: around_messageid,
	})
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

channel
	.modify({
		channel: channel_id,
		name: channel_name,
		position: integer,
		parent_id: channel_parent,
		topic: channel_topic,
		nsfw: boolean,
		rate_limit_per_user: integer,
	})
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

app
	.view({ guild: guild_id, command: command_id })
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

app
	.delete({ guild: guild_id, command: command_id })
	.then((val) => console.log(val))
	.catch((err) => console.log(err));

/*command
|
|__ subcommand
|
|__ subcommand-group
    |
    |__ subcommand*/

bot.presence({ start: time_stamp, name: string_input, type: integer, status: string_status }, client);

new component()
	.button({
		label: unique_label,
		custom_id: unique_custom_id,
		style: style,
		disabled: boolean,
		emoji: { id: id, name: name, animated: boolean },
	})
	.button({
		label: unique_label,
		custom_id: unique_custom_id,
		style: style,
	})
	.button({
		label: unique_label,
		style: style,
		disabled: boolean,
		url: url,
	});

new component()
	.menu({
		custom_id: custom_id,
		place_holder: place_holder,
		min_val: min_val,
		max_val: max_val,
	})
	.entry({
		label: unique_label,
		value: unique_value,
		description: unique_description,
		default: boolean,
		emoji: { name: name, id: id, animated: boolean },
	})
	.entry({
		label: unique_label,
		value: unique_value,
		description: unique_description,
		default: boolean,
		emoji: { name: name, id: id, animated: boolean },
	})
	.entry({
		label: unique_label,
		value: unique_value,
		description: unique_description,
		default: boolean,
		emoji: { name: name, id: id, animated: boolean },
	});

new embed().field(value, value, boolean).description(value).color(hex_value).title(value).url(value).author(value, img_value, url_value).thumbnail(url_value).image(img_value).footer(value, img_value).timestamp();

//old
action.channel_permission({ chan: ID, id: ID, type: INT, deny: BITSTRING, allow: BITSTRING }, client);

action.reg_slash(JSON);

action.reg_slash_guild(JSON, GUILD_ID);

action.view_slash();

action.view_slash(GUILD_ID);

action.del_slash(COMMAND_ID);

action.del_slash_guild(COMMAND_ID, GUILD_ID);

let commands = await JSON.stringify({
	name: 'commands',
	description: 'View, add or delete commands',
	options: [
		{
			name: 'view',
			description: 'View commands',
			type: 3,
			choices: [
				{
					name: 'Global commands',
					value: 'global_commands',
				},
				{
					name: 'Guild commands',
					value: 'guild_commands',
				},
			],
		},
		{
			name: 'enable',
			description: 'Enable commands',
			type: 3,
			choices: [
				{
					name: 'Administrative commands',
					value: 'administrative_commands',
				},
				{
					name: 'Music commands',
					value: 'music_commands',
				},
				{
					name: 'Support commands',
					value: 'support_commands',
				},
				{
					name: 'General commands',
					value: 'general_commands',
				},
			],
		},
		{
			name: 'disable',
			description: 'Disable commands',
			type: 3,
			choices: [
				{
					name: 'Administrative commands',
					value: 'administrative_commands',
				},
				{
					name: 'Music commands',
					value: 'music_commands',
				},
				{
					name: 'Support commands',
					value: 'support_commands',
				},
				{
					name: 'General commands',
					value: 'general_commands',
				},
			],
		},
	],
}); //slash command

let json2 = JSON.stringify({ name: 'High Five', type: 2 }); //user command

let json3 = JSON.stringify({ name: 'High Five', type: 3 }); //message command

/*
Primary	1	blurple	custom_id
Secondary	2	grey	custom_id
Success	3	green	custom_id
Danger	4	red	custom_id
Link	5	grey, navigates to a URL	url


CHAT_INPUT	1	Slash commands; a text-based command that shows up when a user types /
USER	2	A UI-based command that shows up when you right click or tap on a user
MESSAGE	3	A UI-based command that shows up when you right click or tap on a message

SUB_COMMAND	1
SUB_COMMAND_GROUP	2
STRING	3
INTEGER	4	Any integer between -2^53 and 2^53
BOOLEAN	5
USER	6
CHANNEL	7	Includes all channel types + categories
ROLE	8
MENTIONABLE	9	Includes users and roles
NUMBER	10	Any double between -2^53 and 2^53

0	Game	Playing {name}	"Playing Rocket League"
1	Streaming	Streaming {details}	"Streaming Rocket League"
2	Listening	Listening to {name}	"Listening to Spotify"
3	Watching	Watching {name}	"Watching YouTube Together"
4	Custom	{emoji} {name}	":smiley: I am cool"
5	Competing	Competing in {name}	"Competing in Arena World Champions"

online	Online
dnd	Do Not Disturb
idle	AFK
invisible	Invisible and shown as offline
offline	Offline

0	Dispatch	Receive	An event was dispatched.
1	Heartbeat	Send/Receive	Fired periodically by the client to keep the connection alive.
2	Identify	Send	Starts a new session during the initial handshake.
3	Presence Update	Send	Update the client's presence.
4	Voice State Update	Send	Used to join/leave or move between voice channels.
6	Resume	Send	Resume a previous session that was disconnected.
7	Reconnect	Receive	You should attempt to reconnect and resume immediately.
8	Request Guild Members	Send	Request information about offline guild members in a large guild.
9	Invalid Session	Receive	The session has been invalidated. You should reconnect and identify/resume accordingly.
10	Hello	Receive	Sent immediately after connecting, contains the heartbeat_interval to use.
11	Heartbeat ACK	Receive	Sent in response to receiving a heartbeat to acknowledge that it has been received.
*/
