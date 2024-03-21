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
appName: 'pause', 
appDescription: 'Pause the music player.', 
type: 'chatInput', 
permissions: [] 
},
name: 'pause', 
module: 'music',
async execute(msg)  {
  function failureYouAre(messageForMe)  {
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
      .catch((err) => {
    failBig = true; promiseThis.resolve(true); 
  });	
  
  await promiseThis;  
  if(failBig) return failureYouAre('There seem to be no channels where I can play music in, it is also possible I can\'t see them.');
  if(!resChannel) return failureYouAre('Feel free to be in a voice channel when using this command, or make sure I can see it.');
  
  let queueGet = await voice.queue({ guild: msg.guild_id });
  if(queueGet !== 'make a connection first')  {
  if(queueGet.channel !== resChannel) return failureYouAre(`I am already playing music in <#${queueGet.channel}>, move there to pause the player.`);
  interaction.create({
    id: msg.id, 
    token: msg.token, 
    type: 'channelMessage', 
    data: {
      content: `Processing request will post to: <#${resChannel}>`, 
      visibleForAll: true  
    } 
  })
    .catch((err) => console.log(err));
  return voice.pause({
    channel: queueGet.channel, 
    guild: msg.guild_id, 
    user: msg.member  
  })
    .then((val) =>  {
      channel.msgSend({
        content: `👤 ${msg.member.user.username}#${msg.member.user.discriminator} paused the player.`, 
        channel: queueGet.channel 
      })
        .catch((err) => console.log(err));
    })
      .catch((err) => console.log(err));
  }
  
  return interaction.create({
    id: msg.id, 
    token: msg.token, 
    type: 'channelMessage', 
    data: {
      content: `There is no music playing.`, 
      visibleForAll: true 
    } 
  })
    .catch((err) => console.log(err));
  },
};
