////////////////////////////////////
//Music Player
//have fun
////////////////////////////////////
module.exports = {
  eventTrigger: async function (client, gld, song) {
    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    const VC = await client.channels.cache.get(serverQueue.voiceChannel.id);

    if (VC.members.size == 1) {
      serverQueue.voiceChannel.leave();
      serverQueue.textChannel.send(
        `There are no users in the channel I am playing music in, Goodbye 👋`
      );
      queue.delete(gld.id);
      return;
    }

    if (!song) {
      serverQueue.voiceChannel.leave();
      serverQueue.textChannel.send(`Goodbye 👋`);
      queue.delete(gld.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(`${song.url}`, {quality: 'highestaudio'}))
      .on("finish", () => {
        serverQueue.songs.shift();
        PLAYER.eventTrigger(client, gld, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolume(serverQueue.volume / 100);
    let addSong = new Discord.MessageEmbed()
      .setThumbnail(song.thumb)
      .setColor("GOLD")
      .setAuthor(
        "Artemis Music Player",
        "https://artemis.rest/images/art_play.png"
      )
      .setTitle(`${song.title}`)
      .setDescription(
        `Views: ${song.view}\nLikes: ${song.like} / Dislikes: ${song.dislike}\nDuration: ${song.dur} seconds\n\nRequested by: ${song.req}`
      )
      .setFooter(
        `${serverQueue.volume}% | Started playing this song`,
        "https://artemis.rest/images/art_vol.png"
      );
    serverQueue.textChannel.send({ embed: addSong });
  },
};
