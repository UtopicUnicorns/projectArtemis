class heartConstruct  {
constructor() {
this.puppet;			
this.clientStruct = {
beatInterval: 5000,
beatingHeart: null,
seqNum: null,
sesNum: null,
};
let intentsNum = 0;
if (intent.GUILDS) intentsNum = intentsNum + (1 << 0);
if (intent.GUILD_MEMBERS) intentsNum = intentsNum + (1 << 1); 
if (intent.GUILD_BANS) intentsNum = intentsNum + (1 << 2);
if (intent.GUILD_EMOJIS_AND_STICKERS) intentsNum = intentsNum + (1 << 3); 
if (intent.GUILD_INTEGRATIONS) intentsNum = intentsNum + (1 << 4);
if (intent.GUILD_WEBHOOKS) intentsNum = intentsNum + (1 << 5);
if (intent.GUILD_INVITES) intentsNum = intentsNum + (1 << 6);
if (intent.GUILD_VOICE_STATES) intentsNum = intentsNum + (1 << 7);
if (intent.GUILD_PRESENCES) intentsNum = intentsNum + (1 << 8);
if (intent.GUILD_MESSAGES) intentsNum = intentsNum + (1 << 9);
if (intent.GUILD_MESSAGE_REACTIONS) intentsNum = intentsNum + (1 << 10); 
if (intent.GUILD_MESSAGE_TYPING) intentsNum = intentsNum + (1 << 11);
if (intent.DIRECT_MESSAGES) intentsNum = intentsNum +  (1 << 12);
if (intent.DIRECT_MESSAGE_REACTIONS) intentsNum = intentsNum + (1 << 13);
if (intent.DIRECT_MESSAGE_TYPING) intentsNum = intentsNum + (1 << 14);
if (intent.MESSAGE_CONTENT) intentsNum = intentsNum + (1 << 15);
if (intent.GUILD_SCHEDULED_EVENTS) intentsNum = intentsNum + (1 << 16); 
this.identifyInfo = {
op: 2,
d:  {
token: token,
intents: intentsNum,
properties: {
os: process.platform,
browser: 'ProjectArtemis',
device: 'ProjectArtemis',
},
},
};
mailMan.on('socketBeat', async () =>  {
this.clientStruct.beatingHeart++;
this.puppet.send(JSON.stringify({ op: 1, d: this.clientStruct.seqNum }));
});
mailMan.on('socketReady', async (info) => {
this.clientStruct.sesNum = info.d.session_id;
this.clientStruct.client = info.d;
mailMan.emit('socketPulse', true);
});
mailMan.on('socketMessage', async (message) =>  {
this.clientStruct.seqNum = message.s;
let messageBuild = {};
if(message.op == 0) {
messageBuild = message.d;
messageBuild['client'] = {};
messageBuild['client']['event'] = message.t;
messageBuild['client']['sequence'] = message.s;
messageBuild['client']['op'] = message.op;
messageBuild['client']['socket'] = this.puppet;
}
if (message.t) mailMan.emit(camelCase(message.t), messageBuild);
mailMan.emit("rawSocket", { message: message, socket: this.puppet });
});
mailMan.on('socket10', async (info) =>  {
if (this.clientStruct.sesNum && this.clientStruct.seqNum) {
this.clientResume = {
                op: 6,
                d:  {
                      token: token,
                      session_id: this.clientStruct.sesNum,
                      seq: this.clientStruct.seqNum,
                    },
              };
this.puppet.send(JSON.stringify(this.clientResume));
} else {
mailMan.emit('socketIdentify');
mailMan.emit('socketInterval', info.heartbeat_interval);
}
});
mailMan.on('socketResume', async (info) => mailMan.emit('socketPulse', true));
mailMan.on('socketInterval', async (info) => (this.clientStruct.beatInterval = info));
mailMan.on('socketClose', async (code) => this.restart());
mailMan.on('socketPulse', async (order) => this.pulse(order));
mailMan.on('socketIdentify', async () => this.puppet.send(JSON.stringify(this.identifyInfo)));
mailMan.on('socketPing', async () => this.puppet.send(JSON.stringify({ op: 1 })));
mailMan.on('socketError', async (error) => console.log(error));
}

run() {
this.puppet = new ws.WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
this.socket();
return this;
}

restart() {
this.puppet = '';
setTimeout(() => this.run(), 5000);
return this;
}

getSocket() {
return this.puppet;
}

pulse(order)  {
if (order)  {
this.beat = setInterval(function () {
mailMan.emit('socketBeat');
}, this.clientStruct.beatInterval);
} else clearInterval(this.beat);
return this;
}

socket()  {
this.puppet.on('message', async function incoming(message)  {
try {
const msg = JSON.parse(message);
if (msg.op == 10 && msg.d) mailMan.emit('socket10', msg.d);
if (msg.op == 1) mailMan.emit('socketPing');
if (msg.t == 'GUILD_CREATE') mailMan.emit('cacheUpdate', { guild: msg.d });
if (msg.t == 'GUILD_MEMBER_UPDATE') mailMan.emit('cacheUpdate', { member: msg.d} );
if (msg.t == 'READY') mailMan.emit('socketReady', msg);
if (msg.t == 'RESUMED') mailMan.emit('socketResume', msg);
if (msg.t == 'VOICE_STATE_UPDATE') mailMan.emit('voiceStateUpdateSend', msg);
if (msg.t == 'VOICE_SERVER_UPDATE') mailMan.emit('voiceServerUpdateSend', msg);
mailMan.emit('socketMessage', msg);
} catch (err) { 
mailMan.emit('socketError', error); 
}
});
this.puppet.on('error', (error) => mailMan.emit('socketError', error));
this.puppet.on('close', (code) => {
mailMan.emit('socketClose', code);
mailMan.emit('socketPulse', false);
});
return this;
}
}

module.exports = heartConstruct;
