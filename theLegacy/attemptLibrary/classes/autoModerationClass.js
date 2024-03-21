  class autoModerationConstruct {
                                  procEventType(option) {
                                                          let procEventTypeopt =  {
                                                                                    messageSend: 1
                                                                                  };
                                                          return procEventTypeopt[option];
                                                        }
                                  
                                  procEventTrigger(option)  {
                                                              let procEventTriggeropt = {
                                                                                          keyWord: 1,
                                                                                          harmfulLink: 2,
                                                                                          spam: 3,
                                                                                          keyWordPreset: 4
                                                                                        };
                                                              return procEventTriggeropt[option];
                                                            }
                                  
                                  procMetaData(inp) {
                                                      let backThisData = inp;
                                                      if(inp.presets) {
                                                                        let filterPre = {
                                                                                          profanity: 1, 
                                                                                          sexualContent: 2, 
                                                                                          slurs: 3
                                                                                        };
                                                                        let returnArray = [];
                                                                        for (let i of inp.presets)  {
                                                                                                      returnArray.push(filterPre[i]);
                                                                                                    }
                                                                        backThisData['presets'] = returnArray;
                                                                      }
                                                      return backThisData;
                                                    }
                                  
                                  procActionData(inp) {
                                                        let actionTypeList =  {
                                                                                blockMessage: 1,
                                                                                sendAlert: 2,
                                                                                timeOut: 3,
                                                                              };
                                                        for (let i of inp)  {
                                                                              i.type = actionTypeList[i.type];
                                                                            }
                                                        return inp;
                                                      }
                                  
                                  listRules(msg)  {
                                                    return exit.call('listAutoModerationRulesforGuild', {guildId: msg.guild, data: '', type: `application/json`});
                                                  }
                                  
                                  getRule(msg)  {
                                                  return exit.call('getAutoModerationRule', {guildId: msg.guild, autoModerationRuleId: msg.rule, data: '', type: `application/json`});
                                                }
                                  
                                  createRule(msg) {
                                                    let formMessage = {};
                                                    if(msg.name) formMessage['name'] = msg.name;
                                                    if(msg.eventType) formMessage['event_type'] = this.procEventType(msg.eventType);
                                                    if(msg.triggerType) formMessage['trigger_type'] = this.procEventTrigger(msg.triggerType);
                                                    if(msg.triggerMetadata) formMessage['trigger_metadata'] = this.procMetaData(msg.triggerMetadata);
                                                    if(msg.actions) formMessage['actions'] = this.procActionData(msg.actions);
                                                    if(msg.enabled) formMessage['enabled'] = msg.enabled;
                                                    if(msg.excludeRoles) formMessage['exempt_roles'] = msg.excludeRoles;
                                                    if(msg.excludeChannels) formMessage['exempt_channels'] = msg.excludeChannels;
                                                    return exit.call('createAutoModerationRule', {guildId: msg.guild ,data: JSON.stringify(formMessage), type: `application/json`});
                                                  }
                                  
                                  editRule(msg) {
                                                  let formMessage = {};
                                                  if(msg.name) formMessage['name'] = msg.name;
                                                  if(msg.eventType) formMessage['event_type'] = this.procEventType(msg.eventType);
                                                  if(msg.triggerType) formMessage['trigger_type'] = this.procEventTrigger(msg.triggerType);
                                                  if(msg.triggerMetadata) formMessage['trigger_metadata'] = this.procMetaData(msg.triggerMetadata);
                                                  if(msg.actions) formMessage['actions'] = this.procActionData(msg.actions);
                                                  if(msg.enabled) formMessage['enabled'] = msg.enabled;
                                                  if(msg.excludeRoles) formMessage['exempt_roles'] = msg.excludeRoles;
                                                  if(msg.excludeChannels) formMessage['exempt_channels'] = msg.excludeChannels;
                                                  return exit.call('modifyAutoModerationRule', {guildId: msg.guild, autoModerationRuleId: msg.rule ,data: JSON.stringify(formMessage), type: `application/json`});
                                                }
                                  
                                  removeRule(msg) {
                                                    return exit.call('deleteAutoModerationRule', {guildId: msg.guild, autoModerationRuleId: msg.rule, data: '', type: `application/json`});
                                                  }
                                }
  
  module.exports = autoModerationConstruct;
