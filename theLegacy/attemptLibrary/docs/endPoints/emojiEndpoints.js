/*	List all emojis with information within the specified guildId.	*/
emoji
	.list({	guild: 'guildId'	});				

/*	Get specific information about the emojiId within the specified guildId.	*/
emoji
	.get({	guild: 'guildId',
					emoji: 'emojiId'	});				

/*	Creates an emoji, make sure to have a full or partial path as image.
		roles expects an array of roleId's that can use the emoji.	*/
emoji
	.create({ guild: 'guildId',
						name: 'emojiName',
						image: 'filename.ext',
						roles: [] });				
/*	Change an existing emoji by providing the guildId and emojiId.
		roles expects an array of roleId's that can use the emoji.	*/
emoji
	.edit({ guild: 'guildId',
					emoji: 'emojiId',
					name: 'emojiName', 
					roles: [] });

/*	Try to guess what this does.	*/
emoji
	.delete({ guild: 'guildId',
						emoji: 'emojiId' });		
			
