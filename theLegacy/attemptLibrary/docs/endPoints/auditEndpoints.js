/*	guildId is just the guild you target for audit logs.
		actionType is ONE of the options in the array as a string.
		limit is any number between 1 and 100.
		before simply means before specified audit log entry id.	
		all, but guild are optional fields, you can omit them	*/
audit
	.log({	guild: 'guildId',
					actionType: pickActionType,
					before: 'auditLogEntryId',
					limit: INTEGER	});	

let pickActionType = ['guildUpdate', 'channelCreate', 'channelUpdate', 'channelDelete', 'channelOverwriteCreate',
											'channelOverwriteUpdate', 'channelOverwriteDelete', 'memberKick', 'memberPrune', 
											'memberBanAdd', 'memberBanRemove', 'memberUpdate', 'memberRoleUpdate', 'memberMove', 
											'memberDisconnect', 'botAdd', 'roleCreate', 'roleUpdate', 'roleDelete', 'inviteCreate', 
											'inviteUpdate', 'inviteDelete', 'webhookCreate', 'webhookUpdate', 'webhookDelete', 'emojiCreate',
											'emojiUpdate', 'emojiDelete', 'messageDelete', 'messageBulkDelete', 'messagePin', 'messageUnpin', 
											'integrationCreate', 'integrationUpdate', 'integrationDelete', 'stageInstanceCreate', 
											'stageInstanceUpdate', 'stageInstanceDelete', 'stickerCreate', 'stickerUpdate', 'stickerDelete', 
											'guildScheduledEventCreate', 'guildScheduledEventUpdate', 'guildScheduledEventDelete', 
											'threadCreate', 'threadUpdate', 'threadDelete', 'applicationCommandPermissionUpdate', 
											'autoModerationRuleCreate', 'autoModerationRuleUpdate', 'autoModerationRuleDelete', 
											'autoModerationBlockMessage'];	
			
