function defer() {
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;  
  return promise;
}
module.exports =  {
  appMake:  {
    appName: 'speen', 
    appDescription: 'Speen in a voice channel',
    type: 'chatInput', 
    permissions: []
  },
  name: 'speen', 
  module: 'fun',
  async execute(msg)  {
    function failureYouAre(messageForMe) {
      return interaction.create({
        id: msg.id, 
        token: msg.token, 
        type: 'channelMessage', 
        data: {
          content: messageForMe, 
          visibleForAll: true  
        } 
      })
        .catch((err) => console.log(err)); 
    }    
    let loopCount = 0; let promiseThis = defer(); let resChannel; let noChannel; let failBig;
    await guild.getChannels({
      guild: msg.guild_id 
    })
      .then((val) => {
        let looperInfo = val.filter((gc) => gc.type == 2); if(looperInfo.length === 0) { failBig = true; promiseThis.resolve(true); }
        looperInfo.forEach(async (chan) => {
          await guild.editUserVoiceState({ 
            guild: msg.guild_id, 
            user: msg.member.user.id, 
            channel: chan.id 
          })
            .then((val) => {})
            .catch((err) => {
              if(err.code !== 50024 && err.code !== 10065) failBig = true; 
              if(err.code === 50024) resChannel = chan.id; 
              if(err.code === 10065) noChannel = true; 
            });	
          loopCount++;
          if(loopCount === looperInfo.length) promiseThis.resolve(true);
        });
      })
      .catch((err) => { failBig = true; promiseThis.resolve(true); });	
    await promiseThis;  
    if(failBig) return failureYouAre('There seem to be no channels where I can play music in, it is also possible I can\'t see them.');
    if(!resChannel) return failureYouAre('Feel free to be in a voice channel when using this command, or make sure I can see it.');
    let queueGet = await voice.queue({ guild: msg.guild_id });
    if(queueGet !== 'make a connection first') {
      if(queueGet.channel !== resChannel) return failureYouAre(`When I am playing music I refuse to SPEEN!`);
      if(queueGet.channel == resChannel) return failureYouAre(`When I am playing music I refuse to SPEEN!`);
    }
    let speenFiles = await fs.readdirSync('./assets/sound/speen', {withFileTypes: true}).filter(item => !item.isDirectory()).map(item => item.name);
    let selSpeen = path.resolve(`./assets/sound/speen/${speenFiles[Math.floor(Math.random() * speenFiles.length)]}`);
    voice.connect({
      command: resChannel, 
      channel: resChannel, 
      guild: msg.guild_id, 
      user: msg.member 
    })
      .then((connection) => {
        voice.play({
          command: {
            query: `::${selSpeen}`
          }, 
          channel: queueGet.channel, 
          guild: msg.guild_id, 
          user: msg.member 
        });
      });
    
    return interaction.create({ 
      id: msg.id, 
      token: msg.token, 
      type: 'channelMessage', 
      data: { 
        content: `SPEEN`, 
        visibleForAll: true 
      } 
    })
      .catch((err) => console.log(err));
  },
};
