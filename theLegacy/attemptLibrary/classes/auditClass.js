class auditConstruct  {
                      convert(num)  {
                                      let auditActionTypes =  {
                                                                guildUpdate: 1,
                                                                channelCreate: 10,
                                                                channelUpdate: 11,
                                                                channelDelete: 12,
                                                                channelOverwriteCreate: 13,
                                                                channelOverwriteUpdate: 14,
                                                                channelOverwriteDelete: 15,
                                                                memberKick: 20,
                                                                memberPrune: 21,
                                                                memberBanAdd: 22,
                                                                memberBanRemove: 23,
                                                                memberUpdate: 24,
                                                                memberRoleUpdate: 25,
                                                                memberMove: 26,
                                                                memberDisconnect: 27,
                                                                botAdd: 28,
                                                                roleCreate: 30,
                                                                roleUpdate: 31,
                                                                roleDelete: 32,
                                                                inviteCreate: 40,
                                                                inviteUpdate: 41,
                                                                inviteDelete: 42,
                                                                webhookCreate: 50,
                                                                webhookUpdate: 51,
                                                                webhookDelete: 52,
                                                                emojiCreate: 60,
                                                                emojiUpdate: 61,
                                                                emojiDelete: 62,
                                                                messageDelete: 72,
                                                                messageBulkDelete: 73,
                                                                messagePin: 74,
                                                                messageUnpin: 75,
                                                                integrationCreate: 80,
                                                                integrationUpdate: 81,
                                                                integrationDelete: 82,
                                                                stageInstanceCreate: 83,
                                                                stageInstanceUpdate: 84,
                                                                stageInstanceDelete: 85,
                                                                stickerCreate: 90,
                                                                stickerUpdate: 91,
                                                                stickerDelete: 92,
                                                                guildScheduledEventCreate: 100,
                                                                guildScheduledEventUpdate: 101,
                                                                guildScheduledEventDelete: 102,
                                                                threadCreate: 110,
                                                                threadUpdate: 111,
                                                                threadDelete: 112,
                                                                applicationCommandPermissionUpdate: 121,
                                                                autoModerationRuleCreate: 140,
                                                                autoModerationRuleUpdate: 141,
                                                                autoModerationRuleDelete: 142,
                                                                autoModerationBlockMessage: 143,
                                                              };
                                      return auditActionTypes[num];
                                    }
                      
                      log(msg)  {
                                  let formMessage = [];
                                  if(msg.user) formMessage.push(`user_id=${msg.user}`);
                                  if(msg.actionType) formMessage.push(`action_type=${this.convert(msg.actionType)}`);
                                  if(msg.before) formMessage.push(`before=${msg.before}`);
                                  if(msg.limit) formMessage.push(`limit=${msg.limit}`);
                                  return exit.call('getGuildAuditLog', { guildId: msg.guild ,data: formMessage.join('&'), type: `application/json` });
                                }
                      }

module.exports = auditConstruct;
