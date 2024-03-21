/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
class gatingWay {
  constructor() {
    this.intel = {
      main: {
        startMe: null,
        intent: this.calcPerm( configContent.intent )
      },
      shards: {}
    };
  }
  
  calcPerm( intentKey ) {
    let intentToGet = 0;
    if (intentKey.guilds) intentToGet = intentToGet + (1 << 0)
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
    return intentToGet;
  }
  
  async setUp( inc ) {
    let firstCall = await new handleData().get({ endPoint: globalsJSON.botUrl });
    this.intel.main.socketUrl = `${firstCall.url}${globalsJSON.socketSuffix}`;
    this.intel.main.shardSum = firstCall.shards + 2;
    this.intel.main.startMe = true;
    let shardWait = snapString();
    
    for (let i = 1; i <= this.intel.main.shardSum; i++) {
      setTimeout(() => {
        this.intel.shards[i] = {};
        this.intel.shards[i].socket = new ws.WebSocket(this.intel.main.socketUrl);
        this.intel.shards[i].info = { pulse: null, heartbeat: null, resume: null, sequence: null, session: null, resume: null };
        this.shardWatch(i);
        if(i === this.intel.main.shardSum) shardWait.resolve();
      }, i * 5000);
    }
    
    await shardWait;
    treeBranch.emit('appReady', 'app is ready', this.intel);
    return this;
  }
  
  async shardWatch( shard ) {
    try {
      const socket = this.intel.shards[shard].socket;
      
      const onOpen = async () => {  };
      
      const onMessage = async (spore) => {
        try {
          const msg = JSON.parse(spore);
          if(msg.op === 1) this.shardCommunicate( shard, 1, this.intel.shards[shard].info.sequence );
          if(msg.op === 9) this.burnTrees();
          if(msg.s !== null) this.intel.shards[shard].info.sequence = msg.s;
          if(msg.op === 10) this.opTen(shard, msg);
          if(msg.t && msg.t == 'READY') this.readyShard(shard, msg);
          if(msg.t) treeBranch.emit('pureEvent', snakeCase(msg.t), msg.d, shard, this.intel.shards[shard].socket);
          if(msg.t) parseMe.gateEvent({ eventName: snakeCase(msg.t), eventData: msg.d, shardNumber: shard, shardSocket: this.intel.shards[shard].socket });
        } catch(e) {
          treeBranch.emit('logger', 'gateError', `Shard ${shard} reports`, e);
        }
      };
      
      const onClose = async (spore) => {
        let statusClosures = {
          '1000': 'Normal Closure',
          '1001': 'Going Away',
          '1002': 'Protocol Error',
          '1003': 'Unsupported Data',
          '1004': '(For future)',
          '1005': 'No Status Received',
          '1006': 'Abnormal Closure',
          '1007': 'Invalid frame payload data',
          '1008': 'Policy Violation',
          '1009': 'Message too big',
          '1010': 'Missing Extension',
          '1011': 'Internal Error',
          '1012': 'Service Restart',
          '1013': 'Try Again Later',
          '1014': 'Bad Gateway',
          '1015': 'TLS Handshake'
        };
        
        treeBranch.emit('logger', 'gateError', `Shard ${shard} reports close: `, statusClosures[spore]);
        removeListeners();
        this.lostShard( shard );
      };

      const onError = async (spore) => {
        treeBranch.emit('logger', 'gateError', `Shard ${shard} reports error: `, spore);
        removeListeners();
        this.lostShard( shard );
      };
      
      socket.on('open', onOpen);
      socket.on('message', onMessage);
      socket.on('close', onClose);
      socket.on('error', onError);
      
      function removeListeners() { 
        socket.removeListener('open', onOpen);
        socket.removeListener('message', onMessage);
        socket.removeListener('close', onClose);
        socket.removeListener('error', onError);
      }
    } catch(e) {
      treeBranch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e);
    }
  }
  
  async burnTrees() {
    this.intel.main.startMe = false;
    treeBranch.emit('logger', 'gateInfo', `All shards are getting burned `, 'Standby to catch the ashes');
    try {
      for (let i = 1; i <= this.intel.main.shardSum; i++) {
        if (this.intel.shards[i] && this.intel.shards[i].info.pulse) {
          clearInterval(this.intel.shards[i].info.pulse);
        }
      }

      for (let i = 1; i <= this.intel.main.shardSum; i++) {
        if (this.intel.shards[i] && this.intel.shards[i].socket) {
          this.intel.shards[i].socket.close();
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.intel.shards = {};
      treeBranch.emit('logger', 'gateInfo', `Shards burned `, 'attempting restart');
      this.setUp();
    } catch(e) {
      treeBranch.emit('logger', 'gateError', 'Error burning shards: ', e);
      process.exit();
    }
  }
  
  async lostShard( shard ) {
    if(this.intel.shards[shard].info.pulse) {
      try {
        clearInterval(this.intel.shards[shard].info.pulse);
      } catch(e) {
        treeBranch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e);
      }
    }
    
    this.intel.shards[shard].socket = null;
    if (!this.intel.main.startMe) return;
    treeBranch.emit('logger', 'gateInfo', `Shard ${shard} lost connection: `, 'Attempting reconnect');
    setTimeout(() => {
      this.intel.shards[shard].socket = new ws.WebSocket(this.intel.shards[shard].info.resume);
      this.shardWatch(shard);
    }, 1000);
  }
  
  async readyShard( shard, data ) {
    this.intel.shards[shard].info.session = data.d.session_id;
    this.intel.shards[shard].info.resume = `${data.d.resume_gateway_url}${globalsJSON.socketSuffix}`;
  }
  
  async opTen( shard, data ) {
    try {
      let identifyMe;
      if(this.intel.shards[shard].info.session !== null) {
        identifyMe = {
          op: 6,
          d:  {
            token: configContent.botToken,
            session_id: this.intel.shards[shard].info.session,
            seq: this.intel.shards[shard].info.sequence
          }
        };
      } else {
        identifyMe = {
          op: 2,
          d: {
            token: configContent.botToken,
            properties: {
              os: 'Linux',
              browser: 'projectBow',
              device: 'projectBow'
            },
            compress: false,
            large_threshold: 250,
            shard: [shard-1, this.intel.main.shardSum],
            intents: this.intel.main.intent
          }
        };
      }
      this.shardCommunicate(shard, identifyMe.op, identifyMe.d);
      this.intel.shards[shard].info.heartbeat = data.d.heartbeat_interval;
      setTimeout(() => {
        this.shardCommunicate(shard, 1, this.intel.shards[shard].info.sequence);
      }, data.d.heartbeat_interval * Math.random());
      
      this.intel.shards[shard].info.pulse = setInterval(() => {
        this.shardCommunicate(shard, 1, this.intel.shards[shard].info.sequence);
      }, this.intel.shards[shard].info.heartbeat);
    } catch(e) {
      treeBranch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e);
    }
  }
  
  async shardCommunicate( shard, op, d ) {
    try { 
      this.intel.shards[shard].socket.send(JSON.stringify({ op: op, d: d }));
    } catch(e) {
      treeBranch.emit('logger', 'gateError', `Shard ${shard} reports error: `, e);
    }
  }
}

global.gateWay = gatingWay;
export const gateWay = global.gateWay;

