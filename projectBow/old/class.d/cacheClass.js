class cacheConstruct  {
                        constructor() {
                                        this.cache =  {
                                                        user: {},
                                                        guild: {},
                                                        channel: {},
                                                        role: {},
                                                        emoji: {},
                                                        sticker: {},
                                                        presence: {},
                                                        thread: {},
                                                      };
                                        if (botCaching) mailMan.on('cacheUpdate', async (info) => {
                                                                                                    if (info['guild'])  {
                                                                                                                          info['guild'].stickers.forEach((stick) => this.cache['sticker'][stick.id] = stick);
                                                                                                                          info['guild'].channels.forEach((chan) => this.cache['channel'][chan.id] = chan);
                                                                                                                          info['guild'].presences.forEach((pres) => this.cache['presence'][pres.user.id] = pres);
                                                                                                                          info['guild'].roles.forEach((rol) => this.cache['role'][rol.id] = rol);
                                                                                                                          info['guild'].emojis.forEach((emo) => this.cache['emoji'][emo.id] = emo);
                                                                                                                          info['guild'].members.forEach((mem) => this.cache['user'][mem.user.id] = mem);
                                                                                                                          info['guild'].threads.forEach((th) => this.cache['thread'][th.id] = th);
                                                                                                                          delete info['guild'].members;
                                                                                                                          delete info['guild'].stickers;
                                                                                                                          delete info['guild'].channels;
                                                                                                                          delete info['guild'].presences;
                                                                                                                          delete info['guild'].roles;
                                                                                                                          delete info['guild'].emojis;
                                                                                                                          delete info['guild'].threads;
                                                                                                                          this.cache['guild'][info['guild'].id] = info['guild'];
                                                                                                                        };
                                                                                                  });
                                      }
                        
                        user(id)  {
                                    if(id) return this.cache['user'][id];
                                  }
                        
                        guild(id) {
                                    if(id) return this.cache['guild'][id];
                                  }
                        
                        presence(id)  {
                                        if(id) return this.cache['presence'][id];
                                      }
                        
                        emoji(id) {
                                    if(id) return this.cache['emoji'][id];
                                  }
                        
                        sticker(id) {
                                      if(id) return this.cache['sticker'][id];
                                    }
                        
                        role(id)  {
                                    if(id) return this.cache['role'][id];
                                  }
                        
                        channel(id) {
                                      if(id) return this.cache['channel'][id];
                                    }
                        
                        all() {
                                return this.cache;
                              }
                      }

module.exports = cacheConstruct;
