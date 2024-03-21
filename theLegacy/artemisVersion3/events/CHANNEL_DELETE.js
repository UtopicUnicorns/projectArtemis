////////////////////////////////////
//When a channel is deleted
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    let embed = new Discord.MessageEmbed()
      .setColor("DARK_BLUE")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .setDescription("Channel deleted")
      .addField("Channel ID:", `${msg.id}`)
      .addField("Channel Name:", `${msg.name}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).chandelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
