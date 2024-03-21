/*	Get a template information sheet by providing the templateCode.	*/
guildTemplate
	.getTemplate({	template: 'templateCode'	});				

/*	Create a new guild with the provided templateCode.
		make sure to have a proper full or partial path to your image file for the icon.	*/
guildTemplate
	.guildFromTemplate({	template: 'templadeCode',
												name: 'guildName',
												icon: 'fileName.ext'	});				

/*	Get the templates from the provided guildId.	*/
guildTemplate
	.getGuildTemplates({	guild: 'guildId'	});				

/*	Create a new template using the provided guildId's layout.	*/
guildTemplate
	.createTemplate({ guild: 'guildId',
										name: 'templateName',
										description: 'templateDescription' });				

/*	Sync the provided template with the current layout of the guild.	*/
guildTemplate
	.syncTemplate({ guild: 'guildId',
									template: 'templateCode' });				

/*	Edit basic information about the provided templateId.	*/
guildTemplate
	.editTemplate({ guild: 'guildId',
									template: 'templateCode',
									name: 'templateName',
									description: 'templateDescription' });				

/*	Delete the provided template.	*/
guildTemplate
	.deleteTemplate({ guild: 'guildId',
										template: 'templateCode' });		

