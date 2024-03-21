/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
class gatingWay { /* gateway class */
  constructor() { /* Setup core essentials */
    this.hunt = new sendData(); /* HTTP request handler for API calls */
    this.intel = { /* collect socket(s), shards */
      main: {
        startMe: null, /* Should app start */
        intent: this.calcPerm( configContent.intent ) /* Calculates intents */
      }, 
      shards: {} /* Collects shards */
    };
  }
  
  calcPerm( intentKey ) { /* Calculate intents */
    let intentToGet = 0; /* bitsum hold */
    if (intentKey.guilds) intentToGet = intentToGet + (1 << 0);
    if (intentKey.guildMembers) intentToGet = intentToGet + (1 << 1); 
    if (intentKey.guildBans) intentToGet = intentToGet + (1 << 2);
    if (intentKey.guildEmojisAndStickers) intentToGet = intentToGet + (1 << 3); 
    if (intentKey.guildIntegrations) intentToGet = intentToGet + (1 << 4);
    if (intentKey.guildWebhooks) intentToGet = intentToGet + (1 << 5);
    if (intentKey.guildInvites) intentToGet = intentToGet + (1 << 6);
    if (intentKey.guildVoiceStates) intentToGet = intentToGet + (1 << 7);
    if (intentKey.guildPresences) intentToGet = intentToGet + (1 << 8);
    if (intentKey.guildMessages) intentToGet = intentToGet + (1 << 9);
    if (intentKey.guildMessageReactions) intentToGet = intentToGet + (1 << 10); 
    if (intentKey.guildMessageTyping) intentToGet = intentToGet + (1 << 11);
    if (intentKey.directMessages) intentToGet = intentToGet +  (1 << 12);
    if (intentKey.directMessageReactions) intentToGet = intentToGet + (1 << 13);
    if (intentKey.directMessageTyping) intentToGet = intentToGet + (1 << 14);
    if (intentKey.messageContent) intentToGet = intentToGet + (1 << 15);
    if (intentKey.guildScheduledEvents) intentToGet = intentToGet + (1 << 16);
    if (intentKey.autoModerationConfiguration) intentToGet = intentToGet + (1 << 20);
    if (intentKey.autoModerationExecution) intentToGet = intentToGet + (1 << 21);
    return intentToGet; /* Return a flat int for intents */
  }
  
  async setUp( inc ) { /* Prepare for first start */
    let firstCall = await this.hunt.fly('', globalsJSON.botUrl, 'GET', globalsJSON.discordUrl, 443, { 'User-Agent': 'DiscordBot', 'Content-Type': 'application/json', Authorization: `Bot ${configContent.botToken}` }); /* Very first call for info */
    this.intel.main.socketUrl = `${firstCall.url}${globalsJSON.socketSuffix}`; /* Log wss url */
    this.intel.main.shardSum = firstCall.shards + 2; /* Log shard sum */
    this.intel.main.startMe = true; /* Notify that app may start */
    let shardWait = snapString(); /* Wait for next function to clear */
    
    for (let i = 1; i <= this.intel.main.shardSum; i++) { /* Loop trough the amount of asigned shards */
      setTimeout(() => { /* Make loop every x seconds */
        this.intel.shards[i] = {}; /* Make new entry for upcoming shard */
        this.intel.shards[i].socket = new ws.WebSocket(this.intel.main.socketUrl); /* Open websocket for shard */
        this.intel.shards[i].info = { pulse: null, heartbeat: null, resume: null, sequence: null, session: null, resume: null }; /* Shard info hold */
        this.shardWatch(i); /* Monitor the new shard */
        if(i === this.intel.main.shardSum) shardWait.resolve(); /* If loop is done, resolve */
      }, i * 5000); /* Redo after x seconds */
    }
    
    await shardWait; /* Wait for shards */
    branch.emit('appReady', 'app is ready', this.intel); /* Emit that shards are done initializing */
    return this; /* Return and continue app */
  }
  
  async shardWatch( shard ) { /* Manage shard events */
    try { /* Try handling the events */
      const socket = this.intel.shards[shard].socket; /* Change name to something smaller */
      
      const onOpen = async () => { /* console.log(`WebSocket opened for shard ${shard}`) */ }; /* Open event function */
      
      const onMessage = async (spore) => { /* Message event function */
        try { /* Parsing and handling message */
          const msg = JSON.parse(spore); /* Parse incoming message */
          if(msg.op === 1) this.shardCommunicate( shard, 1, this.intel.shards[shard].info.sequence ); /* If gateway requests ping */
          if(msg.op === 9) this.burnTrees(); /* handle invalid session */
          if(msg.s !== null) this.intel.shards[shard].info.sequence = msg.s; /* pass sequence number */
          if(msg.op === 10) this.opTen(shard, msg); /* Pass op 10 */
          if(msg.t && msg.t == 'READY') this.readyShard(shard, msg); /* Pass ready */
          if(msg.t) branch.emit('pureEvent', snakeCase(msg.t), msg.d, shard, this.intel.shards[shard].socket); /* Pass pure event */
          if(msg.t) parseMe.gateEvent({ eventName: snakeCase(msg.t), eventData: msg.d, shardNumber: shard, shardSocket: this.intel.shards[shard].socket }); /* Pass on to parser */
        } catch (e) { /* Most likely a JSON parse error */
          branch.emit('logger', 'gateError', `Shard ${shard} reports`, e); /* Emit error */
        }
      };
      
      const onClose = async (spore) => { /* Close event function */
        branch.emit('logger', 'gateError', `Shard ${shard} reports close: `, spore); /* Emit closure */
        removeListeners(); /* Remove listeners */
        this.lostShard( shard ); /* Trigger on lost shard */
      };

      const onError = async (spore) => { /* Error event function */
        branch.emit('logger', 'gateError', `Shard ${shard} reports error: `, spore); /* Emit error */
        removeListeners(); /* Remove listeners */
        this.lostShard( shard ); /* Trigger on lost shard */
      };
      
      socket.on('open', onOpen); /* Open event listener */
      socket.on('message', onMessage); /* Message event listener */
      socket.on('close', onClose); /* Close event listener */
      socket.on('error', onError); /* Error event listener */
      
      function removeListeners() { /* Function to remove listeners */
        socket.removeListener('open', onOpen); /* Remove open listener */
        socket.removeListener('message', onMessage); /* Remove message listener */
        socket.removeListener('close', onClose); /* Remove close listener */
        socket.removeListener('error', onError); /* Remove error listener */ 
      }      
    } catch (e) { /* If handling goes wrong */
      branch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e); /* Emit error */
    }
  }
  
  async burnTrees() { /* Close all shards, clear intervals, close listeners */
    this.intel.main.startMe = false; /* stop the start */
    branch.emit('logger', 'gateInfo', `All shards are getting burned `, 'Standby to catch the ashes'); /* Emit error/info */
    try { /* try to end this mans career */
      for (let i = 1; i <= this.intel.main.shardSum; i++) { /* loop trough shards */
        if (this.intel.shards[i] && this.intel.shards[i].info.pulse) { /* if shard and interval exists */
          clearInterval(this.intel.shards[i].info.pulse); /* clear interval */
        }
      }

      for (let i = 1; i <= this.intel.main.shardSum; i++) { /* loop trough each shard */
        if (this.intel.shards[i] && this.intel.shards[i].socket) { /* if socket and shard exists */
          this.intel.shards[i].socket.close(); /* close shard */
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); /* await closures */
      this.intel.shards = {}; /* clear shard data */
      branch.emit('logger', 'gateInfo', `Shards burned `, 'attempting restart'); /* Emit info */
      this.setUp(); /* restart shards */
    } catch (e) { /* shard burning went wrong trigger close */
      branch.emit('logger', 'gateError', 'Error burning shards: ', e);
      process.exit();
    }
  }
  
  async lostShard( shard ) { /* incase shard gets disconnected */
    if(this.intel.shards[shard].info.pulse) { /* if pulse, remove it */
      try { /* try removal */
        clearInterval(this.intel.shards[shard].info.pulse) /* Remove pulse */
      } catch(e) { /* this might be bad */
        branch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e); /* Emit error */
      }
    }
    
    this.intel.shards[shard].socket = null; /* empty socket */
    if (!this.intel.main.startMe) return; /* Do not trigger when not true */
    branch.emit('logger', 'gateInfo', `Shard ${shard} lost connection: `, 'Attempting reconnect'); /* Emit error */
    setTimeout(() => { /* Pass after x seconds */
      this.intel.shards[shard].socket = new ws.WebSocket(this.intel.shards[shard].info.resume); /* Open websocket for shard */
      this.shardWatch(shard); /* Monitor the new shard */
    }, 1000);
  }
  
  async readyShard( shard, data ) { /* Handle shard ready */
    this.intel.shards[shard].info.session = data.d.session_id; /* set session ID */
    this.intel.shards[shard].info.resume = `${data.d.resume_gateway_url}${globalsJSON.socketSuffix}`; /* set session Resume */
  }
  
  async opTen( shard, data ) { /* Handle op 10 */
    try { /* pass as try...catch */
      let identifyMe; /* identify info to pass */
      if(this.intel.shards[shard].info.session !== null) { /* if session number, try resume */
        identifyMe = {
          op: 6, /* Resumal op code */
          d:  {
            token: configContent.botToken, /* repass bot token */
            session_id: this.intel.shards[shard].info.session, /* Pass session ID */
            seq: this.intel.shards[shard].info.sequence /* Give latest sequence number for resumal */
          }
        };
      } else { /* if no session number, handle as new */
        identifyMe = {
          op: 2, /* 2 identification op */
          d: {
            token: configContent.botToken, /* pass token */
            properties: { /* still no clue why this is relevant */
              os: 'Linux',
              browser: 'projectBow',
              device: 'projectBow'
            },
            compress: false, /* dont compress, else json errors */
            large_threshold: 250, /* garbage */
            shard: [shard-1, this.intel.main.shardSum], /* shard x of max shards */
            intents: this.intel.main.intent /* intents to tell what events we want */
          }
        };
      }
      this.shardCommunicate(shard, identifyMe.op, identifyMe.d); /* Pass identify/resume */
      this.intel.shards[shard].info.heartbeat = data.d.heartbeat_interval; /* Set heatbeat interval */
      setTimeout(() => { /* Pass after x seconds */
        this.shardCommunicate(shard, 1, this.intel.shards[shard].info.sequence); /* Send pulse */
      }, data.d.heartbeat_interval * Math.random());
      
      this.intel.shards[shard].info.pulse = setInterval(() => { /* initiate pulse */
        this.shardCommunicate(shard, 1, this.intel.shards[shard].info.sequence); /* Send pulse with sequence number */
      }, this.intel.shards[shard].info.heartbeat); /* Repeat every cycle */
    } catch(e) { /* Catch error */
      branch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e); /* Emit error */
    }
  }
  
  async shardCommunicate( shard, op, d ) { /* Send message trough the socket */
    try { /* Relay message */
      this.intel.shards[shard].socket.send(JSON.stringify({ op: op, d: d })); /* Data to send */
    } catch(e) { /* Catch error */
      branch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e); /* Emit error */
    }
  }
}

global.gateWay = gatingWay; /* Globalize gatingWay */
export const gateWay = global.gateWay; /* export for use */

