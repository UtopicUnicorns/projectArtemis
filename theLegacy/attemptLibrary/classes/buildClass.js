class httpsConstruct  {
                        send(data, path, method, host, port, headers) {
                                                                        let promise = new Promise((resolve, reject) =>  {
                                                                                                                          const options = {
                                                                                                                                            hostname: host,
                                                                                                                                            port: port,
                                                                                                                                            path: path,
                                                                                                                                            method: method,
                                                                                                                                            headers: headers,
                                                                                                                                          };
                                                                                                                          const req = https.request(options, (res) => {
                                                                                                                                                                        let collect = [];
                                                                                                                                                                        res.on('data', async (data) => { collect.push(data); });
                                                                                                                                                                        res.on('end', async (data) => {
                                                                                                                                                                                                        try {
                                                                                                                                                                                                          if (!collect[0]) resolve('Empty response type.');
                                                                                                                                                                                                          const parsed_data = await JSON.parse(collect.join(''));
                                                                                                                                                                                                          if (parsed_data.channel_id && isNaN(parsed_data.channel_id)) reject(parsed_data);
                                                                                                                                                                                                          if (parsed_data.code) reject(parsed_data);
                                                                                                                                                                                                          if (parsed_data.message == 'The resource is being rate limited.') reject(parsed_data);
                                                                                                                                                                                                          resolve(parsed_data);
                                                                                                                                                                                                        } catch (err) { 
                                                                                                                                                                                                          reject({ error: err, stack: 1 }); 
                                                                                                                                                                                                        }
                                                                                                                                                                                                      });
                                                                                                                                                                      });
                                                                                                                          req.on('error', (err) => { reject(err); });
                                                                                                                          if (data) { req.write(data); }
                                                                                                                          req.end();
                                                                                                                        });
                                                                        return promise;
                                                                      }
                      }

class relConstruct  {
                      rel() {
                              fly.send('', `/repos/UtopicUnicorns/Project_Bow/releases`, 'GET', 'api.github.com', 443, { 'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json' })
                              .then((callBack) => {
                                                    let releaseLocal = require('../REL.json').rel;
                                                    let releaseInfo = {};
                                                    if (callBack[0].tag_name == releaseLocal) {
                                                                                                releaseInfo['discordLibraryName'] = 'Project Bow';
                                                                                                releaseInfo['libraryVersion'] = releaseLocal;
                                                                                                releaseInfo['Message'] = 'Your local version is up-to-date!';
                                                                                                return console.log(releaseInfo);
                                                                                              }	
                                                    if (callBack[0].tag_name <= releaseLocal) {
                                                                                                releaseInfo['discordLibraryName'] = 'Project Bow';
                                                                                                releaseInfo['libraryVersion'] = releaseLocal;
                                                                                                releaseInfo['Message'] = 'Your local version is NEWER than the current release!';
                                                                                                return console.log(releaseInfo);
                                                                                              }	
                                                    releaseInfo['discordLibraryName'] = 'Project Bow';
                                                    releaseInfo['Name'] = callBack[0].name;
                                                    releaseInfo['Version'] = callBack[0].tag_name;
                                                    releaseInfo['Date'] = {
                                                    time: time.clock(callBack[0].published_at).eu,
                                                    date: time.date(callBack[0].published_at).nice,
                                                    };
                                                    releaseInfo['Zip'] = callBack[0].zipball_url;
                                                    releaseInfo['Tar'] = callBack[0].tarball_url;
                                                    releaseInfo['Release'] = callBack[0].html_url;
                                                    releaseInfo[''] = '';
                                                    releaseInfo['localVersion'] = releaseLocal;
                                                    releaseInfo['Message'] = 'Your local version is NOT up-to-date!';				
                                                    return console.log(releaseInfo);
                                                  })
                              .catch((err) => console.log(err));
                            }
                    }

class appConstruct  {
                      constructor() {
                                      this.target = 'commands';
                                      this.command = [];
                                      this.data = {
                                                    options: []
                                                  };
                                    }
                      
                      build() {
                                if(this.command[0]) this.data['options'].push(this.command[0]);
                                this.command.length = 0;
                                return this.data['options'];
                              }
                      
                      commandName(string) {
                                            if(!string) return this;
                                            if (this.command[0])  {
                                                                    this.data['options'].push(this.command[0]);
                                                                    this.command.length = 0;
                                                                  }
                                            if(!this.command[0]) this.command.push({name: string});
                                            return this;
                                          }
                      
                      commandDescription(string)  {
                                                    if(!string) return this;
                                                    if(!this.command[0]) return this;
                                                    this.command[0]['description'] = string;
                                                    return this;
                                                  }
                      
                      commandType(integer)  {
                                              if(!this.command[0]) return this;
                                              if(!integer) return this;
                                              this.command[0]['type'] = integer;
                                              return this;
                                            }
                      
                      commandRequired(boolean)  {
                                                  if(!this.command[0]) return this;
                                                  if(!boolean) this.command[0]['required'] = false;
                                                  if(boolean) this.command[0]['required'] = true;
                                                  return this;
                                                }
                      
                      commandChoices(name, value) {
                                                    if(!this.command[0]) return this;
                                                    if(!name) return this;
                                                    if(!value) return this;
                                                    if(this.command[0]['options']) return this;
                                                    if(!this.command[0]['choices']) this.command[0]['choices'] = [];
                                                    this.command[0]['choices'].push({name: name, value: value});
                                                    return this;
                                                  }
                      
                      subCommandName(string)  {
                                                if(!string) return this;
                                                if(!this.command[0]) return this;
                                                if(this.command[0]['choices']) return this;
                                                if(this.command[0]['options'] && this.command[0]['options'][0]) this.command[0]['options'].push({name: string});
                                                if(!this.command[0]['options']) this.command[0]['options'] = [{name: string}];
                                                return this;
                                              }
                      
                      subCommandDescription(string) {
                                                      if(!string) return this;
                                                      if(!this.command[0]) return this;
                                                      if(this.command[0]['choices']) return this;
                                                      if(this.command[0]['options'] && this.command[0]['options'][0]) this.command[0]['options'][this.command[0]['options'].length-1]['description'] = string;
                                                      return this;
                                                    }
                      
                      subCommandType(integer) {
                                                if(!integer) return this;
                                                if(!this.command[0]) return this;
                                                if(this.command[0]['choices']) return this;
                                                if(this.command[0]['options'] && this.command[0]['options'][0]) this.command[0]['options'][this.command[0]['options'].length-1]['type'] = integer;
                                                return this;
                                              }
                      
                      subCommandRequired(boolean) {
                                                    if(!this.command[0]) return this;
                                                    if(this.command[0]['choices']) return this;
                                                    if(this.command[0]['options'] && this.command[0]['options'][0]) this.command[0]['options'][this.command[0]['options'].length-1]['required'] = boolean;
                                                    return this;
                                                  }
                      
                      subCommandChoices(name, value)  {
                                                        if(!name) return this;
                                                        if(!value) return this;
                                                        if(!this.command[0]) return this;
                                                        if(this.command[0]['choices']) return this;
                                                        if(this.command[0]['options'][this.command[0]['options'].length-1]['options']) return this;
                                                        if(this.command[0]['options'][this.command[0]['options'].length-1]['choices']) this.command[0]['options'][this.command[0]['options'].length-1]['choices'].push({name: name, value: value});
                                                        if(!this.command[0]['options'][this.command[0]['options'].length-1]['choices']) this.command[0]['options'][this.command[0]['options'].length-1]['choices'] = [{name: name, value: value}];
                                                        return this;
                                                      }
                      
                      deepCommandName(string) {
                                                if(!string) return this;
                                                if(!this.command[0]) return this;
                                                if(this.command[0]['choices']) return this;
                                                if(this.command[0]['options'][this.command[0]['options'].length-1]['choices']) return this;
                                                if(this.command[0]['options'][this.command[0]['options'].length-1]['options']) this.command[0]['options'][this.command[0]['options'].length-1]['options'].push({name: string});
                                                if(!this.command[0]['options'][this.command[0]['options'].length-1]['options']) this.command[0]['options'][this.command[0]['options'].length-1]['options'] = [{name: string}];
                                                return this;
                                              }
                      
                      deepCommandDescription(string)  {
                                                        if(!string) return this;
                                                        if(!this.command[0]) return this;
                                                        if(this.command[0]['choices']) return this;
                                                        if(this.command[0]['options'][this.command[0]['options'].length-1]['choices']) return this;
                                                        this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['description'] = string;
                                                        return this;
                                                      }
                      
                      deepCommandType(integer)  {
                                                  if(!integer) return this;
                                                  if(!this.command[0]) return this;
                                                  if(this.command[0]['choices']) return this;
                                                  if(this.command[0]['options'][this.command[0]['options'].length-1]['choices']) return this;
                                                  this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['type'] = integer;
                                                  return this;
                                                }
                      
                      deepCommandRequired(boolean)  {
                                                      if(!this.command[0]) return this;
                                                      if(this.command[0]['choices']) return this;
                                                      if(this.command[0]['options'][this.command[0]['options'].length-1]['choices']) return this;
                                                      this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['required'] = boolean;
                                                      return this;
                                                    }
                      
                      deepCommandChoices(name, value) {
                                                        if(!name) return this;
                                                        if(!value) return this;
                                                        if(!this.command[0]) return this;
                                                        if(this.command[0]['choices']) return this;
                                                        if(this.command[0]['options'][this.command[0]['options'].length-1]['choices']) return this;
                                                        if(this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['choices']) this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['choices'].push({name: name, value: value});
                                                        if(!this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['choices']) this.command[0]['options'][this.command[0]['options'].length-1]['options'][this.command[0]['options'][this.command[0]['options'].length-1]['options'].length-1]['choices'] = [{name: name, value: value}];
                                                        return this;
                                                      }
                      
                      appDelete(message)  {
                                            if (message && message.guild) return fly.send('', `/api/applications/${appId}/guilds/${message.guild}/commands/${message.command}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
                                            return fly.send('', `/api/applications/${appId}/commands/${message.command}`, 'DELETE', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
                                          }
                      
                      appView(message)  {
                                          if (message && message.guild && message.command) return fly.send('', `/api/applications/${appId}/guilds/${message.guild}/commands/${message.command}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
                                          if (message && message.guild) return fly.send('', `/api/applications/${appId}/guilds/${message.guild}/commands`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
                                          if (message && message.command) return fly.send('', `/api/applications/${appId}/commands/${message.command}`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
                                          return fly.send('', `/api/applications/${appId}/commands`, 'GET', 'discord.com', 443, { 'Content-Type': 'application/json', Authorization: `Bot ${token}` });
                                        }
                    }

class componentConstruct  {
                            constructor() {
                                            this.menuBOOL = false;
                                            this.buttonBOOL = false;
                                            this.data = {
                                                          type: 1,
                                                          components: [],
                                                        };
                                          }
                            
                            get output()  {
                                            return this.data;
                                          }
                            
                            /* BROKEN
                            modal(msg)  {
                                          let selectStyle = {	short: 1, multi: 2	};
                                          let modalMade = {
                                                            type: 4,
                                                            components: [{
                                                                          type: 4
                                                                        }]	
                                                          };
                                          if(msg.title) modalMade['title'] = msg.title;
                                          if(msg.customId)  { 
                                                              modalMade['custom_id'] = msg.customId;
                                                              modalMade['components'][0]['custom_id'] = msg.customId;
                                                            }
                                          if(msg.label) modalMade['components'][0]['label'] = msg.label;
                                          if(msg.style) modalMade['components'][0]['style'] = selectStyle[msg.style];
                                          if(msg.minLength) modalMade['components'][0]['min_length'] = msg.minLength;
                                          if(msg.maxLength) modalMade['components'][0]['max_length'] = msg.maxLength;
                                          if(msg.placeHolder) modalMade['components'][0]['placeholder'] = msg.placeHolder;
                                          if(msg.required) modalMade['components'][0]['required'] = msg.required;
                                          return modalMade;
                                        }
                            */
                            
                            menu(menudata)  {
                                              if (!menudata) return 'No information.';
                                              if (this.buttonBOOL) return this;
                                              this.menuBOOL = true;
                                              let menuInfo =  {
                                                                custom_id: menudata.custom_id,
                                                                placeholder: menudata.place_holder,
                                                                min_values: menudata.min_val,
                                                                max_values: menudata.max_val,
                                                                options: [],
                                                                type: 3,
                                                              };
                                              this.data.components.push(menuInfo);
                                              return this;
                                            }
                            
                            entry(entrydata)  {
                                                if (!entrydata) return 'No information.';
                                                if (entrydata.emoji)  {
                                                                        var entryInfo = {
                                                                                          label: entrydata.label,
                                                                                          value: entrydata.value,
                                                                                          description: entrydata.description,
                                                                                          default: entrydata.default,
                                                                                          emoji:  { 
                                                                                                    name: entrydata.emoji.name, 
                                                                                                    id: entrydata.emoji.id, 
                                                                                                    animated: entrydata.emoji.boolean 
                                                                                                  },
                                                                                        };
                                                                      } else  {
                                                                                var entryInfo = {
                                                                                                  label: entrydata.label,
                                                                                                  value: entrydata.value,
                                                                                                  description: entrydata.description,
                                                                                                  default: entrydata.default,
                                                                                                };
                                                                              }	
                                                if (!entrydata.emoji) delete entryInfo['emoji'];
                                                if (entrydata.emoji)  {
                                                                        if (!entrydata.emoji.name) delete entryInfo.emoji['name'];
                                                                        if (!entrydata.emoji.id) delete entryInfo.emoji['id'];
                                                                        if (!entrydata.emoji.animated) delete entryInfo.emoji['animated'];
                                                                      }
                                                if (!entrydata.default) delete entryInfo['default'];
                                                if (!entrydata.description) delete entryInfo['description'];
                                                if (!entrydata.value) delete entryInfo['value'];
                                                if (!entrydata.label) delete entryInfo['label'];
                                                if (this.data.components[0] && this.data.components[0].options) this.data.components[0].options.push(entryInfo);		
                                                return this;
                                              }
                            
                            button(buttondata)  {
                                                  if (this.menuBOOL) return this;
                                                  this.buttonBOOL = true;
                                                  if (buttondata.emoji) {
                                                                          var buttonInfo =  {
                                                                                              label: buttondata.label,
                                                                                              custom_id: buttondata.custom_id,
                                                                                              style: buttondata.style,
                                                                                              disabled: buttondata.disabled,
                                                                                              url: buttondata.url,
                                                                                              emoji:  { 
                                                                                                        name: buttondata.emoji.name, 
                                                                                                        id: buttondata.emoji.id, 
                                                                                                        animated: buttondata.emoji.boolean 
                                                                                                      },
                                                                                              type: 2,
                                                                                            };
                                                                          if (!buttondata.emoji.id) delete buttonInfo.emoji['id'];
                                                                          if (!buttondata.emoji.name) delete buttonInfo.emoji['name'];
                                                                          if (!buttondata.emoji.animated) delete buttonInfo.emoji['animated'];
                                                                        } else  {
                                                                                  var buttonInfo =  {
                                                                                                      label: buttondata.label,
                                                                                                      custom_id: buttondata.custom_id,
                                                                                                      style: buttondata.style,
                                                                                                      disabled: buttondata.disabled,
                                                                                                      url: buttondata.url,
                                                                                                      type: 2,
                                                                                                    };
                                                                                }
                                                  if (!buttondata.label) delete buttonInfo['label'];
                                                  if (!buttondata.custom_id) delete buttonInfo['custom_id'];
                                                  if (!buttondata.style) delete buttonInfo['style'];
                                                  if (!buttondata.disabled) delete buttonInfo['disabled'];
                                                  if (!buttondata.url) delete buttonInfo['url'];
                                                  this.data.components.push(buttonInfo);
                                                  return this;
                                                }
                          }

class embedConstruct  {
                        constructor() {
                                        this.data = {
                                                      title: '',
                                                      description: '',
                                                      color: 0xff0000,
                                                      fields: [],
                                                      timestamp: '',
                                                      image:  {
                                                                url: '',
                                                                proxy_url: '',
                                                                height: 40,
                                                                width: 40,
                                                              },
                                                      thumbnail:  {
                                                                    url: '',
                                                                    proxy_url: '',
                                                                    height: 50,
                                                                    width: 50,
                                                                  },
                                                      author: {
                                                                name: '',
                                                                url: '',
                                                                icon_url: '',
                                                                proxy_icon_url: '',
                                                              },
                                                      footer: {
                                                                text: '',
                                                                icon_url: '',
                                                                proxy_icon_url: '',
                                                              },
                                                      url: '',
                                                    };
                                      }
                        
                        get output()  {
                                        if (!this.data.image.url) delete this.data['image'];
                                        if (!this.data.thumbnail.url) delete this.data['thumbnail'];
                                        if (!this.data.author.name) delete this.data['author'];
                                        if (!this.data.footer.text) delete this.data['footer'];
                                        if (!this.data.url) delete this.data['url'];
                                        if (!this.data.title) delete this.data['title'];
                                        if (!this.data.description) delete this.data['description'];
                                        if (!this.data.timestamp) delete this.data['timestamp'];
                                        if (!this.data.fields) delete this.data['fields'];
                                        return this.data;
                                      }
                        
                        field(name, value, inline)  {
                                                      this.data.fields.push({
                                                                              name: name || '',
                                                                              value: value || '',
                                                                              inline: inline || false,
                                                                            });
                                                      return this;
                                                    }
                        
                        description(desc) {
                                            this.data.description = desc || '';
                                            return this;
                                          }
                        
                        title(title)  {
                                        this.data.title = title || '';
                                        return this;
                                      }
                        
                        timestamp(time) {
                                          this.data.timestamp = time || new Date();
                                          return this;
                                        }
                        
                        color(color)  {
                                        this.data.color = parseInt(`0x${color}`) || 0;
                                        return this;
                                      }
                        
                        author(name, icon, url, proxy)  {
                                                          this.data.author.name = name || '';
                                                          this.data.author.icon_url = icon || '';
                                                          this.data.author.url = url || '';
                                                          this.data.author.proxy_icon_url = proxy || '';
                                                          return this;
                                                        }
                        
                        footer(text, icon, proxy) {
                                                    this.data.footer.text = text || '';
                                                    this.data.footer.icon_url = icon || '';
                                                    this.data.footer.proxy_icon_url = proxy || '';
                                                    return this;
                                                  }
                        
                        url(url)  {
                                    this.data.url = url || '';
                                    return this;
                                  }
                        
                        thumbnail(url, width, height, proxy)  {
                                                                this.data.thumbnail.url = url || '';
                                                                this.data.thumbnail.width = width || 10;
                                                                this.data.thumbnail.height = height || 10;
                                                                this.data.thumbnail.proxy_url = proxy || '';
                                                                return this;
                                                              }
                        
                        image(url, width, height, proxy)  {
                                                            this.data.image.url = url || '';
                                                            this.data.image.width = width || 10;
                                                            this.data.image.height = height || 10;
                                                            this.data.image.proxy_url = proxy || '';
                                                            return this;
                                                          }
                      }

class timeConstruct {
                      hms(seconds)  {
                                      const returnCount = [3600, 60]
                                      .reduceRight((p, b) => r => [Math.floor(r / b)].concat(p(r % b)),	r => [r])(seconds)
                                      .map(a => a.toString().padStart(2, '0'))
                                      .join(':').split('.')[0].split(':');
                                      if (returnCount[2].length === 1) returnCount[2] = `0${returnCount[2]}`;		
                                      return  {
                                                hour: returnCount[0],
                                                minute: returnCount[1],
                                                second: returnCount[2],
                                              };
                                    }
                      
                      discord(timeInfo) {
                                          let time = ~~(Date.now() / 1000);
                                          if (timeInfo) time = ~~(Date.now(timeInfo) / 1000);
                                          return  {
                                                    shortDate: `<t:${time}:d>`,
                                                    longDate: `<t:${time}:D>`,
                                                    shortTime: `<t:${time}:t>`,
                                                    longTime: `<t:${time}:T>`,
                                                    longDateShortTime: `<t:${time}:f>`,
                                                    completeDateShortTime: `<t:${time}:F>`,
                                                    relativeTime: `<t:${time}:R>`,
                                                  };
                                        }
                      
                      date(date)  {
                                    const dName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                    const mName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                    let d = new Date();
                                    if (date) d = new Date(date);
                                    const dayNum = d.getDay();
                                    const day = d.getDate();
                                    let postfix = '';
                                    switch (day)  {
                                                    case 1 || 21 || 31:
                                                      postfix = 'st';
                                                    break;
                                                    case 2 || 22:
                                                      postfix = 'nd';
                                                    break;
                                                    case 3 || 23:
                                                      postfix = 'rd';
                                                    break;
                                                    default:
                                                      postfix = 'th';
                                                    break;
                                                  }
                                    var month = d.getMonth();
                                    var year = d.getFullYear();
                                    return  {
                                              nice: `${dName[dayNum]} ${day}${postfix} ${mName[month]} ${year}`,
                                              iso: `${year}/${month + 1}/${day}`,
                                              eur: `${day}/${month + 1}/${year}`,
                                              us: `${month + 1}/${day}/${year}`,
                                              ugly: `${new Date(date).toString() || new Date().toString()}`,
                                            };
                                  }
                      
                      clock(time) {
                                    let dTime = new Date();
                                    if (time) dTime = new Date(time);
                                    const eu = dTime.toLocaleTimeString('nl-NL');
                                    const us = dTime.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: '2-digit', hour12: true });
                                    return  {
                                              eu: eu,
                                              us: us,
                                            };
                                  }
                      
                      stamp(stampNow) {
                                        if (stampNow) return ~~(Date.now(stampNow) / 1000);
                                        return ~~(Date.now() / 1000);
                                      }
                    }

class botConstruct  {
                      presence(info, client)  {
                                                this.input =  {
                                                                since: info.start,
                                                                activities: [
                                                                              {
                                                                                name: info.name,
                                                                                type: info.type,
                                                                              },
                                                                            ],
                                                                status: info.status,
                                                                afk: false,
                                                              };
                                                this.presenceUpdate = {
                                                                        op: 3,
                                                                        d: this.input,
                                                                      };
                                                client.client.socket.send(JSON.stringify(this.presenceUpdate));
                                              }
                    }

class mimeConstruct {
                      constructor() {
                                      this.mimes =  {
                                                      '.aac': 'audio/aac',
                                                      '.abw': 'application/x-abiword',
                                                      '.arc': 'application/x-freearc',
                                                      '.avi': 'video/x-msvideo',
                                                      '.azw': 'application/vnd.amazon.ebook',
                                                      '.bin': 'application/octet-stream',
                                                      '.bmp': 'image/bmp',
                                                      '.bz': 'application/x-bzip',
                                                      '.bz2': 'application/x-bzip2',
                                                      '.csh': 'application/x-csh',
                                                      '.css': 'text/css',
                                                      '.csv': 'text/csv',
                                                      '.doc': 'application/msword',
                                                      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                      '.eot': 'application/vnd.ms-fontobject',
                                                      '.epub': 'application/epub+zip',
                                                      '.gz': 'application/gzip',
                                                      '.gif': 'image/gif',
                                                      '.htm': 'text/html',
                                                      '.html': 'text/html',
                                                      '.ico': 'image/vnd.microsoft.icon',
                                                      '.ics': 'text/calendar',
                                                      '.jar': 'application/java-archive',
                                                      '.jpeg': 'image/jpeg',
                                                      '.jpg': 'image/jpeg',
                                                      '.js': 'text/javascript',
                                                      '.json': 'application/json',
                                                      '.jsonld': 'application/ld+json',
                                                      '.mid': 'audio/midi audio/x-midi',
                                                      '.midi': 'audio/midi audio/x-midi',
                                                      '.mjs': 'text/javascript',
                                                      '.mpeg': 'video/mpeg',
                                                      '.mp3': 'audio/mpeg',
                                                      '.mpkg': 'application/vnd.apple.installer+xml',
                                                      '.odp': 'application/vnd.oasis.opendocument.presentation',
                                                      '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
                                                      '.odt': 'application/vnd.oasis.opendocument.text',
                                                      '.oga': 'audio/ogg',
                                                      '.ogv': 'video/ogg',
                                                      '.ogx': 'application/ogg',
                                                      '.opus': 'audio/opus',
                                                      '.otf': 'font/otf',
                                                      '.png': 'image/png',
                                                      '.pdf': 'application/pdf',
                                                      '.php': 'application/x-httpd-php',
                                                      '.ppt': 'application/vnd.ms-powerpoint',
                                                      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                      '.rar': 'application/vnd.rar',
                                                      '.rtf': 'application/rtf',
                                                      '.sh': 'application/x-sh',
                                                      '.svg': 'image/svg+xml',
                                                      '.swf': 'application/x-shockwave-flash',
                                                      '.tar': 'application/x-tar',
                                                      '.tif': 'image/tiff',
                                                      '.tiff': 'image/tiff',
                                                      '.ts': 'video/mp2t',
                                                      '.ttf': 'font/ttf',
                                                      '.txt': 'text/plain',
                                                      '.vsd': 'application/vnd.visio',
                                                      '.wav': 'audio/wav',
                                                      '.weba': 'audio/webm',
                                                      '.webm': 'video/webm',
                                                      '.webp': 'image/webp',
                                                      '.woff': 'font/woff',
                                                      '.woff2': 'font/woff2',
                                                      '.xhtml': 'application/xhtml+xml',
                                                      '.xls': 'application/vnd.ms-excel',
                                                      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                      '.xml': 'text/xml',
                                                      '.xul': 'application/vnd.mozilla.xul+xml',
                                                      '.zip': 'application/zip',
                                                      '.3gp': 'video/3gpp',
                                                      '.3g2': 'video/3gpp2',
                                                      '.7z': 'application/x-7z-compressed',
                                                    };
                                    }
                      
                      type(info)  {
                                    return this.mimes[info];
                                  }
                    }

module.exports =  {
                    httpsConstruct, 
                    relConstruct, 
                    appConstruct, 
                    componentConstruct, 
                    embedConstruct, 
                    timeConstruct, 
                    botConstruct, 
                    mimeConstruct
                  };
