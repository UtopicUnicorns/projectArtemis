/*	Get information about an invite.
		withCount, withExpire and guildEventId are both optional and required if needed.	*/
invite
	.get({	invite: 'inviteCode',
					withCount: BOOLEAN,
					withExpire: BOOLEAN,
					guildEventId: 'guildEventId'	});				

/*	Delete an invite by inviteCode.	*/
invite
	.delete({	invite: 'inviteCode'	});		
				
