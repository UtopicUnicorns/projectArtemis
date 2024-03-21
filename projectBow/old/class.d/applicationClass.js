class applicationConstruct  {
                            readyPermissions(perms) {
                                                      const permissionField = {
                                                                                createInstantInvite: 1 << 0,
                                                                                kickMembers: 1 << 1,
                                                                                banMembers: 1 << 2,
                                                                                administrator: 1 << 3,
                                                                                manageChannels: 1 << 4,
                                                                                manageGuild: 1 << 5,
                                                                                addReactions: 1 << 6,
                                                                                viewAuditLog: 1 << 7,
                                                                                prioritySpeaker: 1 << 8,
                                                                                stream: 1 << 9,
                                                                                viewChannel: 1 << 10,
                                                                                sendMessages: 1 << 11,
                                                                                sendTtsMessages: 1 << 12,
                                                                                manageMessages: 1 << 13,
                                                                                embedLinks: 1 << 14,
                                                                                attachFiles: 1 << 15,
                                                                                readMessageHistory: 1 << 16,
                                                                                mentionEveryone: 1 << 17,
                                                                                useExternalEmojis: 1 << 18,
                                                                                viewGuildInsights: 1 << 19,
                                                                                connect: 1 << 20,
                                                                                speak: 1 << 21,
                                                                                muteMembers: 1 << 22,
                                                                                deafenMembers: 1 << 23,
                                                                                moveMembers: 1 << 24,
                                                                                useVad: 1 << 25,
                                                                                changeNickname: 1 << 26,
                                                                                manageNicknames: 1 << 27,
                                                                                manageRoles: 1 << 28,
                                                                                manageWebhooks: 1 << 29,
                                                                                manageEmojisAndStickers: 1 << 30,
                                                                                useApplicationCommands: 1 << 31,
                                                                                requestToSpeak: 1 << 32,
                                                                                manageEvents: 1 << 33,
                                                                                manageThreads: 1 << 34,
                                                                                createPublicThreads: 1 << 35,
                                                                                createPrivateThreads: 1 << 36,
                                                                                useExternalStickers: 1 << 37,
                                                                                sendMessagesInThreads: 1 << 38,
                                                                                useEmbeddedActivities: 1 << 39,
                                                                                moderateMembers: 1 << 40,
                                                                              };
                                                      let defNum = 0;		
                                                      for (let i of perms)  {
                                                                              defNum += permissionField[i];				
                                                                            }	
                                                      return defNum;
                                                    }
                            
                            getType(selectOne)  {
                                                  let typeSelection = {
                                                                        chatInput: 1,
                                                                        user: 2,
                                                                        message: 3
                                                                      };
                                                  return typeSelection[selectOne];
                                                }
                            
                            getGlobalCommands(msg)  {
                                                      let formMessage = [];
                                                      if(msg.locale) formMessage.push(`with_localizations=${msg.locale}`);
                                                      return exit.call('getGlobalApplicationCommands', {applicationId: appId, data: formMessage.join('&'), type: `application/json`});
                                                    }
                            
                            createGlobalApp(msg)  {
                                                    let formMessage = {};
                                                    if(msg.name) formMessage['name'] = msg.name;
                                                    if(msg.nameLocale) formMessage['name_localizations'] = msg.nameLocale;
                                                    if(msg.description) formMessage['description'] = msg.description;
                                                    if(msg.descriptionLocale) formMessage['description_localizations'] = msg.descriptionLocale;
                                                    if(msg.options) formMessage['options'] = msg.options;
                                                    if(msg.defaultPermissions) formMessage['default_member_permissions'] = this.readyPermissions(msg.defaultPermissions);
                                                    if(msg.dmPermission) formMessage['dm_permission'] = msg.dmPermission;
                                                    if(msg.type) formMessage['type'] = this.getType(msg.type);
                                                    return exit.call('createGlobalApplicationCommand', {applicationId: appId, data: JSON.stringify(formMessage), type: `application/json`});
                                                  }
                            
                            getGlobalCommand(msg) {
                                                    return exit.call('getGlobalApplicationCommand', {applicationId: appId, commandId: msg.command, data: '', type: `application/json`});
                                                  }
                            
                            editGlobalApp(msg)  {
                                                  let formMessage = {};
                                                  if(msg.name) formMessage['name'] = msg.name;
                                                  if(msg.nameLocale) formMessage['name_localizations'] = msg.nameLocale;
                                                  if(msg.description) formMessage['description'] = msg.description;
                                                  if(msg.descriptionLocale) formMessage['description_localizations'] = msg.descriptionLocale;
                                                  if(msg.options) formMessage['options'] = msg.options;
                                                  if(msg.defaultPermissions) formMessage['default_member_permissions'] = this.readyPermissions(msg.defaultPermissions);
                                                  if(msg.dmPermission) formMessage['dm_permission'] = msg.dmPermission;
                                                  return exit.call('editGlobalApplicationCommand', {applicationId: appId, commandId: msg.command, data: JSON.stringify(formMessage), type: `application/json`});
                                                }
                            
                            deleteGlobalCommand(msg)  {
                                                        return exit.call('deleteGlobalApplicationCommand', {applicationId: appId, commandId: msg.command, data: '', type: `application/json`});
                                                      }
                            
                            getGuildCommands(msg) {
                                                    let formMessage = [];
                                                    if(msg.locale) formMessage.push(`with_localizations=${msg.locale}`);
                                                    return exit.call('getGuildApplicationCommands', {applicationId: appId, guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                                  }
                            
                            createGuildApp(msg) {
                                                  let formMessage = {};
                                                  if(msg.name) formMessage['name'] = msg.name;
                                                  if(msg.nameLocale) formMessage['name_localizations'] = msg.nameLocale;
                                                  if(msg.description) formMessage['description'] = msg.description;
                                                  if(msg.descriptionLocale) formMessage['description_localizations'] = msg.descriptionLocale;
                                                  if(msg.options) formMessage['options'] = msg.options;
                                                  if(msg.defaultPermissions) formMessage['default_member_permissions'] = this.readyPermissions(msg.defaultPermissions);
                                                  if(msg.dmPermission) formMessage['dm_permission'] = msg.dmPermission;
                                                  if(msg.type) formMessage['type'] = this.getType(msg.type);
                                                  return exit.call('createGuildApplicationCommand', {applicationId: appId, guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                                }
                            
                            getGuildCommand(msg)  {
                                                    return exit.call('getGuildApplicationCommand', {applicationId: appId, guildId: msg.guild, commandId: msg.command, data: '', type: `application/json`});
                                                  }
                            
                            editGuildApp(msg) {
                                                let formMessage = {};
                                                if(msg.name) formMessage['name'] = msg.name;
                                                if(msg.nameLocale) formMessage['name_localizations'] = msg.nameLocale;
                                                if(msg.description) formMessage['description'] = msg.description;
                                                if(msg.descriptionLocale) formMessage['description_localizations'] = msg.descriptionLocale;
                                                if(msg.options) formMessage['options'] = msg.options;
                                                if(msg.defaultPermissions) formMessage['default_member_permissions'] = this.readyPermissions(msg.defaultPermissions);
                                                if(msg.dmPermission) formMessage['dm_permission'] = msg.dmPermission;
                                                return exit.call('editGuildApplicationCommand', {applicationId: appId, guildId: msg.guild, commandId: msg.command, data: JSON.stringify(formMessage), type: `application/json`});
                                              }
                            
                            deleteGuildCommand(msg) {
                                                      return exit.call('deleteGuildApplicationCommand', {applicationId: appId, guildId: msg.guild, commandId: msg.command, data: '', type: `application/json`});
                                                    }
                            
                            getGuildAppPermissions(msg) {
                                                          return exit.call('getGuildApplicationCommandPermissions', {applicationId: appId, guildId: msg.guild, data: '', type: `application/json`});
                                                        }
                            
                            getAppPermissions(msg)  {
                                                      return exit.call('getApplicationCommandPermissions', {applicationId: appId, guildId: msg.guild, commandId: msg.command, data: '', type: `application/json`});
                                                    }
                            }

module.exports = applicationConstruct;
