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
    appName: 'play', 
    appDescription: 'Play some music with the bot.',
    type: 'chatInput', 
    permissions: [], 
    build: [{
      commandName: 'song',
      commandDescription: 'Song query',
      commandType: 3,
      commandRequired: true 
    }] 
  },
  name: 'play', 
  module: 'music',
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
      if(queueGet.channel !== resChannel) return failureYouAre(`I am already playing music in <#${queueGet.channel}>, move there to make requests.`);
      return voice.play({
        command: {
          query: `ytsearch::${msg.data.options[0].value}`
        }, 
        channel: queueGet.channel, 
        guild: msg.guild_id, 
        user: msg.member 
      })
      .then((val) => {
        voice.queue({ 
          guild: msg.guild_id 
        })
        .then((queue) => {
          let totalSongTime = time.hms(queue.songs[queue.songs.length - 1].song.info.length / 1000);
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
          channel.msgSend({ 
            content: `*Added to queue*\n🎵 ${queue.songs[queue.songs.length - 1].song.info.title}\n⌚ ${totalSongTime.hour}:${totalSongTime.minute}:${totalSongTime.second} 👤 ${queue.songs[queue.songs.length - 1].requested.username}#${queue.songs[queue.songs.length - 1].requested.discriminator} 🔊 ${queue.settings.volume * 100}%`, 
            channel: queueGet.channel 
          })
            .catch((err) => console.log(err));
        });
      });
    }
    
    voice.connect({
      command: resChannel, 
      channel: resChannel, 
      guild: msg.guild_id, 
      user: msg.member 
    })
      .then((connection) => {
        voice.play({
          command: {
            query: `ytsearch::${msg.data.options[0].value}`
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
        content: `I will start playing your song in <#${resChannel}>, check there for song information too.`, 
        visibleForAll: true 
      } 
    })
      .catch((err) => console.log(err));
  },
};
