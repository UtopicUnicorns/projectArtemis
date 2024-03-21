/*  Get all global commands for your applicationId.  
    if locale is set to true, will emit all localisations.  */
application
  .getGlobalCommands({ locale: BOOLEAN });

/*  create a new global command.
    for options follow the applicationBuild an insert the return (in let applicationBuild).
    for defaultPermissions pick one of more from defaultPermissionsChoices, place them in an array.
    for type, select just one in typeSelect as a string. 
    if type is anything other than chatInput then omit options. */
application
  .createGlobalApp({  name: 'applicationName',
                      description: 'applicationDescription',
                      options: applicationBuild,
                      defaultPermissions: defaultPermissionsChoices,
                      dmPermission: BOOLEAN,
                      type: typeSelect  });

/*  Get a specific global application command.  */
application
  .getGlobalCommand({ command: 'commandId' });

/*  Edit a global command.
    for options follow the applicationBuild an insert the return (in let applicationBuild).
    for defaultPermissions pick one of more from defaultPermissionsChoices, place them in an array.
    if the app you try to edit is not chatInput then omit option. */
application
  .editGlobalApp({  command: 'commandId',
                    name: 'applicationName',
                    description: 'applicationDescription',
                    options: applicationBuild,
                    defaultPermissions: defaultPermissionsChoices,
                    dmPermission: BOOLEAN  });

/*  Delete a global command.  */
application
  .deleteGlobalCommand({  command: 'commandId'  });

/*  Get all guild commands for your applicationId.  
    if locale is set to true, will emit all localisations.  */
application
  .getGuildCommands({ guild: 'guildId',
                      locale: BOOLEAN });

/*  create a new guild command.
    for options follow the applicationBuild an insert the return (in let applicationBuild).
    for defaultPermissions pick one of more from defaultPermissionsChoices, place them in an array.
    for type, select just one in typeSelect as a string. 
    if type is anything other than chatInput then omit options. */
application
  .createGuildApp({   guild: 'guildId',
                      name: 'applicationName',
                      description: 'applicationDescription',
                      options: applicationBuild,
                      defaultPermissions: defaultPermissionsChoices,
                      type: typeSelect  });

/*  Get a specific guild application command.  */
application
  .getGuildCommand({  guild: 'guildId', 
                      command: 'commandId' });

/*  Edit a guild command.
    for options follow the applicationBuild an insert the return (in let applicationBuild).
    for defaultPermissions pick one of more from defaultPermissionsChoices, place them in an array.
    if the app you try to edit is not chatInput then omit option. */
application
  .editGuildApp({   guild: 'guildId',
                    command: 'commandId',
                    name: 'applicationName',
                    description: 'applicationDescription',
                    options: applicationBuild,
                    defaultPermissions: defaultPermissionsChoices });

/*  Delete a guild command.  */
application
  .deleteGuildCommand({ guild: 'guildId', 
                        command: 'commandId' });

/*  Get permissions set for specified guild.
    returns all applications/commands.  */
application
  .getGuildAppPermissions({ guild: 'guildId' });
  
/*  Get permissions for specific commandId.  */
application
  .getAppPermissions({  guild: 'guildId', 
                        command: 'commandId' });
                                                   
/*  Additional info  */
/*	Example slash application with commands and sub commands.
		commandName() is an unique lowercase string:
			Each time this function is called, the library expects it to be a new command entry.
			Please refer to the examples for clarification.
		commandDescription() is a string.
		commandType() is an integer:
			If commandType is 1 then you can only use subCommands afterwards within the same space.
			If commandType is 2 then you have to use first subCommands with subCommandType 1 and then deepCommands.	
		subCommandName() is an unique lowercase string
		subCommandDescription() is a string
		subCommandType() is an integer:
			if commandType is 2, then subCommandType needs to be 1 for deepCommands.
			If commandType is 1, then subCommandType can be any of the options with exception of 1 and 2.
		subCommandRequired() is a boolean.
		subCommandChoices() is a dual value and can only be used if commandType is 1:
			('name', 'value') within the same choice set the names needs to be unique.
		deepCommandName() is an unique lowercase string:
			deepCommands can only be used if commandType is 2 AND subCommandType is 1
		deepCommandDescription() is a string.
		deepCommandType() is an integer and can be any of the options with the exception of type 1 and 2.
		deepCommandRequired() is a boolean.
		deepCommandChoices() is a dual value:
			('name', 'value') within the same choice set the names needs to be unique.
		To build the application remember to finish the appbuild with .build().
		
		Command Types:
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
			ATTACHMENT	11	attachment object	
			
		Application creation flows:
			command
			||
			||===> subcommand
			||
			||===> subcommand

			command
			||
			||===> subcommand-group
					||
					||===> subcommand
			||
			||===> subcommand
			
			command
			||
			||===> subcommand-group
					||
					||===> subcommand
			||
			||===> subcommand-group
					||
					||===> subcommand
		
				*/
let applicationBuild = new appBuild()
                            .commandName("commandname")
                            .commandDescription("commandDescription")
                            .commandType(2)
                              .subCommandName('subcommandname')
                              .subCommandDescription('subCommandDescription')
                              .subCommandType(1)
                                .deepCommandName('deepCommandname')
                                .deepCommandDescription('deepCommandDescription')
                                .deepCommandType(3)
                                .deepCommandRequired(true)
                                .deepCommandChoices('name', 'value')
                                .deepCommandChoices('name', 'value')
                                .deepCommandChoices('name', 'value')
                            .commandName("commandname2")
                            .commandDescription("commandDescription2")
                            .commandType(1)
                              .subCommandName('subcommandname2')
                              .subCommandDescription('subCommandDescription2')
                              .subCommandType(3)
                              .subCommandChoices('name', 'value')
                              .subCommandChoices('name', 'value')
                              .subCommandChoices('name', 'value')
                          .build();

let defaultPermissionsChoices = [ 'createInstantInvite', 'kickMembers', 'banMembers', 'administrator', 'manageChannels', 
												'manageGuild', 'addReactions', 'viewAuditLog', 'prioritySpeaker', 'stream', 'viewChannel', 
												'sendMessages', 'sendTtsMessages', 'manageMessages', 'embedLinks', 'attachFiles', 'readMessageHistory', 
												'mentionEveryone', 'useExternalEmojis', 'viewGuildInsights', 'connect', 'speak', 'muteMembers', 
												'deafenMembers', 'moveMembers', 'useVad', 'changeNickname', 'manageNicknames', 'manageRoles', 
												'manageWebhooks', 'manageEmojisAndStickers', 'useApplicationCommands', 'requestToSpeak', 
												'manageEvents', 'manageThreads', 'createPublicThreads', 'createPrivateThreads', 'useExternalStickers', 
												'sendMessagesInThreads', 'useEmbeddedActivities', 'moderateMembers' ];

let typeSelect = ['chatInput', 'user', 'message'];
