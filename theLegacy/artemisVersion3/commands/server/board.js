////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "board",
  description: "This command will show you the top 10 points holders.",
  permission: "0",
  explain: `This command will show you the top 10 points holders.
  
Example usage: (PREFIX)board`,

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

    let pull = await db
      .prepare('SELECT * FROM scores WHERE guild = ? ORDER BY "points" DESC')
      .all(gld.id);

    let count = 0;

    const embed = new Discord.MessageEmbed()
      .setColor("AQUA")
      .setDescription(
        `Full leaderboard on:\n https://artemis.rest/leaderboard?guildid=${gld.id}`
      );

    await pull.forEach((m) => {
      if (count >= 10) return;
      let usr = gld.members.cache.get(m.user);
      if (!usr) return;

      count++;

      embed.addField(
        `**[${count}]** ${usr.user.username}#${usr.user.discriminator}`,
        `Level: **${m.level}** | Worth: **${CONFIG.CONFIG(
          "CURRENCY"
        )}${m.points.toLocaleString()}**`
      );
    });

    snd.send(await embed);
  },
};
