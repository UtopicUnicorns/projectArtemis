////////////////////////////////////
//This event is triggered whenever Artemis receives an EDITED message
//A lot gets set in motion.
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //We fetch the old message first
    //And then we try to do stuff with it
    ////////////////////////////////////
    if (!client.channels.cache.get(c.d.channel_id)) return;
    if (!client.channels.cache.get(c.d.channel_id).messages.fetch(c.d.id))
      return;
    try {
      let msg = await client.channels.cache
        .get(c.d.channel_id)
        .messages.fetch(c.d.id);
    } catch (err) {
      return console.log("");
    }

    let msg = await client.channels.cache
      .get(c.d.channel_id)
      .messages.fetch(c.d.id);
    if (!msg) return;

    ////////////////////////////////////
    //Bots get declined obviously
    //Even edits can be harmful
    ////////////////////////////////////
    if (msg.author.bot == true) return;

    ////////////////////////////////////
    //Defining the old and new message
    //This way we can work with it more easely
    ////////////////////////////////////
    const oldMsg = msg._edits[0];
    const newMsg = c.d;
    if (!newMsg) return;
    if (!newMsg.content) return;

    ////////////////////////////////////
    //We define some quicker ways to call info
    //Basically you never need to do this, but it's easier.
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", c.d.guild_id);

    const snd = await client.channels.cache.get(c.d.channel_id);
    if (!snd) return;

    const gld = await client.guilds.cache.get(c.d.guild_id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(newMsg.author.id);
    if (!mmbr) return;

    const mntns = c.d.mentions; //mentions

    ////////////////////////////////////
    //If there is an older message
    //It will be put into the logs if it's in place
    ////////////////////////////////////
    if (oldMsg && oldMsg.content) {
      let embed = new Discord.MessageEmbed()
        .setThumbnail(
          mmbr.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setColor("AQUA")
        .setDescription("Message edited")
        .addField(
          "Message by:",
          `${mmbr.user.username}#${mmbr.user.discriminator}`
        )
        .addField("Old Message:", `${oldMsg.content}`)
        .addField("New Message:", `${newMsg.content}`)
        .addField("Message ID:", `${newMsg.id}`)
        .addField("Message Channel:", `<#${newMsg.channel_id}>`)
        .setTimestamp();

      try {
        if ((await getLogs.get(newMsg.guild_id).msgupdate) == "ON") {
          await client.channels.cache
            .get(await getGuild.get(newMsg.guild_id).logsChannel)
            .send({ embed });
        }
      } catch (err) {
        console.log("");
      }
    }

    ////////////////////////////////////
    //Commands get executed here
    //We pass trough information to the command file.
    ////////////////////////////////////
    if (!newMsg.content.startsWith(prefix)) return;

    try {
      const comExec = await client.commands.get(
        newMsg.content.slice(prefix.length).split(/ +/).shift().toLowerCase()
      );
      if (!comExec) return;

      ////////////////////////////////////
      //Permission check system
      //Goes from 0 to 4
      ////////////////////////////////////
      let perm = "NO";

      switch (comExec.permission) {
        case "0": //Regular Members
          perm = "YES";
          break;
        case "1": //Mute permissions
          if (mmbr.permissions.has("MUTE_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          break;
        case "2": //Kick permissions
          if (mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          break;
        case "3": //Ban permissions
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          break;
        case "4": //Bot Owner
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          break;
      }

      if (perm == "YES") {
        let usage = await getUsage.get(comExec.name);
        usage.number++;
        setUsage.run(usage);

        comExec.execute(newMsg, client, CONFIG, npm, mmbr);
      }

      if (perm == "NO")
        snd.send(
          `${mmbr}, You are lacking permissions to use this command!\n You need permission level: ${comExec.permission}!`
        );
    } catch (error) {
      console.error(error);
    }
  },
};
