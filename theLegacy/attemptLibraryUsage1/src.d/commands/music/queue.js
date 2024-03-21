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
    appName: 'queue', 
    appDescription: 'Show music queue.', 
    type: 'chatInput', 
    permissions: [] 
  },
  name: 'queue', 
  module: 'music',
  async execute(msg) {
    let queueGet = await voice.queue({ guild: msg.guild_id });
    if(queueGet !== 'make a connection first') {
      let buildQueueOut = ''; 
      buildQueueOut += `🎵 ${queueGet.playing.song.info.title}`; 
      for(let i of queueGet.songs) buildQueueOut += `\n⏭️ ${i.song.info.title}`; 
      return interaction.create({
        id: msg.id, 
        token: msg.token, 
        type: 'channelMessage', 
        data: { 
          content: buildQueueOut.slice(0,2000), 
          visibleForAll: true 
        } 
      })
        .catch((err) => console.log(err)); 
    }
    return interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'channelMessage', 
      data: { 
        content: `There is nothing playing right now.`, 
        visibleForAll: true 
      } 
    })
      .catch((err) => console.log(err));
  },
};
