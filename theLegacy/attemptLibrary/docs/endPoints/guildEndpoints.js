/*	Create a new guild.
		make sure to provide a proper full or partial path for the image.
		verificationLevel refer to verificationLevelChoice.
		defaultMessageNotifications refer to defaultMessageNotificationsOption.
		explicitContentFilter refer to explicitContentFilterChoice.	*/
guild
	.create({ name: 'guildName',
						icon: 'fileName.ext',
						verificationLevel: verificationLevelChoice,
						defaultMessageNotifications: defaultMessageNotificationsOption,
						explicitContentFilter: explicitContentFilterChoice	});				

/*	Get guild information of the provided guildId.
		set count boolean to true to get inaccurate member count.	*/
guild
	.get({	guild: 'guildId',
					count: BOOLEAN	});				

/*	Return the guild preview of provided guildId.	*/
guild
	.preview({	guild: 'guildId'	});				

/*	Edit provided guildId.
		verificationLevel refer to verificationLevelChoice.
		defaultMessageNotifications refer to defaultMessageNotificationsOption.
		explicitContentFilter refer to explicitContentFilterChoice.
		systemChannelFlags refer to systemChannelFlagsArray.
		features refer to featuresArray.
		afkChannelId must be a voice channel.
		afkTimeout is the amount of seconds that have to pass to mark an user AFK and drop to afk channel.
		make sure that for icon, spash, discoverySplash and banner have proper full or partial paths to the images.
		if ownerId is supplied, transfer guild ownership to that new userId.
		preferredLocale is for languages etc: e.g en-US.
		premiumProgressBar if true show boost status near banner spot.	*/
guild
	.edit({ guild: 'guildId',
					name: 'guildName',
					verificationLevel: verificationLevelChoice,
					defaultMessageNotifications: defaultMessageNotificationsOption,
					explicitContentFilter: explicitContentFilterChoice,
					afkChannelId: 'channelId',
					afkTimeout: INTEGER,
					icon: 'fileName.ext',
					ownerId: 'newOwnerId',
					splash: 'fileName.ext',
					discoverySplash: 'fileName.ext',
					banner: 'fileName.ext',
					systemChannelId: 'channelId',
					systemChannelFlags: systemChannelFlagsArray,
					rulesChannelId: 'channelId',
					publicUpdatesChannelId: 'channelId',
					preferredLocale: 'localeString',
					features: featuresArray,
					description: 'guildDescription',
					premiumProgressBar: BOOLEAN });				

/*	Delete specified guildId's guild.	*/
guild
	.delete({	guild: 'guildId'	});				

/*	Get a list of specified guildId channels (not threads).	*/
guild
	.getChannels({	guild: 'guildId'	});				

/*	Create a new channel in specified guildId.
		channelName may be between 1 and 100 characters long.
		type is the type of channel you create, refer to channelTypes and pick one from the array.
		topic may be between 0 and 1024 characters long.
		rateLimitPerUser may be a number between 0 and 21600.
		position is the position number of where to place the channel.
		permissionOverwrite refer to permissionObject.
		parentId means that the channel will be nested under specified parentId.
		nsfw is self explanatory.
		defaultAutoArchiveDuration is either 60, 1440, 4320 or 10080.
		if channelTypes is a voice channel, omit rateLimitPerUser, defaultAutoArchiveDurationand nsfw.
		if channelTypes is NOT a voice channel, omit bitrate, userLimit, rtcRegion and videoQualityMode. 
		if channelTypes is a voice channel, then you can set the bitrate between 8000 up to 384000 or up to 64000 if stage channel.
		if channelTypes is a voice channel, then userLimit may be set.
		if channelTypes is a voice channel, rtcRegion refers to voice region.
		if channelTypes is a voice channel, videoQualityMode refers to videoQualityMode in additional info.
		*/				
guild
	.createChannel({	guild: 'guildId',
										name: 'channelName',
										type: channelTypes,
										topic: 'topicDescription',
										bitrate: INTEGER,
										userLimit: INTEGER,
										rateLimitPerUser: INTEGER,
										position: INTEGER,
										permissionOverwrite: permHere,
										parentId: 'parentCategoryId',
										nsfw: BOOLEAN,
										rtcRegion: 'rtcRegion',
										videoQualityMode: videoQualityMode,
										defaultAutoArchiveDuration: INTEGER});				

/*	Change a channel.
		position refers to the position under a category on the left hand side channel menu.
		lockPermissions if true syncs the permissions to the parent category default permissions.
		parentId if specified allows you to give your channel a new home under another parent category.	*/
guild
	.editChanPosition({ guild: 'guildId',
											id: 'channelId',
											position: INTEGER,
											lockPermissions: BOOLEAN,
											parentId: 'parentCategoryId' });				

/*	Shows all active threads in specified guildId.	*/
guild
	.activeThreads({	guild: 'guildId'	});				

/*	Get information about the specified userId.	*/
guild
	.getMember({	guild: 'guildId',
								member: 'userId'	});				

/*	Return a list of guildMembers.
		limit may be a number between 1 and 1000.
		after refers to from what userId the list should return members.	*/
guild
	.listMembers({	guild: 'guildId',
									limit: INTEGER,
									after: 'userId'	});				

/*	Searches a guild member by using the start of their nickname or username.
		limit refers to the amount of returning users may be between 1 and 1000.	*/
guild
	.searchMembers({	guild: 'guildId',
										limit: INTEGER,
										query: 'stringToMatchUsernameOrNick'	});				

/*	Add a member to the guild.
		accessToken is absolutely required, without oauth2 access for guilds.join you can't do shit.	
		roles expects an array of roleId's to give the user when they join.	*/
guild
	.addMember({	guild: 'guildId',
								user: 'userId',
								accessToken: 'accessToken',
								nick: 'nickName',
								roles: [], 
								mute: BOOLEAN,
								deaf: BOOLEAN	});				

/*	Edit a guild member.
		roles is an array of roleId's that the specified userId has/will have.
		timeout means that the user cannot do anything in specified guildId until the timestamp.	*/
guild
	.editMember({ guild: 'guildId',
								user: 'userId',
								channel: 'channelId',
								nick: 'nickName',
								roles: [],
								mute: BOOLEAN,
								deaf: BOOLEAN,
								timeOut: 'ISO8601timeStamp' });				

/*	Change bots nickname.	*/
guild
	.editMe({ guild: 'guildId',
						nick: 'nickName' });				

/*	Add a role to a member.	*/
guild
	.addMemberRole({	guild: 'guildId',
										user: 'userId',
											role: 'roleId'	});				

/*	Remove a role from a member.	*/
guild
	.removeMemberRole({ guild: 'guildId',
											user: 'userId',
											role: 'roleId' });				

/*	Kindly remove a user from the specified guildId.	*/
guild
	.removeMember({ guild: 'guildId',
									user: 'userId' });				

/*	Returns a list of banned members.
		limit is a number between 1 and 1000.
		before and after decides from where you get the bans.	*/
guild
	.getBans({	guild: 'guildId',
							limit: INTEGER,
							before: 'userId',
							after: 'userId'	});				

/*	Returns information about a specified userId ban.	*/
guild
	.getBan({ guild: 'guildId',
						user: 'userId' });				

/*	Kindly yeet specified userId from the specified guildId.
		deleteMessages may be a number between 0 and 7.	*/
guild
	.ban({	guild: 'guildId',
					user: 'userId',
					reason: 'reasonToBan',
					deleteMessages: INTEGER	});				

/*	Guess what this does.	*/
guild
	.unBan({	guild: 'guildId',
						user: 'userId'	});				

/*	Return a list of roles for specified guildId.	*/
guild
	.getRoles({	guild: 'guildId'	});				

/*	Edit the specified roleId.
		permissions pick one or more permissions from the specified rolePermissionArray.
		color is an rgb color value.
		hoist means if it will show up as a seperate role on the right hand side.
		with icon make sure to use a proper full or partial path to your image.
		mentionable is self explanatory, right?	*/
guild
	.createRole({ guild: 'guildId',
								name: 'roleName',
								permissions: rolePermissionArray,
								color: INTEGER, 
								hoist: BOOLEAN,
								icon: 'fileName.ext',
								unicodeEmoji: 'unicodeEmoji',
								mentionable: BOOLEAN });				

/*	Change the roleId's position in the role list.	*/
guild
	.rolePosition({ guild: 'guildId',
									role: 'roleId',
									position: INTEGER });				

/*	Edit the specified roleId.
		permissions pick one or more permissions from the specified rolePermissionArray.
		color is an rgb color value.
		hoist means if it will show up as a seperate role on the right hand side.
		with icon make sure to use a proper full or partial path to your image.
		mentionable is self explanatory, right?	*/
guild
	.editRole({ guild: 'guildId',
							role: 'roleId',
							name: 'roleName',
							permissions: rolePermissionArray,
							color: INTEGER, 
							hoist: BOOLEAN,
							icon: 'fileName.ext',
							unicodeEmoji: 'unicodeEmoji',
							mentionable: BOOLEAN });				

/*	Changes the 2FA level.
		level can be 0 for none and 1 for 2FA on moderation actions.	*/
guild
	.mfaLevel({ guild: 'guildId',
							level: INTEGER });				

/*	Deletes the specified roleId.	*/
guild
	.deleteRole({ guild: 'guildId',
								role: 'roleId' });				

/*	Calculate the amount of users that can get pruned.
		days may be between 1 and 30.
		includeRoles is a string with roleId's seperated with a comma.	*/
guild
	.getPruneCount({	guild: 'guildId',
										days: INTEGER,
										includeRoles: 'commaSeperatedRoleIDs'	});				

/*	Kicks members that are qualified to be pruned.
		with includeRoles you can supply an array of roleId's to include in the prune.
		computePruneCount is a boolean that returns information about the pruned members.
		days may be between 1 and 30.	*/
guild
	.beginPrune({ guild: 'guildId',
								computePruneCount: BOOLEAN,
								days: INTEGER,
								includeRoles: [],
								reason: 'reasonToPrune' });				

/*	Return a list of voice regions for specified guildId.	*/			
guild
	.getVoiceRegions({	guild: 'guildId'	});				

/*	Return all available invites from specified guildId.	*/
guild
	.getInvites({	guild: 'guildId'	});				

/*	Get all integrations from specified guildId.	*/
guild
	.getIntegrations({	guild: 'guildId'	});				

/*	Deletes an integration, kicks bots that may be connected to it.	*/
guild
	.deleteIntegration({	guild: 'guildId',
												integration: 'integrationId'	});				

/*	Return some information about the guildId's widget settings.'	*/
guild
	.getWidgetSettings({	guild: 'guildId'	});				

/*	Modifies the guildId's widget.
		enabled means that if true that it's enabled.
		channel points to the channelId the widget should target.	*/
guild
	.editWidget({ guild: 'guildId',
								enabled: BOOLEAN,
								channel: 'channelId' });				

/*	Returns information about the specified guildId's widget.	*/
guild
	.getWidget({	guild: 'guildId'	});				

/*	If available get usage count and code about the vanity url.	*/
guild
	.getVanityUrl({	guild: 'guildId'	});				

/*	Return information about the guild widget image.
		for style refer to widgetImageStyleOption.	*/
guild
	.getWidgetImage({ guild: 'guildId',
										style: 'widgetImageStyleOption' });				

/*	Return information about the welcome screen of specified guildId.	*/
guild
	.getWelcomeScreen({	guild: 'guildId'	});				

/*	Modifies the welcome screen.
		enabled enables or disable the screen.
		welcome channels expects an array of channels as specified in welcomeChannelsArray.	*/
guild
	.editWelcomeScreen({	guild: 'guildId',
												enabled: BOOLEAN,
												welcomeChannels: welcomeChannelsArray,
												description: 'serverDescription'	});				

/*	If user is in specified channelId(Must be stage channel) change their status.
		requestToSpeakTimestamp means that at that timestamp the user can/may speak.	*/
guild
	.editVoiceState({ guild: 'guildId',
										channel: 'channelId',
										suppress: BOOLEAN,
										requestToSpeakTimestamp: 'ISO8601timestamp' });				

/*	If user is in specified channelId change their status.*/
guild
	.editUserVoiceState({ guild: 'guildId',
												user: 'userId',
												channel: 'channelId',
												suppress: BOOLEAN });				

/*	Adittional info.	*/
let defaultMessageNotificationsOption = [	'allMessages', 'onlyMentions'	];

let verificationLevelChoice = [	'none', 'low', 'mid', 'high', 'veryHigh'	];

let explicitContentFilterChoice = [	'off', 'onForNoRoles', 'onForAllMembers'	];

let systemChannelFlagsArray = [ 'suppressJoinNotifications', 'suppressPremiumSubscribers', 
																'suppressGuildReminderNotifications', 'suppressJoinNotificationReplies' ];

let featuresArray = [ 'animatedBanner', 'animatedIcon', 'autoModeration', 'banner', 'community', 'discoverable', 
											'featurable', 'inviteSplash', 'memberVerificationGateEnabled', 'monetizationEnabled', 
											'moreStickers', 'news', 'partnered', 'previewEnabled', 'privateThreads', 'roleIcons', 
											'ticketedEventsEnabled', 'vanityUrl', 'verified', 'vipRegions', 'welcomeScreenEnabled' ];


/*	The object itself is an array, in the array you place json structures.
		the ID entry is either a roleId or userId, then the type must correspond 0 for role and 1 for member.
		the allow and deny entries both are arrays, within them you put the permissions you want to allow or deny.	
		refer to rolePermissionArray for permission allow/deny possibilities.	*/
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

let channelTypes = [	'guildText', 'dm', 'guildVoice', 'groupDM', 'guildCategory', 'guildNews', 'guildNewsThread', 
											'guildPublicThread', 'guildPrivateThread', 'guildStageVoice', 'guildDirectory', 'guildForum'	];
											
let rolePermissionArray = [ 'createInstantInvite', 'kickMembers', 'banMembers', 'administrator', 'manageChannels', 
														'manageGuild', 'addReactions', 'viewAuditLog', 'prioritySpeaker', 'stream', 'viewChannel', 
														'sendMessages', 'sendTtsMessages', 'manageMessages', 'embedLinks', 'attachFiles', 'readMessageHistory', 
														'mentionEveryone', 'useExternalEmojis', 'viewGuildInsights', 'connect', 'speak', 'muteMembers', 
														'deafenMembers', 'moveMembers', 'useVad', 'changeNickname', 'manageNicknames', 'manageRoles', 
														'manageWebhooks', 'manageEmojisAndStickers', 'useApplicationCommands', 'requestToSpeak', 
														'manageEvents', 'manageThreads', 'createPublicThreads', 'createPrivateThreads', 'useExternalStickers', 
														'sendMessagesInThreads', 'useEmbeddedActivities', 'moderateMembers' ];
														
let widgetImageStyleOption = ['shield', 'banner1', 'banner2', 'banner3', 'banner4'];

let welcomeChannelsArray = [
														{ channel_id: 'channelId', 
															description: 'channelDescription', 
															emoji_id: 'emojiId', 
															emoji_name: 'emojiName' },
														{ channel_id: 'channelId', 
															description: 'channelDescription', 
															emoji_id: 'emojiId', 
															emoji_name: 'emojiName' }
													 ];
