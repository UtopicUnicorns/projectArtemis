////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "preban",
  description:
    "Allows the user to ban another user even if they are not in your guild.",
  permission: "3",
  explain: `Allows the user to ban another user even if they are not in your guild.
This command leaves no logs and will not remove past messages from the banned user.
However this command allows you to pre-emptively ban a user.

Example usage: (PREFIX)preban userID
Example usage: (PREFIX)preban @mention
Example usage: (PREFIX)preban userID userID userID userID`,

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

    splitArgs = arguments.split(" ");
    if (!splitArgs)
      return await snd.send(
        "You might want to provide an user ID or something like that."
      );

    if (!splitArgs[0])
      return await snd.send(
        "You might want to provide an user ID or something like that."
      );

    for (let i of splitArgs) {
      let numbers = i.replace(/[^0-9]/gi, "");

      try {
        await gld.members.ban(numbers);
      } catch (err) {
        console.log("");
      }
    }

    await snd.send("All done!");
  },
};
