class presenceConstruct   {
                            statusTypeParse(typeParse)  {
                                                          const selectType = {
                                                                              game: 0,
                                                                              streaming: 1,
                                                                              listening: 2,
                                                                              watching: 3,
                                                                              custom: 4,
                                                                              competing: 5
                                                                            };
                                                          return selectType[typeParse];
                                                        }
                            
                            set(info, msg)  {
                                              const socketSelect = msg.client.socket;
                                              let statusObject =  {};
                                              if(info.status) statusObject['status'] = info.status;
                                              if(info.status !== 'afk') {
                                                                          statusObject['since'] = null;
                                                                          statusObject['afk'] = false;
                                                                        }
                                              if(info.status == 'afk')  { 
                                                                          statusObject['since'] = Math.floor(Date.now() / 1000);
                                                                          statusObject['afk'] = true;
                                                                        }
                                              if(info.activities) {
                                                                    statusObject['activities'] = [{}];
                                                                    if(info.activities.name) statusObject.activities[0]['name'] = info.activities.name;
                                                                    if(info.activities.type) statusObject.activities[0]['type'] = this.statusTypeParse(info.activities.type);
                                                                  }
                                              let socketObject =  {
                                                                    op: 3,
                                                                    d: statusObject
                                                                  };
                                              
                                              return socketSelect.send(JSON.stringify(socketObject));
                                            }
                         }

module.exports = presenceConstruct;
