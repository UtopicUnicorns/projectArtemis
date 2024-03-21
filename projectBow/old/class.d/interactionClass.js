class interactionConstruct  {
                              readyMessageUpload(upload, message) {
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
                              
                              intTypeSelect(selection)  {
                                                          let typeSelect =  {
                                                                              pong: 1,
                                                                              channelMessage: 4,
                                                                              deferedChannelMessage: 5,
                                                                              deferedUpdateMessage: 6,
                                                                              updateMessage: 7,
                                                                              appCommandAutocompleteResult: 8,
                                                                              modal: 9
                                                                            };
                                                          return typeSelect[selection];
                                                        }
                              
                              processData(msg, formMessage) {
                                                              let formMessage2 = {type: formMessage.type, data: {}};
                                                              if(msg.data)  {
                                                                              if(msg.data.tts) formMessage2['data']['tts'] = msg.data.tts;
                                                                              if(msg.data.content) formMessage2['data']['content'] = msg.data.content;
                                                                              if(msg.data.embeds) formMessage2['data']['embeds'] = [msg.data.embeds];
                                                                              if(msg.data.visibleForAll) formMessage2['data']['flags'] = 1 << 6;
                                                                              if(msg.data.components) formMessage2['data']['components'] = [msg.data.components];
                                                                            }
                                                              return this.readyMessageUpload(msg.data, formMessage2);
                                                            }
                              
                              create(msg) {
                                            let formMessage = {};
                                            if(msg.type) formMessage['type'] = this.intTypeSelect(msg.type);
                                            let returnCalls = this.processData(msg, formMessage);
                                            return exit.call('createInteractionResponse', {interactionId: msg.id, interactionToken: msg.token, data: returnCalls[0], type: `multipart/form-data; boundary=${returnCalls[1]}`});
                                          }
                              
                              getOriginalResponse(msg)  {
                                                          let formQuery = '';
                                                          if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                          return exit.call('getOriginalInteractionResponse', {applicationId: appId, query: formQuery, interactionToken: msg.token, data: '', type: `application/json`});
                                                        }
                              
                              editOriginalResponse(msg) {
                                                          let formQuery = '';
                                                          if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                          let formMessage = {};
                                                          if (msg.content) formMessage['content'] = msg.content;
                                                          if (msg.components) formMessage['components'] = [msg.components];
                                                          if (msg.embeds) formMessage['embeds'] = [msg.embeds];
                                                          let returnCalls = this.readyMessageUpload(msg, formMessage);
                                                          return exit.call('editOriginalInteractionResponse', {applicationId: appId, query: formQuery, interactionToken: msg.token, data: returnCalls[0], type: `multipart/form-data; boundary=${returnCalls[1]}`});
                                                        }
                              
                              deleteOriginalResponse(msg) {
                                                            return exit.call('deleteOriginalInteractionResponse', {applicationId: appId, interactionToken: msg.token, data: '', type: `application/json`});
                                                          }
                              
                              createFollowupResponse(msg) {
                                                            let formQuery = '';
                                                            if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                            let formMessage = {};
                                                            if (msg.content) formMessage['content'] = msg.content;
                                                            if (msg.components) formMessage['components'] = [msg.components];
                                                            if (msg.embeds) formMessage['embeds'] = [msg.embeds];
                                                            let returnCalls = this.readyMessageUpload(msg, formMessage);
                                                            return exit.call('createFollowupMessage', {applicationId: appId, query: formQuery, interactionToken: msg.token, data: returnCalls[0], type: `multipart/form-data; boundary=${returnCalls[1]}`});
                                                          }
                              
                              getFollowupResponse(msg)  {
                                                          let formQuery = '';
                                                          if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                          return exit.call('getFollowupMessage', {messageId: msg.message, applicationId: appId, query: formQuery, interactionToken: msg.token, data: '', type: `application/json`});
                                                        }
                              
                              editFollowupResponse(msg) {
                                                          let formQuery = '';
                                                          if(msg.thread) formQuery = `thread_id=${msg.thread}`;
                                                          let formMessage = {};
                                                          if (msg.content) formMessage['content'] = msg.content;
                                                          if (msg.components) formMessage['components'] = [msg.components];
                                                          if (msg.embeds) formMessage['embeds'] = [msg.embeds];
                                                          let returnCalls = this.readyMessageUpload(msg, formMessage);
                                                          return exit.call('editFollowupMessage', {messageId: msg.message, applicationId: appId, query: formQuery, interactionToken: msg.token, data: returnCalls[0], type: `multipart/form-data; boundary=${returnCalls[1]}`});
                                                        }
                              
                              deleteFollowupResponse(msg) {
                                                            return exit.call('deleteFollowupMessage', {messageId: msg.message, applicationId: appId, interactionToken: msg.token, data: '', type: `application/json`});
                                                          }
                            }

module.exports = interactionConstruct;
