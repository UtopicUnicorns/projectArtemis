////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "unban",
  description: "This command allows you to unban a user.",
  permission: "3",
  explain: `This command allows you to unban a user.
Unbanning a user is only possible if they are actually banned!

Example usage: (PREFIX)unban userID
Example usage: (PREFIX)unban @mention`,

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
    if (!snd.guild.me.hasPermission(["BAN_MEMBERS"]))
      return snd.send(`I do not have \`BAN_MEMBERS\` permission!`);

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    if (!arguments)
      return await snd.send(
        "You might want to provide an user ID or something like that."
      );

    getTarget = arguments
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    try {
      await gld.members.unban(getTarget);
      await snd.send("All done!");
    } catch (err) {
      await snd.send("I could not unban this user.");
    }
  },
};
