////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "level",
  description:
    "This command allows you to show your own or another user level and points.",
  permission: "0",
  explain: `This command allows you to show your own or another user level and points.
This command also shows the amount of warning points and received bonusses.

Example usage: (PREFIX)level --user=userID
Example usage: (PREFIX)level --user=@mention`,

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

      let worth = await getScore.get(mmbr2.id, gld.id);
      if (!worth) return snd.send("This user has no database entry yet!");

      let mathlev = await worth.level;
      let mathpoint = await worth.points;
      let mathwarn = await worth.warning;
      let math1 = await Math.floor(mathlev + 1);
      let math2 = await Math.floor(Math.pow(math1, 2) * 4);
      let math3 = await Math.floor(math2 - mathpoint); //till next level

      let embed = new Discord.MessageEmbed()
        .setAuthor(
          mmbr2.user.username + "#" + mmbr2.user.discriminator,
          mmbr2.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setThumbnail(
          mmbr2.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setColor(`GREEN`)
        .addField("Level", `${await worth.level}`, true)
        .addField(
          "Worth",
          `${await CONFIG.CONFIG(
            "CURRENCY"
          )}${await worth.points.toLocaleString()}`,
          true
        )
        .addField("Next level", `${math3.toLocaleString()} messages`, true);

      if (mathwarn > 0)
        embed.addField("Warnings received", `${mathwarn}`, true);

      if (worth.bonus > 0)
        embed.addField("Bonuses received", `${worth.bonus}`, true);

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
  },
};
