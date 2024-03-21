////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "ignoreurl",
  description: "Ignore URLS while automod is on.",
  permission: "2",
  explain: `Ignore URLS while automod is on.

Example usage: (PREFIX)ignoreurl`,

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
    let uublock = getUU.get(msg.channel_id);

    if (!uublock) {
      let blockme = {
        chanid: msg.channel_id,
      };

      await setUU.run(blockme);

      return await snd.send(
        "Artemis will now not check for URLS in this channel when automod is ON!"
      );
    } else {
      await db
        .prepare(`DELETE FROM unblockurl WHERE chanid = '${msg.channel_id}'`)
        .run();
      return await snd.send(
        "Artemis will now check for URLS in this channel when automod is ON!"
      );
    }
  },
};
