////////////////////////////////////
//When a member leaves guild
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;
    let mmbr = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;
    
        if (msg.guild_id == "628978428019736619") {
      const snd = await client.channels.cache.get(
        getGuild.get(gld.id).verificationChannel
      );
      if (!snd) return;

      try {
        await snd.messages.fetch().then((messages) => {
          let cleanUp = messages.filter(
            (msg) =>
              msg.author.id == mmbr.user.id ||
              msg.content.toLowerCase().includes(`<@${mmbr.user.id}>`)
          );
          cleanUp.forEach(async (m) => {
            try {
              await m.delete();
            } catch (err) {
              console.log("");
            }
          });
        });
      } catch (error) {
        console.log("");
      }
    }

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${msg.user.id}/${msg.user.avatar}`
      )
      .setColor("DARK_RED")
      .setDescription("Member left")
      .addField("Member:", `${msg.user.username}#${msg.user.discriminator}`)
      .addField("ID:", `${msg.user.id}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).gmemdelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
