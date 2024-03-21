class guildTemplateConstruct  {
                                processGuildImage(image)  {
                                                            let ext = path.extname(image.toLowerCase());
                                                            let mime_type = mime.type(ext);
                                                            let imageObject = fs.readFileSync(image, {encoding: 'base64'});
                                                            let sendObject = `data:${mime_type};base64,${imageObject}`;
                                                            return sendObject;
                                                          }
                                
                                getTemplate() {
                                                return exit.call('getGuildTemplate', {templateCode: msg.template, data: '', type: `application/json`});
                                              }
                                
                                guildFromTemplate(msg)  {
                                                          let formMessage = {};
                                                          if(msg.name) formMessage['name'] = msg.name;
                                                          if(msg.icon) formMessage['icon'] = this.processGuildImage(msg.icon);
                                                          return exit.call('createGuildfromGuildTemplate', {templateCode: msg.template, data: JSON.stringify(formMessage), type: `application/json`});
                                                        }
                                
                                getGuildTemplates() {
                                                      return exit.call('getGuildTemplates', {guildId: msg.guild, data: '', type: `application/json`});
                                                    }
                                
                                createTemplate(msg) {
                                                      let formMessage = {};
                                                      if(msg.name) formMessage['name'] = msg.name;
                                                      if(msg.description) formMessage['description'] = msg.description;
                                                      return exit.call('createGuildTemplate', {guildId: msg.guild, data: JSON.stringify(formMessage), type: `application/json`});
                                                    }
                                
                                syncTemplate()  {
                                                  return exit.call('syncGuildTemplate', {guildId: msg.guild, templateCode: msg.template, data: '', type: `application/json`});
                                                }
                                
                                editTemplate(msg) {
                                                    let formMessage = {};
                                                    if(msg.name) formMessage['name'] = msg.name;
                                                    if(msg.description) formMessage['description'] = msg.description;
                                                    return exit.call('modifyGuildTemplate', {guildId: msg.guild,  templateCode: msg.template, data: JSON.stringify(formMessage), type: `application/json`});
                                                  }
                                
                                deleteTemplate()  {
                                                    return exit.call('deleteGuildTemplate', {guildId: msg.guild, templateCode: msg.template, data: '', type: `application/json`});
                                                  }
                              }

module.exports = guildTemplateConstruct;
