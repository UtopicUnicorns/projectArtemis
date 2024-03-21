////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "antiraid",
  description: "Toggle to turn on or off the ability to verify.",
  permission: "2",
  explain: `Toggle to turn on or off the ability to verify..

Example usage: (PREFIX)antiraid ON
Example usage: (PREFIX)antiraid OFF`,

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

    let antiRaid = await getAR.get(gld.id);

    if (!antiRaid) {
      antiRaid = {
        gldid: gld.id,
        status: "OFF",
      };

      await setAR.run(antiRaid);
    }

    if (!arguments) {
      return snd.send(`Anti Raid status: \`${antiRaid.status}\``);
    }

    if (arguments.toLowerCase() == "on") {
      antiRaid.status = "ON";
      await setAR.run(antiRaid);
      return snd.send("AntiRaid is online!");
    } else {
      antiRaid.status = "OFF";
      await setAR.run(antiRaid);
      return snd.send("AntiRaid is offline!");
    }
  },
};
