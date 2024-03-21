class userConstruct {
                      processAvatarImage(image) {
                                                  let ext = path.extname(image.toLowerCase());
                                                  let mime_type = mime.type(ext);
                                                  let imageObject = fs.readFileSync(image, {encoding: 'base64'});
                                                  let sendObject = `data:${mime_type};base64,${imageObject}`;
                                                  return sendObject;
                                                }
                      
                      getMe(msg)  {
                                    return exit.call('getCurrentUser', {data: '', type: `application/json`});
                                  }
                      
                      get(msg)  {
                                  return exit.call('getUser', {userId: msg.user, data: '', type: `application/json`});
                                }
                      
                      editMe(msg) {
                                    let formMessage = {};
                                    if(msg.username) formMessage['username'] = msg.username;
                                    if(msg.avatar) formMessage['avatar'] = this.processAvatarImage(msg.avatar);
                                    return exit.call('modifyCurrentUser', {data: JSON.stringify(formMessage), type: `application/json`});
                                  }
                      
                      getMyGuilds(msg)  {
                                          let formMessage = [];
                                          if(msg.before) formMessage.push(`before=${msg.before}`);
                                          if(msg.after) formMessage.push(`after=${msg.after}`);
                                          if(msg.limit) formMessage.push(`limit=${msg.limit}`);
                                          return exit.call('getCurrentUserGuilds', {data: formMessage.join('&'), type: `application/json`});
                                        }
                      
                      getMeInGuild()  {
                                        return exit.call('getCurrentUserGuildMember', {guildId: msg.guild, data: '', type: `application/json`});
                                      }
                      
                      leaveGuild()  {
                                      return exit.call('leaveGuild', {guildId: msg.guild, data: '', type: `application/json`});
                                    }
                      
                      initDM(msg) {
                                    let formMessage = {};
                                    if(msg.user) formMessage['recipient_id'] = msg.user;
                                    return exit.call('createDM', {data: JSON.stringify(formMessage), type: `application/json`});
                                  }
                      
                      initGroupDM(msg)  {
                                          let formMessage = {};
                                          if(msg.accessTokens) formMessage['access_tokens'] = msg.accessTokens;
                                          if(msg.nicks) formMessage['nicks'] = msg.nicks;
                                          return exit.call('createGroupDM', {data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                      
                      getMyConnections()  {
                                            return exit.call('getUserConnection', {data: '', type: `application/json`});
                                          }
                    }

module.exports = userConstruct;

