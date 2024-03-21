////////////////////////////////////
//Verification module
//That stuff happens here
////////////////////////////////////
module.exports = {
  eventTrigger: async function(client, CONFIG, npm, mmbr, msg, snd, gld) {
    if (msg.content.toLowerCase() == "hello artemis") {
      let antiRaid = await getAR.get(msg.guild_id);
      if (!antiRaid) {
        antiRaid = {
          gldid: msg.guild_id,
          status: "OFF"
        };

        setAR.run(antiRaid);
      }

      if (antiRaid.status == "ON")
        return snd.send(
          "This server's AntiRaid is on, you can not get verified at this time!"
        );

      let veriMute = await getScore.get(msg.author.id, msg.guild_id);
      let veriCall = await getGuild.get(msg.guild_id);
      if (veriMute) {
        if (veriMute.muted == "1")
          return await snd.send(
            "Seems like you may not get yourself verified, since you appear to be muted."
          );
      }

      await snd.send(`${mmbr}, You have been granted access!`);

      try {
        await mmbr.roles.add(
          await snd.guild.roles.cache.find(
            r => r.id === getSettings.get(msg.guild_id).defaultrole
          )
        );
      } catch (err) {
        console.log("");
      }

      try {
        let veriChan = await gld.channels.cache.find(
          channel => channel.id === getGuild.get(gld.id).verificationChannel
        );
        if (await veriChan.permissionOverwrites.get(mmbr.user.id)) {
          await veriChan.permissionOverwrites.get(mmbr.user.id).delete();
        }
      } catch (err) {
        console.log("");
      }

      try {
        await snd.messages.fetch().then(messages => {
          let cleanUp = messages.filter(
            msg =>
              msg.author.id == mmbr.user.id ||
              msg.content.toLowerCase().includes(`<@${mmbr.user.id}>`)
          );
          cleanUp.forEach(async m => {
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

      let a = moment();
      let b = moment(mmbr.user.createdTimestamp);

      let years = a.diff(b, "year");
      b.add(years, "years");

      let months = a.diff(b, "months");
      b.add(months, "months");

      let days = a.diff(b, "days");

      let embed = new Discord.MessageEmbed()
        .setThumbnail(
          mmbr.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024
          })
        )
        .setColor("LUMINOUS_VIVID_PINK")
        .addField(
          "Member:",
          `${mmbr.user.username}#${mmbr.user.discriminator}`,
          true
        )
        .addField("ID:", `${mmbr.user.id}`, true)
        .addField(
          "Account age:",
          `${years} Years  ${months} Months ${days} Days`
        );

      let artIMG = await getSettings.get(msg.guild_id);
      if (artIMG) {
        if (artIMG.wimage) {
          if (artIMG.wimage.toLowerCase().startsWith("http")) {
            embed.setImage(artIMG.wimage);
          } else {
            embed.setImage("https://artemis.rest/static/images/fire.gif");
          }
        } else {
          embed.setImage("https://artemis.rest/static/images/fire.gif");
        }
      } else {
        embed.setImage("https://artemis.rest/static/images/fire.gif");
      }

      try {
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).generalChannel)
          .send(`${mmbr}`, { embed });
      } catch (err) {
        console.log("");
      }

      const prefix = await CONFIG.PREFIX("PREFIX", gld.id);
      let mmsSend = await getSettings.get(gld.id).wmessage;
      if (mmsSend) {
        try {
          await mmbr.send(
            `Welcome message from ${gld.name},\n\n${mmsSend}\n\nThe bot prefix for this server is: \`${prefix}\`.\nThe help command to see all commands is \`${prefix}command\`\nTo elaborate a command use \`${prefix}command command\``,
            {
              split: true
            }
          );
        } catch (err) {
        try {
          await client.channels.cache
            .get(await getGuild.get(msg.guild_id).generalChannel)
            .send(
              `${mmbr}, Welcome message from ${gld.name},\n\n${mmsSend}\n\nThe bot prefix for this server is: \`${prefix}\`.\nThe help command to see all commands is \`${prefix}command\`\nTo elaborate a command use \`${prefix}command command\``,
              {
                split: true
              }
            );
          console.log("");
          } catch (err) {
            console.log("");
          }
        }
      }
    }
  }
};
