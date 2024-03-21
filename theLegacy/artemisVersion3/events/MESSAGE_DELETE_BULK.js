////////////////////////////////////
//When multiple messages are deleted
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    let embed = new Discord.MessageEmbed()
      .setColor("GOLD")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .setDescription("Multiple messages Deleted")
      .addField("Messages deleted:", `${msg.ids.length}`)
      .addField("In Channel:", `<#${msg.channel_id}>`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).msgdelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
