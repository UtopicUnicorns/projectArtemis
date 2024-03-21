////////////////////////////////////
//Guild member add event
//When a new user joins the guild this gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //We define some quicker ways to call info
    //Basically you never need to do this, but it's easier.
    ////////////////////////////////////
    let msg = c.d;

    if (msg.user.bot == true) return;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.user.id);
    if (!mmbr) return;

    if (c.d.guild_id == "628978428019736619") {
      let antiRaid = await getAR.get(c.d.guild_id);
      if (antiRaid.status == "ON") {
        if (mmbr.user.id !== "859122540323930152") {
          let aa = moment();
          let bb = moment(mmbr.user.createdTimestamp);

          let yearss = aa.diff(bb, "year");
          bb.add(yearss, "years");

          let monthss = aa.diff(bb, "months");
          bb.add(monthss, "months");

          let dayss = aa.diff(bb, "days");

          if (yearss == 0 && monthss > 4 && monthss < 9) {
            try {
              await mmbr.send(
                "Hey there, it looks like the autoban filter got to you.\nThis may be because you are part of a raid, if this is not correct please contact:\n.initrd#0383\nAranym#6729\nZero Zebra#0775\n\n"
              );
            } catch (err) {
              console.log("");
            }

            try {
              await gld.members.ban(msg.user.id);
              if ((await getLogs.get(gld.id).gbanadd) == "ON")
                await client.channels.cache
                  .get(await getGuild.get(gld.id).logsChannel)
                  .send(
                    `${msg.user.username}#${msg.user.discriminator}, was banned because their account age was between 5 and 9 months old, which fits the current raid!\nAccount age: \`${yearss} ${monthss} ${dayss}\``
                  );
            } catch (err) {
              console.log("");
            }
            return;
          }
        }
      }
    }

    ////////////////////////////////////
    //Check if there are database entries for user
    //else create them
    ////////////////////////////////////
    USERINFO = require("../modules/USERINFO");
    await USERINFO.eventTrigger(c, client, CONFIG, npm, mmbr);

    POINTS = require("../modules/POINTS");
    await POINTS.eventTrigger(c, client, CONFIG, npm, mmbr);

    joinChain = {
      usridgldid: `${msg.user.id}${c.d.guild_id}`,
      gldid: c.d.guild_id,
      usrid: msg.user.id,
      joindate: moment().format("x"),
    };
    await setJC.run(joinChain);

    ////////////////////////////////////
    //Auto Ban username
    //If username includes or matches list
    ////////////////////////////////////
    const bannedList = await db
      .prepare("SELECT badname FROM badnames WHERE gldid = ?;")
      .all(gld.id);

    if (bannedList) {
      if (bannedList[0]) {
        let bannedHit = 0;
        await bannedList.forEach((BL) => {
          if (
            msg.user.username.toLowerCase().includes(BL.badname.toLowerCase())
          ) {
            bannedHit++;
            return;
          }
        });

        if (bannedHit == 1) {
          try {
            await gld.members.ban(msg.user.id);
          } catch (err) {
            console.log("");
          }

          try {
            if ((await getLogs.get(gld.id).gbanadd) == "ON")
              await client.channels.cache
                .get(await getGuild.get(gld.id).logsChannel)
                .send(
                  `${msg.user.username}#${msg.user.discriminator}, was banned because their name included or is equal to a name added on the nameban list!`
                );
          } catch (err) {
            console.log("");
          }

          return;
        }
      }
    }

    ////////////////////////////////////
    //Info collecting for logs channel
    //And send info to the logs channel if posible
    ////////////////////////////////////
    let veriMute = await getScore.get(msg.user.id, c.d.guild_id);
    const target = await gld.members.cache.get(msg.user.id);
    let a = moment();
    let b = moment(mmbr.user.createdTimestamp);

    let years = a.diff(b, "year");
    b.add(years, "years");

    let months = a.diff(b, "months");
    b.add(months, "months");

    let days = a.diff(b, "days");

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${msg.user.id}/${msg.user.avatar}`
      )
      .setColor("DARK_VIVID_PINK")
      .setDescription("Member Joined")
      .addField("Member:", `${msg.user.username}#${msg.user.discriminator}`)
      .addField("ID:", `${msg.user.id}`)
      .addField("Account age:", `${years} Years  ${months} Months ${days} Days`)
      .setTimestamp();
    if (veriMute) {
      if (veriMute.muted == "1") {
        embed.addField(
          "!!WARNING!!",
          "This user seems to be muted!\nI did not give him/her permission to enter the verification channel!"
        );
      }
    }

    try {
      if ((await getLogs.get(msg.guild_id).gmemadd) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }

    ////////////////////////////////////
    //Mute Block!
    //We send the 'new' user to the chopping block instead.
    ////////////////////////////////////
    if (veriMute.muted == "1") {
      try {
        let channel2 = await gld.channels.cache.find(
          (channel) => channel.id === getGuild.get(gld.id).muteChannel
        );
        if (channel2) {
          return await channel2.createOverwrite(target, {
            VIEW_CHANNEL: true,
            READ_MESSAGES: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            ATTACH_FILES: false,
          });
        } else {
          return;
        }
      } catch (err) {
        return console.log("");
      }
    }

    ////////////////////////////////////
    //We check for verification here
    //Channel must exist, role must exists etc
    ////////////////////////////////////
    let veriCall = await getGuild.get(msg.guild_id);
    let roleTest = await gld.roles.cache.find(
      (r) => r.id === getSettings.get(msg.guild_id).defaultrole
    );

    if (veriCall) {
      if (veriCall.verificationChannel) {
        let channelTest = await client.channels.cache.get(
          veriCall.verificationChannel
        );
        if (roleTest) {
          if (channelTest) {
            try {
              let channel = await gld.channels.cache.find(
                (channel) =>
                  channel.id === getGuild.get(gld.id).verificationChannel
              );
              await channel.createOverwrite(target, {
                VIEW_CHANNEL: true,
                READ_MESSAGES: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
                ATTACH_FILES: false,
              });
            } catch (err) {
              console.log("");
            }
            try {
              return await channelTest.send(
                `Welcome ${target}!\n\nTo get verified simply write:\n \`Hello Artemis\``
              );
            } catch (error) {
              console.log("");
            }
          }
        }
      }
    }
    try {
      await target.roles.add(
        await gld.roles.cache.find(
          (r) => r.id === getSettings.get(msg.guild_id).defaultrole
        )
      );
    } catch (err) {
      console.log("");
    }

    let embed2 = new Discord.MessageEmbed()
      .setThumbnail(
        target.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("DARK_VIVID_PINK")
      .addField(
        "Member:",
        `${target.user.username}#${target.user.discriminator}`,
        true
      )
      .addField("ID:", `${target.user.id}`, true)
      .addField(
        "Account age:",
        `${years} Years  ${months} Months ${days} Days`
      );

    let artIMG = await getSettings.get(msg.guild_id);
    if (artIMG) {
      if (artIMG.wimage) {
        if (artIMG.wimage.toLowerCase().startsWith("http")) {
          embed2.setImage(artIMG.wimage);
        } else {
          embed2.setImage("https://artemis.rest/static/images/fire.gif");
        }
      } else {
        embed2.setImage("https://artemis.rest/static/images/fire.gif");
      }
    } else {
      embed2.setImage("https://artemis.rest/static/images/fire.gif");
    }

    try {
      await client.channels.cache
        .get(await getGuild.get(msg.guild_id).generalChannel)
        .send(`${target}`, { embed: embed2 });
    } catch (err) {
      console.log("");
    }
    const prefix = await CONFIG.PREFIX("PREFIX", gld.id);
    let mmsSend = await getSettings.get(gld.id).wmessage;
    if (mmsSend) {
      try {
        await target.send(
          `Welcome message from ${gld.name},\n\n${mmsSend}\n\nThe bot prefix for this server is: \`${prefix}\`.\nThe help command to see all commands is \`${prefix}command\`\nTo elaborate a command use \`${prefix}command command\``,
          {
            split: true,
          }
        );
      } catch (err) {
        console.log("");
      }
    }
  },
};
