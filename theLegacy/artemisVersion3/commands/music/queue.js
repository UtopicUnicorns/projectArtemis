////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "queue",
  description: "This command allows you to view the music queue.",
  permission: "0",
  explain: `This command allows you to view the music queue.
Music has to be playing for you to be able to use this command.

Example usage: (PREFIX)queue`,

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
      counter = 0;

      let queueSong = new Discord.MessageEmbed()
        .setThumbnail(serverQueue.songs[0].thumb)
        .setColor("GREEN")
        .setAuthor(
          "Artemis Music Player",
          "https://artemis.rest/images/art_play.png"
        )
        .setDescription(`${serverQueue.songs[0].desc.slice(0, 1000)}\n`)
        .setFooter(
          `${serverQueue.volume}% | Queue`,
          "https://artemis.rest/images/art_vol.png"
        );

      serverQueue.songs.forEach((S) => {
        counter++;
        if (counter >= 10) return;
        queueSong.addField(
          `[${counter}] ${S.title}`,
          `Requested by: ${S.req}\nDuration: ${S.dur}`
        );
      });

      return snd.send({ embed: queueSong });
    }
  },
};
