////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "permit",
  description:
    "Allows the user of this command to ellevate another user permission level for one charge.",
  permission: "2",
  explain: `Allows the user of this command to ellevate another user permission level for one charge.
Permission changes with this command are good for one charge.
You can only bestow a permission level to another use that matches your own.

Example usage: (PREFIX)permit userID --level=2
Example usage: (PREFIX)permit @mention --level=2`,

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
    permitLevel = await arguments.toLowerCase().split("--level=");

    getTarget = await permitLevel[0]
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    getLevel = permitLevel[1];

    perm = "NO";

    switch (getLevel) {
      case "0": //Regular Members
        perm = "YES";
        break;
      case "1": //Mute permissions
        if (await mmbr.permissions.has("MUTE_MEMBERS")) perm = "YES";
        if (await mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
        if (await mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
        if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
        break;
      case "2": //Kick permissions
        if (await mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
        if (await mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
        if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
        break;
      case "3": //Ban permissions
        if (await mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
        if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
        break;
      case "4": //Bot Owner
        if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
        break;
      default:
        perm = "NO";
        break;
    }

    if (perm == "NO")
      return snd.send(
        "Action was not succesful, you might be lacking permissions or given me a wrong level."
      );

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return snd.send("Somehow this is not a valid guild?!");

    const mmbr2 = await gld.members.cache.get(getTarget); //Get Author
    if (!mmbr2)
      return snd.send("This user does not exist or is an invalid target.");

    let permitChange = await getScore.get(mmbr2.id, gld.id);
    permitChange.permit = getLevel;

    await setScore.run(permitChange);

    return snd.send(
      `${mmbr2.user.username}#${mmbr2.user.discriminator}'s permission level has changed and is good for one charge!`
    );
  },
};
