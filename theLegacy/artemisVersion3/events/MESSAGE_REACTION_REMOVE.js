////////////////////////////////////
//When a reaction is removed
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.user_id);
    if (!mmbr) return;

    let reactChan = await getGuild.get(msg.guild_id);

    if (
      reactChan.reactionChannel &&
      reactChan.reactionChannel == msg.channel_id
    )
      return;

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        mmbr.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("DARK_RED")
      .setDescription("React Emote removed from a message")
      .addField(
        "Reaction member:",
        `${mmbr.user.username}#${mmbr.user.discriminator}`
      )
      .addField("Emote removed:", `${msg.emoji.name}`)
      .addField("On message ID:", `${msg.message_id}`)
      .addField("In Channel:", `<#${msg.channel_id}>`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).reactdelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
