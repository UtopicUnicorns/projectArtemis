////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "np",
  description: "This command shows you the current song that is playing.",
  permission: "0",
  explain: `This command shows you the current song that is playing.
Music needs to be playing to be able to use this command.

Example usage: (PREFIX)np`,

  ////////////////////////////////////
  //We pass trough some predefined things
  //Within this command we can work with Client, raw content and a config file
  ////////////////////////////////////
  async execute(msg, client, CONFIG, npm, mmbr) {
    ////////////////////////////////////
    //We fetch the channel here
    //We can easely send with this const
    ////////////////////////////////////
    const snd = await client.channels.cache.get(msg.channel_id);

    ////////////////////////////////////
    //Defining the arguments here
    //Splits can happen later if needed
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);
    const comName = module.exports.name;
    const arguments = await msg.content.slice(
      prefix.length + comName.length + 1
    );

    ////////////////////////////////////
    //Main command starts here
    //Comments might get smaller here
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    if (!serverQueue) return snd.send("There is nothing playing right now.");

    if (serverQueue.songs) {
      let infoSong = new Discord.MessageEmbed()
        .setThumbnail(serverQueue.songs[0].thumb)
        .setColor("GREEN")
        .setAuthor(
          "Artemis Music Player",
          "https://artemis.rest/images/art_play.png"
        )
        .setTitle(`${serverQueue.songs[0].title}`)
        .setDescription(
          `Views: ${serverQueue.songs[0].view}\nLikes: ${serverQueue.songs[0].like} / Dislikes: ${serverQueue.songs[0].dislike}\nDuration: ${serverQueue.songs[0].dur} seconds\n\nRequested by: ${serverQueue.songs[0].req}`
        )
        .setFooter(
          `${serverQueue.volume}% | Now playing`,
          "https://artemis.rest/images/art_vol.png"
        );
      return snd.send({ embed: infoSong });
    }
  },
};
