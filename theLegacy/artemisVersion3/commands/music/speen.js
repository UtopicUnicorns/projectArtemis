////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "speen",
  description: "When there is no music playing, trigger a vinesauce spin.",
  permission: "0",
  explain: `When there is no music playing, trigger a vinesauce spin.
This is purely for fun and all rights belong to vinny.

Example usage: (PREFIX)speen`,

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
      return snd.send("You need to be in a voice channel to use this command!");
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return snd.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    if (serverQueue)
      return snd.send(
        "There is music being played right now in a music channel, don't bother them."
      );

    var connection = await voiceChannel.join();

    const speens = fs.readdirSync("./content/speen");

    const array = [];

    for (const file of speens) {
      array.push(file);
    }

    let selSpeen = array[~~(Math.random() * array.length)];

    const dispatcher = await connection.play(`./content/speen/${selSpeen}`);

    dispatcher.on("finish", () => voiceChannel.leave());
  },
};
