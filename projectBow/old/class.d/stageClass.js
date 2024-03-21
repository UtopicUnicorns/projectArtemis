class stageConstruct  {
                        processPrivacy(option)  {
                                                  let privacyPicks =  {
                                                                        public: 1,
                                                                        guildOnly: 2
                                                                      };
                                                  return privacyPicks[option];
                                                }
                        
                        create(msg) {
                                      let formMessage = {};
                                      if(msg.channel) formMessage['channel_id'] = msg.channel;
                                      if(msg.topic) formMessage['topic'] = msg.topic;
                                      if(msg.privacyLevel) formMessage['privacy_level'] = this.processPrivacy(msg.privacyLevel);
                                      if(msg.sendNotification) formMessage['send_start_notification'] = msg.sendNotification;
                                      return exit.call('createStageInstance', {channelId: '', data: JSON.stringify(formMessage), type: `application/json`});
                                    }
                        
                        get(msg)  {
                                    return exit.call('getStageInstance', {channelId: msg.channel, data: '', type: `application/json`});
                                  }
                        
                        edit(msg) {
                                    let formMessage = {};
                                    if(msg.topic) formMessage['topic'] = msg.topic;
                                    if(msg.privacyLevel) formMessage['privacy_level'] = this.processPrivacy(msg.privacyLevel);
                                    return exit.call('modifyStageInstance', {channelId: msg.channel, data: JSON.stringify(formMessage), type: `application/json`});
                                  }
                        
                        delete(msg) {
                                      return exit.call('deleteStageInstance', {channelId: msg.channel, data: '', type: `application/json`});
                                    }
                      }

module.exports = stageConstruct;
