module.exports = {
  async execute( eventState, msg, conMan ) {
    //Load queue for guild
    voice.queue({ guild: msg.guild }).then((val) => {
      //Calculate song running time
      let totalSongTime = time.hms(val.playing.song.info.length / 1000);
      
      //Empty slot
      let nextUp = '';
      
      //If next song, fill slot
      if(val.songs[0]) nextUp = `\n*next: ${val.songs[0].song.info.title}*`;
      
      //Send information to playing channel
      channel
        .msgSend({
          content: `🎵 ${val.playing.song.info.title}\n⌚ ${totalSongTime.hour}:${totalSongTime.minute}:${totalSongTime.second} 👤 ${val.playing.requested.username}#${val.playing.requested.discriminator} 🔊 ${val.settings.volume * 100}%${nextUp}`,
          channel: val.channel 
        })
        .catch((err) => console.log(err));		
    });
  },
};

