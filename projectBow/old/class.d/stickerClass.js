class stickerConstruct  {
                          makeSticker(upload, message)  {
                                                          let fields = {};
                                                          let ext = path.extname(upload.toLowerCase());
                                                          let mime_type = mime.type(ext);
                                                          fields['name'] = message.name;
                                                          fields['description'] = message.description;
                                                          fields['tags'] = message.tags;
                                                          fields['file'] =  {
                                                                              name: upload,
                                                                              type: mime_type,
                                                                              data: fs.readFileSync(upload),
                                                                            };
                                                          const boundary = fd.generateBoundary();
                                                          const header = { 'Content-Type': `multipart/form-data; boundary=${boundary}` };
                                                          const contentType = `multipart/form-data; boundary=${boundary}`;
                                                          const body = fd(fields, boundary);
                                                          let fetcher = [];
                                                          for (let i of body) { fetcher.push(Buffer.from(i)); }
                                                          let newBuffer = Buffer.concat(fetcher);
                                                          return [newBuffer, contentType];
                                                        }
                          
                          get(msg)  {
                                      return exit.call('getSticker', {stickerId: msg.sticker, data: '', type: `application/json`});
                                    }
                          
                          listNitroPacks(msg) {
                                                return exit.call('listNitroStickerPacks', {guildId: '', data: '', type: `application/json`});
                                              }
                          
                          getGuildstickers(msg) {
                                                  return exit.call('listGuildStickers', {guildId: msg.guild, data: '', type: `application/json`});
                                                }
                          
                          getGuildsticker(msg)  {
                                                  return exit.call('getGuildSticker', {guildId: msg.guild, stickerId: msg.sticker, data: '', type: `application/json`});
                                                }
                          
                          create(msg) {
                                        let formMessage = {};
                                        if(msg.name) formMessage['name'] = msg.name;
                                        if(msg.description) formMessage['description'] = msg.description;
                                        if(msg.tags) formMessage['tags'] = msg.tags;
                                        if(msg.file) formMessage['file'] = msg.file;
                                        let uploadData = this.makeSticker(msg.file, formMessage);
                                        return exit.call('createGuildSticker', {guildId: msg.guild ,data: uploadData[0], type: `multipart/form-data; boundary=${uploadData[1]}`});
                                      }
                          
                          edit(msg) {
                                      let formMessage = {};
                                      if(msg.name) formMessage['name'] = msg.name;
                                      if(msg.description) formMessage['description'] = msg.description;
                                      if(msg.tags) formMessage['tags'] = msg.tags;
                                      return exit.call('modifyGuildSticker', {guildId: msg.guild, stickerId: msg.sticker, data: JSON.stringify(formMessage), type: `application/json`});
                                    }
                          
                          delete(msg) {
                                        return exit.call('deleteGuildSticker', {guildId: msg.guild, stickerId: msg.sticker, data: '', type: `application/json`});
                                      }
                        }

module.exports = stickerConstruct;
