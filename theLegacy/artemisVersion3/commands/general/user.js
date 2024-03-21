////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "user",
  description: "Lookup some basic information about a user.",
  permission: "0",
  explain: `Lookup some basic information about a user.

Example usage: (PREFIX)user --user=@mention
Example usage: (PREFIX)user --user=userID`,

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
    async function userInfo(ID) {
      const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
      if (!gld) return;

      const mmbr2 = await gld.members.cache.get(ID); //Get author
      if (!mmbr2) return snd.send("Member not found!");

      let roleMap = mmbr2.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role);

      let embed = new Discord.MessageEmbed()
        .setAuthor(
          mmbr2.user.username + "#" + mmbr2.user.discriminator,
          mmbr2.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024
          })
        )
        .setThumbnail(
          mmbr2.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024
          })
        )
        .setDescription(`${mmbr2}`)
        .setColor(`RANDOM`)
        .addField(
          "Joined guild:",
          `${moment(mmbr2.joinedTimestamp).format(
            "dddd, MMMM Do YYYY, HH:mm:ss"
          )}`
        )
        .addField(
          "Account created:",
          `${moment(mmbr2.user.createdTimestamp).format(
            "dddd, MMMM Do YYYY, HH:mm:ss"
          )}`
        )
        .addField("User ID:", `${mmbr2.user.id}`)
        .addField("Bot user:", `${mmbr2.user.bot}`)
        .addField("Top 5 Roles:", `${roleMap.slice(0, 5)}`);

      //send embed
      return snd.send(embed);
    }

    let args = arguments.toLowerCase().split("--user=");

    if (!args[1]) return userInfo(msg.author.id);

    let argsProc = args[1]
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    return userInfo(argsProc);
  }
};
