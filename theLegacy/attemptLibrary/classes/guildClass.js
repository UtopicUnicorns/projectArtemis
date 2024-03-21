class guildConstruct  {
                        processGuildImage(image)  {
                                                    let ext = path.extname(image.toLowerCase());
                                                    let mime_type = mime.type(ext);
                                                    let imageObject = fs.readFileSync(image, {encoding: 'base64'});
                                                    let sendObject = `data:${mime_type};base64,${imageObject}`;
                                                    return sendObject;
                                                  }
                        
                        processFeatures(array)  {
                                                  let sendObject = [];
                                                  let featuresObject =  {
                                                                          animatedBanner: 'ANIMATED_BANNER',
                                                                          animatedIcon: 'ANIMATED_ICON',
                                                                          autoModeration: 'AUTO_MODERATION',
                                                                          banner: 'BANNER',
                                                                          community: 'COMMUNITY',
                                                                          discoverable: 'DISCOVERABLE',
                                                                          featurable: 'FEATURABLE',
                                                                          inviteSplash: 'INVITE_SPLASH',
                                                                          memberVerificationGateEnabled: 'MEMBER_VERIFICATION_GATE_ENABLED',
                                                                          monetizationEnabled: 'MONETIZATION_ENABLED',
                                                                          moreStickers: 'MORE_STICKERS',
                                                                          news: 'NEWS',
                                                                          partnered: 'PARTNERED',
                                                                          previewEnabled: 'PREVIEW_ENABLED',
                                                                          privateThreads: 'PRIVATE_THREADS',
                                                                          roleIcons: 'ROLE_ICONS',
                                                                          ticketedEventsEnabled: 'TICKETED_EVENTS_ENABLED',
                                                                          vanityUrl: 'VANITY_URL',
                                                                          verified: 'VERIFIED',
                                                                          vipRegions: 'VIP_REGIONS',
                                                                          welcomeScreenEnabled: 'WELCOME_SCREEN_ENABLED',
                                                                          botEarlyAccess: 'BOT_DEVELOPER_EARLY_ACCESS',
                                                                        };
                                                  for (let i of array) { sendObject.push(featuresObject[i]); }
                                                  return sendObject;
                                                }
                        
                        processSysFlags(flags)  {
                                                  let sysFlags =  {
                                                                    suppressJoinNotifications: 1 << 0,
                                                                    suppressPremiumSubscribers: 1 << 1,
                                                                    suppressGuildReminderNotifications: 1 << 2,
                                                                    suppressJoinNotificationReplies: 1 << 3,
                                                                  };
                                                  newFlags = 0;
                                                  for (let i of flags)  {
                                                                          newFlags += sysFlags[i];
                                                                        }
                                                  return newFlags;
                                                }
                        
                        processExplicit(option) {
                                                  let explicitContentFilterChoice = {
                                                                                      off: 0,
                                                                                      onForNoRoles: 1,
                                                                                      onForAllMembers: 2,
                                                                                    };
                                                  return explicitContentFilterChoice[option];
                                                }
                        
                        processVerification(option) {
                                                      let verificationLevelChoice = {
                                                                                      none: 0,
                                                                                      low: 1,
                                                                                      mid: 2,
                                                                                      high: 3,
                                                                                      veryHigh: 4,
                                                                                    };
                                                      return verificationLevelChoice[option];
                                                    }
                        
                        processNotifLevel(option) {
                                                    let defaultMessageNotificationsOption = {
                                                                                              allMessages: 0,
                                                                                              onlyMentions: 1,
                                                                                            };
                                                    return defaultMessageNotificationsOption[option];
                                                  }
                        
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
                                                  
                                                  for (let a of perms)  {
                                                                          let denyNum = 0;
                                                                          let allowNum = 0;
                                                                          if(a.allow) {
                                                                                        for (let b of a.allow)  {
                                                                                                                  if(permissionField[b]) allowNum += permissionField[b];
                                                                                                                }
                                                                                      }
                                                                          if(a.deny)  {
                                                                                        for (let b of a.deny) {
                                                                                                                if(permissionField[b]) denyNum += permissionField[b];
                                                                                                              }
                                                                                      }		
                                                                          a.allow = allowNum;
                                                                          a.deny = denyNum;
                                                                        }
                                                  
                                                  return perms;
                                                }
                        
                        getChanType(type) {
                                            let channelTypes =  {
                                                                  guildText: 0,
                                                                  dm: 1,
                                                                  guildVoice: 2,
                                                                  groupDM: 3,
                                                                  guildCategory: 4,
                                                                  guildNews: 5,
                                                                  guildNewsThread: 10,
                                                                  guildPublicThread: 11,
                                                                  guildPrivateThread: 12,
                                                                  guildStageVoice: 13,
                                                                  guildDirectory: 14,
                                                                  guildForum: 15
                                                                };
                                            return channelTypes[type];
                                          }
                        
                        getVideoMode(mode)  {
                                              let videoQualityModes = {
                                                                        auto: 0,
                                                                        full: 1
                                                                      };
                                              return videoQualityModes[mode];
                                            }
                        
                        processRolePerm(array)  {
                                                  let permissionField = {
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
                                                                          moderateMembers: 1 << 40
                                                                        };
                                                  let newPerm = 0;
                                                  for(let i of array) {
                                                                        newPerm += permissionField[i];
                                                                      }
                                                  return newPerm;
                                                }
                        
                        
                        create(msg) {
                                      let formMessage = {};
                                      if(msg.name) formMessage['name'] = msg.name;
                                      if(msg.icon) formMessage['icon'] = this.processGuildImage(msg.icon);
                                      if(msg.verificationLevel) formMessage['verification_level'] = this.processVerification(msg.verificationLevel);
                                      if(msg.defaultMessageNotifications) formMessage['default_message_notifications'] = this.processNotifLevel(msg.defaultMessageNotifications);
                                      if(msg.explicitContentFilter) formMessage['explicit_content_filter'] = this.processExplicit(msg.explicitContentFilter);
                                      if(msg.roles) formMessage['roles'] = msg.roles;
                                      if(msg.channels) formMessage['channels'] = msg.channels;
                                      return exit.call('createGuild', {data: JSON.stringify(formMessage), type: `application/json`});
                                    }
                        
                        get(msg)  {
                                    let formMessage = 'with_counts=false';
                                    if(msg.count) formMessage = 'with_counts=true';
                                    return exit.call('getGuild', {guildId: msg.guild, data: formMessage, type: `application/json`});
                                  }
                        
                        preview(msg)  {
                                        return exit.call('getGuildPreview', {guildId: msg.guild, data: '', type: `application/json`});
                                      }
                        
                        edit(msg) {
                                    let formMessage = {};
                                    if(msg.name) formMessage['name'] = msg.name;
                                    if(msg.verificationLevel) formMessage['verification_level'] = this.processVerification(msg.verificationLevel);
                                    if(msg.defaultMessageNotifications) formMessage['default_message_notifications'] = this.processNotifLevel(msg.defaultMessageNotifications);
                                    if(msg.explicitContentFilter) formMessage['explicit_content_filter'] = this.processExplicit(msg.explicitContentFilter);
                                    if(msg.afkChannelId) formMessage['afk_channel_id'] = msg.afkChannelId;
                                    if(msg.afkTimeout) formMessage['afk_timeout'] = msg.afkTimeout;
                                    if(msg.icon) formMessage['icon'] = this.processGuildImage(msg.icon);
                                    if(msg.ownerId) formMessage['owner_id'] = msg.ownerId;
                                    if(msg.splash) formMessage['splash'] = this.processGuildImage(msg.splash);
                                    if(msg.discoverySplash) formMessage['discovery_splash'] = this.processGuildImage(msg.discoverySplash);
                                    if(msg.banner) formMessage['banner'] = this.processGuildImage(msg.banner);
                                    if(msg.systemChannelId) formMessage['system_channel_id'] = msg.systemChannelId;
                                    if(msg.systemChannelFlags) formMessage['system_channel_flags'] = this.processSysFlags(msg.systemChannelFlags);
                                    if(msg.rulesChannelId) formMessage['rules_channel_id'] = msg.rulesChannelId;
                                    if(msg.publicUpdatesChannelId) formMessage['public_updates_channel_id'] = msg.publicUpdatesChannelId;
                                    if(msg.preferredLocale) formMessage['preferred_locale'] = msg.preferredLocale;
                                    if(msg.features) formMessage['features'] = this.processFeatures(msg.features);
                                    if(msg.description) formMessage['description'] = msg.description;
                                    if(msg.premiumProgressBar) formMessage['premium_progress_bar_enabled'] = msg.premiumProgressBar;
                                    return exit.call('modifyGuild', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                  }
                        
                        delete(msg) {
                                      return exit.call('deleteGuild', {guildId: msg.guild, data: '', type: `application/json`});
                                    }
                        
                        getChannels(msg)  {
                                            return exit.call('getGuildChannels', {guildId: msg.guild, data: '', type: `application/json`});
                                          }
                        
                        createChannel(msg)  {
                                              let formMessage = {};
                                              if(msg.name) formMessage['name'] = msg.name;
                                              if(msg.type) formMessage['type'] = this.getChanType(msg.type);
                                              if(msg.topic) formMessage['topic'] = msg.topic;
                                              if(msg.bitrate) formMessage['bitrate'] = msg.bitrate;
                                              if(msg.userLimit) formMessage['user_limit'] = msg.userLimit;
                                              if(msg.rateLimitPerUser) formMessage['rate_limit_per_user'] = msg.rateLimitPerUser;
                                              if(msg.position) formMessage['position'] = msg.position;
                                              if(msg.permissionOverwrite) formMessage['permission_overwrites'] = this.readyPermissions(msg.permission_overwrites);
                                              if(msg.parentId) formMessage['parent_id'] = msg.parentId;
                                              if(msg.nsfw) formMessage['nsfw'] = msg.nsfw;
                                              if(msg.rtcRegion) formMessage['rtc_region'] = msg.rtcRegion;
                                              if(msg.videoQualityMode) formMessage['video_quality_mode'] = this.getVideoMode(msg.videoQualityMode);
                                              if(msg.defaultAutoArchiveDuration) formMessage['default_auto_archive_duration'] = msg.defaultAutoArchiveDuration;
                                              return exit.call('createGuildChannel', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                            }
                        
                        editChanPosition(msg) {
                                                let formMessage = {};
                                                if(msg.id) formMessage['id'] = msg.id;
                                                if(msg.position) formMessage['position'] = msg.position;
                                                if(msg.lockPermissions) formMessage['lock_permissions'] = msg.lockPermissions;
                                                if(msg.parentId) formMessage['parent_id'] = msg.parentId;
                                                return exit.call('modifyGuildChannelPositions', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                              }
                        
                        activeThreads(msg)  {
                                              return exit.call('listActiveGuildThreads', {guildId: msg.guild, data: '', type: `application/json`});
                                            }
                        
                        getMember(msg)  {
                                          return exit.call('getGuildMember', {guildId: msg.guild, userId: msg.member, data: '', type: `application/json`});
                                        }
                        
                        listMembers(msg)  {
                                            let formMessage = [];
                                            if(msg.after) formMessage.push(`before=${msg.after}`);
                                            if(msg.limit) formMessage.push(`limit=${msg.limit}`);
                                            return exit.call('listGuildMembers', {guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                          }
                        
                        searchMembers(msg)  {
                                              let formMessage = [];
                                              if(msg.query) formMessage.push(`before=${msg.query}`);
                                              if(msg.limit) formMessage.push(`limit=${msg.limit}`);
                                              return exit.call('searchGuildMembers', {guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                            }
                        
                        addMember(msg)  {
                                          let formMessage = {};
                                          if(msg.accessToken) formMessage['access_token'] = msg.accessToken;
                                          if(msg.nick) formMessage['nick'] = msg.nick;
                                          if(msg.roles) formMessage['roles'] = msg.roles;
                                          if(msg.mute) formMessage['mute'] = msg.mute;
                                          if(msg.deaf) formMessage['deaf'] = msg.deaf;
                                          return exit.call('addGuildMember', {guildId: msg.guild, userId: msg.user, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                        
                        editMember(msg) {
                                          let formMessage = {};
                                          if(msg.nick) formMessage['nick'] = msg.nick;
                                          if(msg.roles) formMessage['roles'] = msg.roles;
                                          if(msg.mute) formMessage['mute'] = msg.mute;
                                          if(msg.deaf) formMessage['deaf'] = msg.deaf;
                                          if(msg.channel) formMessage['channel_id'] = msg.channel;
                                          if(msg.timeOut) formMessage['communication_disabled_until'] = msg.timeOut;
                                          return exit.call('modifyGuildMember', {guildId: msg.guild, userId: msg.user, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                        
                        editMe(msg) {
                                      let formMessage = {};
                                      if(msg.nick) formMessage['nick'] = msg.nick;
                                      return exit.call('modifyCurrentMember', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                    }
                        
                        editMyNick(msg) {
                                          let formMessage = {};
                                          if(msg.nick) formMessage['nick'] = msg.nick;
                                          return exit.call('modifyCurrentUserNick', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                        
                        addMemberRole(msg)  {
                                              return exit.call('addGuildMemberRole', {guildId: msg.guild, userId: msg.user, roleId: msg.role, data: '', type: `application/json`});
                                            }
                        
                        removeMemberRole(msg) {
                                                return exit.call('removeGuildMemberRole', {guildId: msg.guild, userId: msg.user, roleId: msg.role, data: '', type: `application/json`});
                                              }
                        
                        removeMember(msg) {
                                            return exit.call('removeGuildMember', {guildId: msg.guild, userId: msg.user, data: '', type: `application/json`});
                                          }
                        
                        getBans(msg)  {
                                        let formMessage = [];
                                        if(msg.limit) formMessage.push(`before=${msg.limit}`);
                                        if(msg.after) formMessage.push(`limit=${msg.after}`);
                                        if(msg.before) formMessage.push(`limit=${msg.before}`);
                                        return exit.call('getGuildBans', {guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                      }
                        
                        getBan(msg) {
                                      return exit.call('getGuildBan', {guildId: msg.guild, userId: msg.user, data: '', type: `application/json`});
                                    }
                        
                        ban(msg)  {
                                    let formMessage = {};
                                    if(msg.deleteMessages) formMessage['delete_message_days'] = msg.deleteMessages;
                                    if(msg.reason) formMessage['reason'] = msg.reason;
                                    return exit.call('createGuildBan', {guildId: msg.guild, userId: msg.user, data: JSON.stringify(formMessage), type: `application/json`});
                                  }
                        
                        unBan(msg)  {
                                      return exit.call('removeGuildBan', {guildId: msg.guild, userId: msg.user, data: '', type: `application/json`});
                                    }
                        
                        getRoles(msg) {
                                        return exit.call('getGuildRoles', {guildId: msg.guild, data: '', type: `application/json`});
                                      }
                        
                        createRole(msg) {
                                          let formMessage = {};
                                          if(msg.name) formMessage['name'] = msg.name;
                                          if(msg.permissions) formMessage['permissions'] = this.processRolePerm(msg.permissions);
                                          if(msg.color) formMessage['color'] = msg.color;
                                          if(msg.hoist) formMessage['hoist'] = msg.hoist;
                                          if(msg.icon) formMessage['icon'] = this.processGuildImage(msg.icon);
                                          if(msg.unicodeEmoji) formMessage['unicode_emoji'] = msg.unicodeEmoji;
                                          if(msg.mentionable) formMessage['mentionable'] = msg.mentionable;
                                          return exit.call('createGuildRole', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                        
                        rolePosition(msg) {
                                            let formMessage = {};
                                            if(msg.id) formMessage['id'] = msg.id;
                                            if(msg.position) formMessage['position'] = msg.position;
                                            return exit.call('modifyGuildRolePositions', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                          }
                        
                        editRole(msg) {
                                        let formMessage = {};
                                        if(msg.name) formMessage['name'] = msg.name;
                                        if(msg.permissions) formMessage['permissions'] = this.processRolePerm(msg.permissions);
                                        if(msg.color) formMessage['color'] = msg.color;
                                        if(msg.hoist) formMessage['hoist'] = msg.hoist;
                                        if(msg.icon) formMessage['icon'] = this.processGuildImage(msg.icon);
                                        if(msg.unicodeEmoji) formMessage['unicode_emoji'] = msg.unicodeEmoji;
                                        if(msg.mentionable) formMessage['mentionable'] = msg.mentionable;
                                        return exit.call('modifyGuildRole', {guildId: msg.guild, roleId: msg.role, data: JSON.stringify(formMessage), type: `application/json`});
                                      }
                        
                        mfaLevel(msg) {
                                        let formMessage = {};
                                        if(msg.level) formMessage['level'] = msg.level;
                                        return exit.call('modifyGuildMFALevel', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                      }
                        
                        deleteRole(msg) {
                                          return exit.call('deleteGuildRole', {guildId: msg.guild, roleId: msg.role, data: '', type: `application/json`});
                                        }
                        
                        getPruneCount(msg)  {
                                              let formMessage = [];
                                              if(msg.days) formMessage.push(`days=${msg.days}`);
                                              if(msg.includeRoles) formMessage.push(`include_roles=${msg.includeRoles}`);
                                              return exit.call('getGuildPruneCount', {guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                            }
                        
                        beginPrune(msg) {
                                          let formMessage = {};
                                          if(msg.days) formMessage['days'] = msg.days;
                                          if(msg.computePruneCount) formMessage['compute_prune_count'] = msg.computePruneCount;
                                          if(msg.includeRoles) formMessage['include_roles'] = msg.includeRoles;
                                          if(msg.reason) formMessage['reason'] = msg.reason;
                                          return exit.call('beginGuildPrune', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                        
                        getVoiceRegions(msg)  {
                                                return exit.call('getGuildVoiceRegions', {guildId: msg.guild, data: '', type: `application/json`});
                                              }
                        
                        getInvites(msg) {
                                          return exit.call('getGuildInvites', {guildId: msg.guild, data: '', type: `application/json`});
                                        }
                        
                        getIntegrations(msg)  {
                                                return exit.call('getGuildIntegrations', {guildId: msg.guild, data: '', type: `application/json`});
                                              }
                        
                        deleteIntegration(msg)  {
                                                  return exit.call('deleteGuildIntegration', {guildId: msg.guild, integrationId: msg.integration, data: '', type: `application/json`});
                                                }
                        
                        getWidgetSettings(msg)  {
                                                  return exit.call('getGuildWidgetSettings', {guildId: msg.guild, data: '', type: `application/json`});
                                                }
                        
                        editWidget(msg) {
                                          let formMessage = {};
                                          if(msg.enabled) formMessage['enabled'] = msg.enabled;
                                          if(msg.channel) formMessage['channelId'] = msg.channel;
                                          return exit.call('modifyGuildWidget', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                        
                        getWidget(msg)  {
                                          return exit.call('getGuildWidget', {guildId: msg.guild, data: '', type: `application/json`});
                                        }
                        
                        getVanityUrl(msg) {
                                            return exit.call('getGuildVanityURL', {guildId: msg.guild, data: '', type: `application/json`});
                                          }
                        
                        getWidgetImage(msg) {
                                              let formMessage = [];
                                              if(msg.style) formMessage.push(`style=${msg.style}`);
                                              return exit.call('getGuildWidgetImage', {guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                            }
                        
                        getWelcomeScreen(msg) {
                                                return exit.call('getGuildWelcomeScreen', {guildId: msg.guild, data: '', type: `application/json`});
                                              }
                        
                        editWelcomeScreen(msg)  {
                                                  let formMessage = {};
                                                  if(msg.enabled) formMessage['enabled'] = msg.enabled;
                                                  if(msg.welcomeChannels) formMessage['welcome_channels'] = msg.welcomeChannels;
                                                  if(msg.description) formMessage['description'] = msg.description;
                                                  return exit.call('modifyGuildWelcomeScreen', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                                }
                        
                        editVoiceState(msg) {
                                              let formMessage = {};
                                              if(msg.channel) formMessage['channel_id'] = msg.channel;
                                              if(msg.suppress) formMessage['suppress'] = msg.suppress;
                                              if(msg.requestToSpeakTimestamp) formMessage['request_to_speak_timestamp'] = msg.requestToSpeakTimestamp;
                                              return exit.call('modifyCurrentUserVoiceState', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                            }
                        
                        editUserVoiceState(msg) {
                                                  let formMessage = {};
                                                  if(msg.channel) formMessage['channel_id'] = msg.channel;
                                                  if(msg.suppress) formMessage['suppress'] = msg.suppress;
                                                  return exit.call('modifyUserVoiceState', {guildId: msg.guild, userId: msg.user, data: JSON.stringify(formMessage), type: `application/json`});
                                                }
                      }

module.exports = guildConstruct;
