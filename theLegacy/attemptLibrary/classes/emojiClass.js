class emojiConstruct  {
                        processEmoji(image) {
                                              let ext = path.extname(image.toLowerCase());
                                              let mime_type = mime.type(ext);
                                              let imageObject = fs.readFileSync(image, {encoding: 'base64'});
                                              let sendObject = `data:${mime_type};base64,${imageObject}`;
                                              return sendObject;
                                            }
                        
                        list(msg) {
                                    return exit.call('listGuildEmojis', {guildId: msg.guild ,data: '', type: `application/json`});
                                  }
                        
                        get(msg)  {
                                    return exit.call('getGuildEmoji', {guildId: msg.guild, emojiId: msg.emoji, data: '', type: `application/json`});
                                  }
                        
                        create(msg) {
                                      let formMessage = {};
                                      if(msg.name) formMessage['name'] = msg.name;
                                      if(msg.image) formMessage['image'] = this.processEmoji(msg.image);
                                      if(msg.roles) formMessage['roles'] = msg.roles;
                                      return exit.call('createGuildEmoji', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                    }
                        
                        edit(msg) {
                                    let formMessage = {};
                                    if(msg.name) formMessage['name'] = msg.name;
                                    if(msg.roles) formMessage['roles'] = msg.roles;
                                    return exit.call('modifyGuildEmoji', {guildId: msg.guild, emojiId: msg.emoji, data: JSON.stringify(formMessage), type: `application/json`});
                                  }
                        
                        delete(msg) {
                                      return exit.call('deleteGuildEmoji', {guildId: msg.guild, emojiId: msg.emoji, data: '', type: `application/json`});
                                    }
                      }

module.exports = emojiConstruct;
