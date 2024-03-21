class guildEventConstruct {
                            processGuildEventImage(image) {
                                                            let ext = path.extname(image.toLowerCase());
                                                            let mime_type = mime.type(ext);
                                                            let imageObject = fs.readFileSync(image, {encoding: 'base64'});
                                                            let sendObject = `data:${mime_type};base64,${imageObject}`;
                                                            return sendObject;
                                                          }
                            
                            processPrivacy(option)  {
                                                      let privacyLevelOption =  {
                                                                                  guildOnly: 2,
                                                                                };
                                                      return privacyLevelOption[option];
                                                    }
                            
                            processEntity(option) {
                                                    let entityTypeOption =  {
                                                                              stageInstance: 1, 
                                                                              voice: 2, 
                                                                              external: 3,
                                                                            };
                                                    return entityTypeOption[option];
                                                  }
                            
                            processStatus(option) {
                                                    let statusOption =  {
                                                                          scheduled: 1, 
                                                                          active: 2, 
                                                                          completed: 3, 
                                                                          canceled: 4,
                                                                        };
                                                    return statusOption[option];
                                                  }
                            
                            listEvents(msg) {
                                              let formMessage = [];
                                              if(msg.count) formMessage.push(`with_user_count=true`);
                                              return exit.call('listScheduledEventsforGuild', {guildId: msg.guild, data: formMessage.join('&'), type: `application/json`});
                                            }
                            
                            createEvent(msg)  {
                                                let formMessage = {};
                                                if(msg.channel) formMessage['channel_id'] = msg.channel;
                                                if(msg.entityMetadata) formMessage['entity_metadata'] = msg.entityMetadata;
                                                if(msg.name) formMessage['name'] = msg.name;
                                                if(msg.privacyLevel) formMessage['privacy_level'] = this.processPrivacy(msg.privacyLevel);
                                                if(msg.startTime) formMessage['scheduled_start_time'] = msg.startTime;
                                                if(msg.endTime) formMessage['scheduled_end_time'] = msg.endTime;
                                                if(msg.description) formMessage['description'] = msg.description;
                                                if(msg.entityType) formMessage['entity_type'] = this.processEntity(msg.entityType);
                                                if(msg.image) formMessage['image'] = this.processGuildEventImage(msg.image);
                                                return exit.call('createGuildScheduledEvent', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                              }
                            
                            getEvent(msg) {
                                            let formMessage = [];
                                            if(msg.count) formMessage.push(`with_user_count=true`);
                                            return exit.call('getGuildScheduledEvent', {guildId: msg.guild, guildScheduledEventId: msg.event, data: formMessage.join('&'), type: `application/json`});
                                          }
                            
                            editEvent(msg)  {
                                              let formMessage = {};
                                              if(msg.channel) formMessage['channel_id'] = msg.channel;
                                              if(msg.entityMetadata) formMessage['entity_metadata'] = msg.entityMetadata;
                                              if(msg.name) formMessage['name'] = msg.name;
                                              if(msg.privacyLevel) formMessage['privacy_level'] = this.processPrivacy(msg.privacyLevel);
                                              if(msg.startTime) formMessage['scheduled_start_time'] = msg.startTime;
                                              if(msg.endTime) formMessage['scheduled_end_time'] = msg.endTime;
                                              if(msg.description) formMessage['description'] = msg.description;
                                              if(msg.entityType) formMessage['entity_type'] = this.processEntity(msg.entityType);
                                              if(msg.image) formMessage['image'] = this.processGuildEventImage(msg.image);
                                              if(msg.status) formMessage['status'] = this.processStatus(msg.status);
                                              return exit.call('modifyGuildScheduledEvent', {guildId: msg.guild, guildScheduledEventId: msg.event, data: JSON.stringify(formMessage), type: `application/json`});
                                            }
                            
                            deleteEvent(msg)  {
                                                return exit.call('deleteGuildScheduledEvent', {guildId: msg.guild, guildScheduledEventId: msg.event, data: '', type: `application/json`});
                                              }
                            
                            getEventUsers(msg)  {
                                                  let formMessage = [];
                                                  if(msg.limit) formMessage.push(`limit=${msg.limit}`);
                                                  if(msg.withMember) formMessage.push(`with_member=${msg.withMember}`);
                                                  if(msg.before) formMessage.push(`before=${msg.before}`);
                                                  if(msg.after) formMessage.push(`before=${msg.after}`);
                                                  return exit.call('getGuildScheduledEventUsers', {guildId: msg.guild, guildScheduledEventId: msg.event, data: formMessage.join('&'), type: `application/json`});
                                                }
                          }

module.exports = guildEventConstruct;
