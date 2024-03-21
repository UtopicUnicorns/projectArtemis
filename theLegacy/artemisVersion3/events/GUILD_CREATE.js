////////////////////////////////////
//When a new guild joins
//And every guild on bot start
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;
    if (!msg) return;

    let push = "NO";

    ////////////////////////////////////
    //Create a database if needed
    //Will most likely not overwrite old stuff :kek:
    ////////////////////////////////////
    let thisGuild = await getGuild.get(msg.id);
    if (!thisGuild) {
      thisGuild = {
        guild: msg.id,
        generalChannel: "",
        highlightChannel: "",
        muteChannel: "",
        logsChannel: "",
        streamChannel: "",
        reactionChannel: "",
        verificationChannel: "",
        supportChannel: "",
        supportInUseChannel: "",
      };

      await setGuild.run(thisGuild);

      push = "YES";
    }

    let thisGuildL = await getLogs.get(msg.id);
    if (!thisGuildL) {
      thisGuildL = {
        guildid: msg.id,
        msgupdate: "OFF",
        msgdelete: "OFF",
        chancreate: "OFF",
        chandelete: "OFF",
        chanupdate: "OFF",
        reactadd: "OFF",
        reactdelete: "OFF",
        invcreate: "OFF",
        invdelete: "OFF",
        grolecreate: "OFF",
        groledelete: "OFF",
        groleupdate: "OFF",
        gmemadd: "OFF",
        gmemupdate: "OFF",
        gmemdelete: "OFF",
        gbanadd: "OFF",
        gbanremove: "OFF",
        voiceupdate: "OFF",
      };

      await setLogs.run(thisGuildL);
    }

    let thisGuildS = await getSettings.get(msg.id);
    if (!thisGuildS) {
      thisGuildS = {
        guildid: msg.id,
        artemisTalks: "OFF",
        streamHere: "OFF",
        autoMod: "OFF",
        prefix: "a!",
        leveling: "ON",
        wmessage: "Welcome!",
        wimage: "NONE",
        defaultrole: "",
        bonuspoints: 30,
      };

      await setSettings.run(thisGuildS);
    }

    if (push !== "YES") return;

    ////////////////////////////////////
    //We create an embed with some useful info
    //And send it to our main server.
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(msg.id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.owner_id);
    if (!mmbr) return;

    let embed = new Discord.MessageEmbed()
      .setColor("AQUA")
      .setThumbnail(`https://cdn.discordapp.com/icons/${msg.id}/${msg.icon}`)
      .setAuthor(
        `Owner: ${mmbr.user.username}#${mmbr.user.discriminator}`,
        mmbr.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setDescription("New Guild Joined")
      .addField("Guild Name:", msg.name)
      .addField("Total Members:", msg.member_count)
      .addField("Region:", msg.region)
      .addField("System Default Channel:", msg.system_channel_id)
      .setTimestamp();

    try {
      await client.channels.cache
        .get(await CONFIG.CONFIG("MAIN_LOG"))
        .send({ embed });
    } catch (err) {
      console.log("");
    }

    let embed2 = new Discord.MessageEmbed()
      .setColor("AQUA")
      .setThumbnail(`https://cdn.discordapp.com/icons/${msg.id}/${msg.icon}`)
      .setAuthor(
        `Owner: ${mmbr.user.username}#${mmbr.user.discriminator}`,
        mmbr.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setDescription("Artemis V3")
      .addField("Standard Prefix:", "a!")
      .addField("Setup command:", "a!setup")
      .addField("Main Artemis Support guild:", "https://discord.gg/Y6f3XQyuTQ")
      .addField("GitHub", "https://github.com/UtopicUnicorns/ArtemisV3")
      .addField("Website", "https://artemis.rest")
      .setTimestamp();

    try {
      await client.channels.cache
        .get(c.d.system_channel_id)
        .send({ embed: embed2 });
    } catch (err) {
      console.log("");
    }
  },
};
