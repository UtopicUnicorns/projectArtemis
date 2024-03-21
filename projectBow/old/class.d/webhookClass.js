class webhookConstruct  {
                          processAvatar(image)  {
                                                  let ext = path.extname(image.toLowerCase());
                                                  let mime_type = mime.type(ext);
                                                  let imageObject = fs.readFileSync(image, {encoding: 'base64'});
                                                  let sendObject = `data:${mime_type};base64,${imageObject}`;
                                                  return sendObject;
                                                }
                          
                          readyMessage(upload, message) {
                                                          let uploads = [];
                                                          let fields = {};	
                                                          if(upload && upload.attachments)  {
                                                                                              for (let i of upload.attachments) {
                                                                                                                                  let ext = path.extname(i.file.toLowerCase());
                                                                                                                                  let mime_type = mime.type(ext);
                                                                                                                                  let attachmentConstruct = {
                                                                                                                                                              id: uploads.length,
                                                                                                                                                              description: i.description,
                                                                                                                                                              filename: i.filename,
                                                                                                                                                            };
                                                                                                                                  fields[`files[${uploads.length}]`] =  {
                                                                                                                                                                          name: i.filename,
                                                                                                                                                                          type: mime_type,
                                                                                                                                                                          data: fs.readFileSync(i.file),
                                                                                                                                                                        };
                                                                                                                                  uploads.push(attachmentConstruct);
                                                                                                                                }
                                                                                            }
                                                          fields['payload_json'] = JSON.stringify(message);
                                                          const boundary = fd.generateBoundary();
                                                          const header = { 'Content-Type': `multipart/form-data; boundary=${boundary}` };
                                                          const contentType = `multipart/form-data; boundary=${boundary}`;
                                                          const body = fd(fields, boundary);
                                                          let fetcher = [];
                                                          for (let i of body) { fetcher.push(Buffer.from(i)); }
                                                          let newBuffer = Buffer.concat(fetcher);
                                                          return [newBuffer, contentType];
                                                        }
                          
                          create(msg) {
                                        let formMessage = {};
                                        if(msg.name) formMessage['name'] = msg.name;
                                        if(msg.avatar) formMessage['avatar'] = this.processAvatar(msg.avatar);
                                        return exit.call('createWebhook', {channelId: msg.channel, data: JSON.stringify(formMessage), type: `application/json`});
                                      }
                          
                          getChannelHooks(msg)  {
                                                  return exit.call('getChannelWebhooks', {channelId: msg.channel, data: '', type: `application/json`});
                                                }
                          
                          getGuildHooks(msg)  {
                                                return exit.call('getGuildWebhooks', {guildId: msg.guild, data: '', type: `application/json`});
                                              }
                          
                          getHook(msg)  {
                                          return exit.call('getWebhook', {webhookId: msg.webhook, data: '', type: `application/json`});
                                        }
                          
                          getHookWithToken(msg) {
                                                return exit.call('getWebhookwithToken', {webhookId: msg.webhook, webhookToken: msg.token, data: '', type: `application/json`});
                                                }
                          
                          editHook(msg) {
                                          let formMessage = {};
                                          if(msg.name) formMessage['name'] = msg.name;
                                          if(msg.avatar) formMessage['avatar'] = this.processAvatar(msg.avatar);
                                          if(msg.channel) formMessage['channel_id'] = msg.channel;
                                          return exit.call('modifyWebhook', {webhookId: msg.webhook, data: JSON.stringify(formMessage), type: `application/json`});
                                        }
                          
                          editHookWithToken(msg)  {
                                                    let formMessage = {};
                                                    if(msg.name) formMessage['name'] = msg.name;
                                                    if(msg.avatar) formMessage['avatar'] = this.processAvatar(msg.avatar);
                                                    if(msg.channel) formMessage['channel_id'] = msg.channel;
                                                    return exit.call('modifyWebhookwithToken', {webhookId: msg.webhook, webhookToken: msg.token, data: JSON.stringify(formMessage), type: `application/json`});
                                                  }
                          
                          deleteHook(msg) {
                                            return exit.call('deleteWebhook', {webhookId: msg.webhook, data: '', type: `application/json`});
                                          }
                          
                          deleteHookWithToken(msg)  {
                                                      return exit.call('deleteWebhookwithToken', {webhookId: msg.webhook, webhookToken: msg.token, data: '', type: `application/json`});
                                                    }
                          
                          execHook(msg) {
                                          let formQuery = '';
                                          if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                          let formMessage = {};
                                          if (msg.content) formMessage['content'] = msg.content;
                                          if (msg.username) formMessage['username'] = msg.username;
                                          if (msg.avatar) formMessage['avatar_url'] = msg.avatar;
                                          if (msg.components) formMessage['components'] = [msg.components];
                                          if (msg.embeds) formMessage['embeds'] = [msg.embeds];
                                          if (msg.tts) formMessage['tts'] = msg.tts;
                                          if(msg.threadName) formMessage['thread_name'] = msg.threadName;
                                          let uploadData = this.readyMessage(msg, formMessage);
                                          return exit.call('executeWebhook', {query: formQuery, webhookId: msg.webhook, webhookToken: msg.token ,data: uploadData[0], type: `multipart/form-data; boundary=${uploadData[1]}`});
                                        }
                          
                          execSlackHook(msg)  {
                                                let formQuery = '';
                                                if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                return exit.call('executeSlackCompatibleWebhook', {query: formQuery, webhookId: msg.webhook, webhookToken: msg.token, data: '', type: `application/json`});
                                              }
                          
                          execGitHook(msg)  {
                                              let formQuery = '';
                                              if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                              return exit.call('executeGitHubCompatibleWebhook', {query: formQuery, webhookId: msg.webhook, webhookToken: msg.token, data: '', type: `application/json`});
                                            }
                          
                          getHookMessage(msg) {
                                                let formQuery = '';
                                                if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                return exit.call('getWebhookMessage', {query: formQuery, messageId: msg.message, webhookId: msg.webhook, webhookToken: msg.token, data: '', type: `application/json`});
                                              }
                          
                          editHookMessage(msg)  {
                                                  let formQuery = '';
                                                  if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                  let formMessage = {};
                                                  if (msg.content) formMessage['content'] = msg.content;
                                                  if (msg.components) formMessage['components'] = [msg.components];
                                                  if (msg.embeds) formMessage['embeds'] = [msg.embeds];
                                                  let uploadData = this.readyMessage(msg, formMessage);
                                                  return exit.call('editWebhookMessage', {query: formQuery, messageId: msg.message, webhookId: msg.webhook, webhookToken: msg.token ,data: uploadData[0], type: `multipart/form-data; boundary=${uploadData[1]}`});
                                                }
                          
                          deleteHookMessage(msg)  {
                                                    let formQuery = '';
                                                    if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                    return exit.call('deleteWebhookMessage', {query: formQuery, messageId: msg.message, webhookId: msg.webhook, webhookToken: msg.token, data: '', type: `application/json`});
                                                  }
                        }

module.exports = webhookConstruct;
