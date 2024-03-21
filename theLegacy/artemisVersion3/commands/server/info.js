////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "info",
  description: "Show basic server information.",
  permission: "0",
  explain: `Show basic server information.
  
Example usage: (PREFIX)info`,

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

    //guild ICON
    let sicon = gld.iconURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    let inver = [];

    let guildInfo = await getSettings.get(gld.id);

    await gld.fetchInvites().then((invites) => {
      for (let i of invites) {
        if (i[1].maxAge == "0") inver.push(i[0]);
      }
    });

    if (!inver[0]) {
      var letInvite = "No Active Permanent Invite.";
    } else {
      var letInvite = `https://discord.com/invite/${inver[0]}`;
    }

    //for membed
    let serverembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(sicon)
      .setAuthor(gld.name, sicon)
      .addField("Guild name", gld.name, true)
      .addField("ID", gld.id, true)
      .addField("Owner", gld.owner, true)
      .addField("Region", gld.region, true)
      .addField("Members", `${gld.memberCount}`, true)
      .addField("Roles", gld.roles.cache.size, true)
      .addField(
        "Channels",
        `💬: ${
          gld.channels.cache.filter((channel) => channel.type === "text").size
        } 🔈: ${
          gld.channels.cache.filter((channel) => channel.type === "voice").size
        } `,
        true
      )
      .addField("Guild Invite: ", letInvite, true)

      .setFooter(
        `This guild was created at ${moment
          .utc(gld.createdAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`
      );

    if (guildInfo) {
      serverembed.addField(
        "Default Role",
        gld.roles.cache.find((r) => r.id === guildInfo.defaultrole, true),
        true
      );
      serverembed.addField("Automod: ", guildInfo.autoMod, true);
      serverembed.addField("Stream Pings: ", guildInfo.streamHere, true);
      serverembed.addField("Leveling: ", guildInfo.leveling, true);
    }

    snd.send(serverembed);
  },
};
