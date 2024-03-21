////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "vol",
  description:
    "This command allows you to change the volume of the music player.",
  permission: "0",
  explain: `This command allows you to change the volume of the music player.
Volume changes persist trough music changes, but only if the bot has not left the voice channel.

Example usage: (PREFIX)vol 10
Example usage: (PREFIX)vol 50
Example usage: (PREFIX)vol 100`,

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
      return snd.send("The volume percentage you gave me is not a number!");

    if (arguments > 100) return snd.send("Volume may not be above 100%");
    if (arguments < 1) return snd.send("Volume may not be below 1%");

    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    if (!serverQueue) return snd.send("There is nothing playing right now.");

    await serverQueue.connection.dispatcher.setVolume(arguments / 100);
    serverQueue.volume = arguments;

    snd.send(`Volume has changed to ${arguments}%`);
  },
};
