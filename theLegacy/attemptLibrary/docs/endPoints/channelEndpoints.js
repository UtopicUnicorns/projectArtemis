/*	Get information about the channel you specify.	*/
channel
	.chanGet({	channel: 'channelId'	});

/*	name is the channel name and may be between 1 and 100 characters.
		position is the left hand listing position.
		nsfw is to select if the channel is safe for work or not.
		topic is the channel topic and may be between 0 and 1024 characters.
		rate_limit_per_user is the length between messages send in seconds may be between 0 and 21600.
		permission_overwrites refer to permissionObject for more info.
		type is 0 for text channel or 5 for news channel.
		parent_id is to select which category this channel falls under, you use the category ID.
		default_auto_archive_duration is the standard archive time for new threads within the channel 
			may be 60, 1440, 4320 or 10080.	*/
channel
	.chanEdit({ channel: 'channelId',
							name: 'channelName',
							type: INTEGER,
							position: INTEGER,
							topic: 'Channel Topic Text',
							nsfw: BOOLEAN,
							rate_limit_per_user: INTEGER,
							permission_overwrites: permissionObject,
							parent_id: 'categoryId',
							default_auto_archive_duration: INTEGER });

/*	name is the channel name and may be between 1 and 100 characters.
		position is the left hand listing position.
		nsfw is to select if the channel is safe for work or not.
		bitrate is the quality of the audio ranges from 8000 up to 384000.
		user_limit is the max amount of users that may be in a channel ranges from 1 to 99.
		permission_overwrites refer to permissionObject for more info.
		parent_id is to select which category this channel falls under, you use the category ID.
		video_quality_mode is 0 for automatic and 1 for highest quality.	*/
channel
	.voiceChanEdit({	channel: 'channelId',
										name: 'channelName',
										position: INTEGER,
										nsfw: BOOLEAN,
										bitrate: INTEGER,
										user_limit: INTEGER,
										permission_overwrites: permissionObject,
										parent_id: 'categoryId',
										video_quality_mode: INTEGER	});

/*	name is the channel name and may be between 1 and 100 characters.
		icon is just an image, you can write down the path to your icon.	*/
channel
	.groupDMEdit({	channel: 'channelId',
									name: 'channelName',
									icon: 'fileName.ext'	});			

/*	name is the channel name and may be between 1 and 100 characters.
		archived is a boolean that tells us if the thread is archived or not.
		auto_archive_duration means when the thread will auto archive, options are 60, 1440, 4320 and 10080.
		rate_limit_per_user is the length between messages send in seconds may be between 0 and 21600.
		permission_overwrites refer to permissionObject for more info.
		invitable is a boolean that decides if users can be invited or not to the thread.
		flags can only be used on a forum thread channel, this basically allows you to pin the thread. (1 << 1 = 2)	*/
channel
	.threadEdit({ channel: 'channelId',
								name: 'threadName',
								archived: BOOLEAN,
								auto_archive_duration: INTEGER,
								locked: BOOLEAN,
								invitable: BOOLEAN,
								rate_limit_per_user: INTEGER,
								flags: 2 });			

/*	Delete a channel using the channel ID.	*/
channel
	.chanDelete({	channel: 'channelId'	});			

/*	All entries but channel can be ommited.
		around means specified message limit around the messageId.
		before means specified message limit before the messageId.
		after means specified message limit after the messageId.
		limit is a number between 1 and 100.	*/
channel
	.chanGetMessages({	channel: 'channelId',
											around: 'messageId',
											before: 'messageId',
											after: 'messageId',
											limit: INTEGER	});			

/*	Get the message object by messageId.	*/
channel
	.chanGetMessage({ channel: 'channelId',
										message: 'messageId'	});			

/*	Either one or more, but not zero of the following entries need to be specified: content, embeds, attachments.
		content is a string which may be up to 2000 characters.
		tts if true means it's text to speech.
		reference needs both a messageId and guildId.
		sticker is an array of stickerId's.
		components refer to componentObject and componentObject2.
		embeds refer to embedObject.
		attachments refer to attachmentObject.
		*/
channel
	.msgSend({	content: 'Message Content',
							channel: 'channelId',
							components: componentObject,
							embeds: embedObject,
							tts: BOOLEAN,
							reference: {message_id: 'messageId', guild_id: 'guildId'},
							sticker: ['stickerId'],
							attachments: attachmentObject	});			

/*	Crosspost a message in a newschannel to servers that follow the channel.	*/
channel
	.crossPostMsg({ channel: 'channelId',
									message: 'messageId' });			

/*	Emoji can be unicode or name:emojiId.	*/
channel
	.createReaction({ channel: 'channelId',
										message: 'messageId',
										emoji: 'emoji' });			
										
/*	Emoji can be unicode or name:emojiId.	*/
channel
	.deleteSelfReaction({ channel: 'channelId',
												message: 'messageId',
												emoji: 'emoji' });			

/*	Emoji can be unicode or name:emojiId.	*/
channel
	.deleteReaction({ channel: 'channelId',
										message: 'messageId',
										emoji: 'emoji', 
										user: 'userId' });			

/*	Emoji can be unicode or name:emojiId.
		limit is a number between 1 and 100.	*/
channel
	.getReactions({ channel: 'channelId',
									message: 'messageId',
									emoji: 'emoji', 
									limit: INTEGER });			

/*	Delete all reactions on specified messageId.	*/
channel
	.deleteAllReactions({ channel: 'channelId',
												message: 'messageId' });			

/*	Emoji can be unicode or name:emojiId.	*/
channel
	.deleteAllReactionsEmoji({	channel: 'channelId',
															message: 'messageId',
															emoji: 'emoji'	});			

/*	Content may be up to 2000 characters.
		id is the messageId of the message you want to edit, may only be the bot message.
		components refer to componentObject.
		embeds refer to embedObject.
		attachments refer to attachmentObject.	*/
channel
	.msgEdit({	content: 'Message Content',
							id: 'messageId',
							channel: 'channelId',
							components: componentObject,
							embeds: embedObject,
							attachments: attachments	});			

/*	Delete a message by its messageId.	*/
channel
	.msgDelete({	channel: 'channelId',
								message: 'messageId'	});			

/*	Messages expects an array of message ID's	*/
channel
	.msgBulkDelete({	channel: 'channelId',
										messages: []	});			

/*	Target is either a userId or a roleId,
		type expects either 0 for role or 1 for member.
		permission_overwrites refer to permissionObject.	*/
channel.
	channelPermOverwrite({	channel: 'channelId',
													target: 'userId or roleId',
													permission_overwrites: permissionObject,
													type: INTEGER	});				

/*	Get all channel invites with metadata.	*/
channel.
	getChanInvites({	channel: 'channelId'	});				

/*	MaxAge may be 0 for never and up to 86400(24 hours).
		maxUses may be between 0 for unlimited and up to 100.
		temp if true will give the invitee a temporary membership.
		unique if true will try to create an invite that's unique and easy to monitor.
		targetType if invite is a voice channel set to 1 for a user stream or 2 for an embedded application.
		targetUserId if targetType is 1 must be the user streaming channel.
		targetAppId if targetType is 2 must be an application with the embedded flag.	*/
channel.
	createChanInvite({	channel: 'channelId',
											maxAge: INTEGER,
											maxUses: INTEGER,
											temp: BOOLEAN,
											unique: BOOLEAN,
											targetType: INTEGER,
											targetUserId: 'userId',
											targetAppId: 'applicationId'	});				

/*	Delete all active channel permissions for specified iserId.	*/
channel.
	deleteChannelPerm({ channel: 'channelId',
											user: 'userId' });				

/*	Follow a news channel.	*/
channel.
	followNewsChannel({ channel: 'channelId',
											followId: 'idOfChannelToFollow' });				

/*	Simulate bot typing event.	*/
channel.
	triggerTyping({	channel: 'channelId'	});				

/*	Get all pinned messages in a channel.	*/
channel.
	getPinnedMessages({	channel: 'channelId'	});				

/*	Pin a message.	*/
channel.
	pinMessage({	channel: 'channelId',
								message: 'messageId'	});				

/*	Unpin a message.	*/
channel.
	unpinMessage({	channel: 'channelId',
									message: 'messageId'	});				

/*	Add an user to a groupDM.
		nick may be set for target nickname.
		access_token is the token the user information gives back when user has given application access to gdm.join.	*/
channel.
	groupDmAddUser({	channel: 'channelId',
										user: 'userId',
										nick: 'userNickname',
										access_token: 'tokenId'	});				

/*	Kick/remove user from groupDM.	*/
channel.
	groupDmRemoveUser({ channel: 'channelId',
											user: 'userId' });		

/*	Create a thread from specified message.
		message must be the messageId of where you want to create the thread.
		name is the name of the thread, may be up to 100 characters.
		auto_archive_duration can be 60, 1440, 4320 or 10080.
		rate_limit_per_user is the interval at which members can send messages can be from 0 up to 21600.	*/
channel.
	createThreadAtMsg({ channel: 'channelId',
											message: 'messageId',
											name: 'threadName',
											auto_archive_duration: INTEGER,
											rate_limit_per_user: INTEGER });				

/*	Create a thread without a specified message.
		name is the name of the thread, may be up to 100 characters.
		auto_archive_duration can be 60, 1440, 4320 or 10080.
		rate_limit_per_user is the interval at which members can send messages can be from 0 up to 21600.
		invitable if true can let non moderators invite users to thread.
		type is the type of thread to create: 10 for news thread, 11 for public thread and 12 for private thread.	*/
channel.
	createThread({	channel: 'channelId',
									name: 'threadName',
									auto_archive_duration: INTEGER,
									rate_limit_per_user: INTEGER,
									type: INTEGER,
									invitable: BOOLEAN	});				

/*	Create a thread in a forum channel.
		name is the name of the thread, may be up to 100 characters.
		auto_archive_duration can be 60, 1440, 4320 or 10080.
		channel must be the channelId to a forum channel.
		message refer to messageObject.	*/
channel.
	createForumThread({ channel: 'channelId',
											name: 'threadName',
											auto_archive_duration: INTEGER,
											rate_limit_per_user: INTEGER,
											message: messageObject });				

/*	Add self to thread.	*/
channel.
	joinThread({	channel: 'channelId'	});				

/*	Add a specified user to a thread.	*/
channel.
	userJoinThread({	channel: 'channelId',
										user: 'userId'	});				

/*	Leave a thread.	*/
channel.
	leaveThread({	channel: 'channelId'	});				

/*	Remove/kick a specified user from a thread.	*/
channel.
	userLeaveThread({ channel: 'channelId',
										user: 'userId' });				

/*	Get user information within a thread.	*/
channel.
	getThreadMember({ channel: 'channelId',
										user: 'userId' });				

/*	List all members within a thread.	*/
channel.
	listThreadMembers({	channel: 'channelId'	});				

/*	Returns a list of archived public threads.
		before expects a timestamp.
		limit is an optional number of threads to return.	*/
channel.
	listPublicArchivedThreads({ channel: 'channelId',
															before: ISO8601Timestamp,
															limit: INTEGER });				

/*	Returns a list of archived private threads.
		before expects a timestamp.
		limit is an optional number of threads to return.	*/
channel.
	listPrivateArchivedThreads({	channel: 'channelId',
																before: ISO8601Timestamp,
																limit: INTEGER	});			

/*	Returns a list of archived joined private threads.
		before expects a timestamp.
		limit is an optional number of threads to return.	*/
channel.
	listJoinedPrivateArchivedThreads({	channel: 'channelId',
																			before: ISO8601Timestamp,
																			limit: INTEGER	});		

/*	Additional information	*/

let messageObject = { content: 'Message Content',
											components: componentObject,
											embeds: embedObject,
											sticker: ['stickerId'],
											attachments: attachmentObject };

/*	The object itself is an array, in the array you place json structures.
		the ID entry is either a roleId or userId, then the type must correspond 0 for role and 1 for member.
		the allow and deny entries both are arrays, within them you put the permissions you want to allow or deny.	
		refer to permissionArray for permission allow/deny possibilities.	*/
let permissionObject = [
												{ id: 'roleId',
													type: 0,
													allow: [],
													deny: [] },
												{ id: 'userId',
													type: 1,
													allow: [],
													deny: [] }
											 ];

let permissionArray = [ 'createInstantInvite', 'kickMembers', 'banMembers', 'administrator', 'manageChannels', 
												'manageGuild', 'addReactions', 'viewAuditLog', 'prioritySpeaker', 'stream', 'viewChannel', 
												'sendMessages', 'sendTtsMessages', 'manageMessages', 'embedLinks', 'attachFiles', 'readMessageHistory', 
												'mentionEveryone', 'useExternalEmojis', 'viewGuildInsights', 'connect', 'speak', 'muteMembers', 
												'deafenMembers', 'moveMembers', 'useVad', 'changeNickname', 'manageNicknames', 'manageRoles', 
												'manageWebhooks', 'manageEmojisAndStickers', 'useApplicationCommands', 'requestToSpeak', 
												'manageEvents', 'manageThreads', 'createPublicThreads', 'createPrivateThreads', 'useExternalStickers', 
												'sendMessagesInThreads', 'useEmbeddedActivities', 'moderateMembers' ];

/*	the attachment object is an array and in the array each entry is a JSON structure.
		file is the file you want to send, make sure to specify the path properly, accepts full as wel as partial paths.
		description is somewhat like an alt for images.
		filename is what Discord will display as its filename, use the same extention as your file though.	
		using something like attachment://filename in an embed image/icon field will display the uploaded image.	*/
let attachmentObject = [
												{	file: 'fileName.ext',
													description: 'first attachment',
													filename: 'fileName.ext'	},
												{	file: 'fileName.ext',
													description: 'second attachment',
													filename: 'fileName.ext'	}
											 ];

let componentObject = new component()
													.menu({ custom_id: 'UniqueID', 
																	place_holder: 'Unique', 
																	min_val: 1, 
																	max_val: 3 })
													.entry({	label: 'Unique Label', 
																		value: 'UniqueVAL', 
																		description: 'Unique Description', 
																		default: true, 
																		emoji: { id: "EmojiID" } })
													.entry({	label: 'Unique Label', 
																		value: 'UniqueVAL', 
																		description: 'Unique Description', 
																		default: false })
													.entry({	label: 'Unique Label', 
																		value: 'UniqueVAL', 
																		description: 'Unique Description', 
																		default: false })
													.output;

let componentObject2 = new component()
														.button({ label: 'Unique Label', 
																			custom_id: 'UniqueID', 
																			style: 1, 
																			disabled: true })
														.button({ label: 'Unique Label', 
																			custom_id: 'UniqueID', 
																			style: 2 })
														.button({ label: 'Unique Label', 
																			custom_id: 'UniqueID', 
																			style: 3 })
														.button({ label: 'Unique Label', 
																			custom_id: 'UniqueID', 
																			style: 4, 
																			emoji: { id: 'EmojiID' } })
														.button({ label: 'Unique Label', 
																			style: 5, 
																			url: 'https://artemis.rest' })
														.output;

let embedObject = new embed()
											.field('Field Title', 'Field Content', true)
											.description('Description')
											.color('FF0000')
											.title('Title')
											.url('Website Entry')
											.author('Name Entry', 'Icon Entry', 'Website Entry')
											.thumbnail('Image Entry')
											.image('Image Entry')
											.footer('Footer Content', 'Icon Entry')
											.timestamp()
											.output;
