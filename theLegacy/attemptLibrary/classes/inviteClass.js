class inviteConstruct {
                        get(msg)  {
                                    let formMessage = [];
                                    if(msg.withCount) formMessage.push(`with_counts=true`);
                                    if(msg.withExpire) formMessage.push(`with_expiration=true`);
                                    if(msg.guildEventId) formMessage.push(`guild_scheduled_event_id=${msg.guildEventId}`);
                                    return exit.call('getInvite', {inviteCode: msg.invite, data: formMessage.join('&'), type: `application/json`});
                                  }
                        
                        delete(msg) {
                                      return exit.call('deleteInvite', {inviteCode: msg.invite, data: '', type: `application/json`});
                                    }
                      }

module.exports = inviteConstruct;
