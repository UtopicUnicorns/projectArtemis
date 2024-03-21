////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "skip",
  description: "This command allows you to skip songs in the queue.",
  permission: "0",
  explain: `This command allows you to skip songs in the queue.
Compare the number within (PREFIX)queue to the song you want to skip.

Example usage: (PREFIX)skip
Example usage: (PREFIX)skip 4`,

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

    const voiceChannel = mmbr.voice.channel;
    if (!voiceChannel)
      return snd.send("You need to be in a voice channel to play music!");
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return snd.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    if (await isNaN(arguments))
      return snd.send("The message you send was not a number.");

    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    if (!serverQueue) return snd.send("There is nothing playing right now.");

    if (!arguments) {
      await snd.send(`Skipped: \`${serverQueue.songs[0].title}\``);
      return await serverQueue.connection.dispatcher.end();
    }

    if (arguments == "0" || arguments == "1") {
      await snd.send(`Skipped: \`${serverQueue.songs[0].title}\``);
      return await serverQueue.connection.dispatcher.end();
    }

    if (arguments > serverQueue.songs.length) {
      return snd.send("Invalid song number!");
    } else {
      await snd.send(`Skipped: \`${serverQueue.songs[arguments - 1].title}\``);

      return await serverQueue.songs.splice(arguments - 1, 1);
    }
  },
};
