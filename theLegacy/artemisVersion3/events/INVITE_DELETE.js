////////////////////////////////////
//When an invite is deleted
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
      .setDescription("Invite deleted")
      .addField("Channel Link:", `<#${msg.channel_id}>`)
      .addField("Channel Invite ID:", `${msg.channel_id}`)
      .addField("Invite Code:", `${msg.code}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).invdelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
