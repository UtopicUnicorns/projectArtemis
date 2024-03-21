////////////////////////////////////
//When a role is updated
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function(c, client, CONFIG, npm) {
    let msg = c.d;

    if (!msg) return;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    let embed = new Discord.MessageEmbed()
      .setColor("GREY")
      .setDescription("Role Updated")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .addField("Role Name:", `${msg.role.name}`)
      .addField("Role ID:", `${msg.role.id}`)
      .addField("Role Colour:", `${msg.role.color}`)
      .addField("Role Permissions:", `${msg.role.permissions}`)
      .addField("Role Mentionable:", `${msg.role.mentionable}`)
      .addField("Role hoisted:", `${msg.role.hoist}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).groleupdate) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  }
};
