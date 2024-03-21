////////////////////////////////////
//When a reaction is added to a message
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.user_id);
    if (!mmbr) return;

    if (mmbr.user.bot) return;

    ////////////////////////////////////
    //Reaction role module
    //Gets triggered within a reaction channel
    ////////////////////////////////////
    let reactChan = await getGuild.get(msg.guild_id);
    if (reactChan) {
      let chanReact = await client.channels.cache.get(
        reactChan.reactionChannel
      );

      if (chanReact && chanReact.id == msg.channel_id) {
        const message = await client.channels.cache
          .get(c.d.channel_id)
          .messages.fetch(c.d.message_id);

        const emojiKey = msg.emoji.id || msg.emoji.name;

        const reaction = await message.reactions.cache
          .get(emojiKey)
          .users.remove(mmbr);

        if (msg.emoji.id) {
          let roleDBeId = await getRoles.get(msg.guild_id, msg.emoji.id);
          if (roleDBeId) {
            let findMeId = await mmbr.roles.cache.find(
              (r) => r.id === `${roleDBeId.roles}`
            );
            if (findMeId) {
              try {
                await mmbr.roles.remove(
                  await gld.roles.cache.find((r) => r.id === roleDBeId.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Taken Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeId.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            } else {
              try {
                await mmbr.roles.add(
                  await gld.roles.cache.find((r) => r.id === roleDBeId.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Given Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeId.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            }
          }
        } else {
          let roleDBeName = await getRoles.get(msg.guild_id, msg.emoji.name);
          if (roleDBeName) {
            let findMeName = await mmbr.roles.cache.find(
              (r) => r.id === `${roleDBeName.roles}`
            );
            if (findMeName) {
              try {
                await mmbr.roles.remove(
                  await gld.roles.cache.find((r) => r.id === roleDBeName.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Taken Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeName.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            } else {
              try {
                await mmbr.roles.add(
                  await gld.roles.cache.find((r) => r.id === roleDBeName.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Given Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeName.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            }
          }
        }
      }
    }

    ////////////////////////////////////
    //Highlight system
    //Gets triggered with tea emojis
    ////////////////////////////////////
    let chanHighl = await client.channels.cache.get(reactChan.highlightChannel);

    if (chanHighl) {
      let checkMsg = await getHighlight.get(msg.message_id);

      if (!checkMsg) {
        if (msg.emoji.name == "🍵") {
          let getMsg = await client.channels.cache
            .get(msg.channel_id)
            .messages.fetch(msg.message_id);
          if (getMsg) {
            let emoCol = await getMsg.reactions.cache.get("🍵");
            if (emoCol) {
              if (emoCol.count >= 3) {
                highLightset = {
                  msgid: msg.message_id,
                };

                await setHighlight.run(highLightset);

                let embed2 = new Discord.MessageEmbed()
                  .setAuthor(
                    `${getMsg.author.username}#${getMsg.author.discriminator}`,
                    `https://cdn.discordapp.com/avatars/${getMsg.author.id}/${getMsg.author.avatar}`
                  )
                  .setThumbnail(
                    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Cup_of_tea.png"
                  )
                  .addField(
                    "Message Link:",
                    `https://discord.com/channels/${getMsg.channel.guild.id}/${getMsg.channel.id}/${getMsg.id}`
                  )
                  .setColor("MAGENTA")
                  .setDescription("Message was highlighted!")
                  .setFooter(
                    `Highlighted on: ${moment().format(
                      "MMMM Do YYYY, HH:mm:ss"
                    )}`,
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Longjing_tea_steeping_in_gaiwan.jpg/1024px-Longjing_tea_steeping_in_gaiwan.jpg"
                  );

                if (getMsg.content)
                  embed2.addField(
                    "Message:",
                    `${getMsg.content.slice(0, 1000)}`
                  );

                if (getMsg.attachments.first())
                  embed2.setImage(getMsg.attachments.first().url);

                if (getMsg.attachments.first())
                  embed2.addField(
                    "Attachment:",
                    `${getMsg.attachments.first().url}`
                  );

                try {
                  await client.channels.cache
                    .get(msg.channel_id)
                    .send(
                      `Message has been highlighted in <#${await getGuild.get(
                        msg.guild_id
                      ).highlightChannel}>`
                    );
                } catch (err) {
                  console.log(err, "");
                }
                try {
                  await client.channels.cache
                    .get(await getGuild.get(msg.guild_id).highlightChannel)
                    .send({ embed: embed2 });
                } catch (err) {
                  console.log(err, "");
                }
              }
            }
          }
        }
      }
    }

    ////////////////////////////////////
    //Reaction log module
    //Gets triggered regardless
    ////////////////////////////////////
    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        mmbr.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("DARK_GREEN")
      .setDescription("React Emote added to a message")
      .addField(
        "Reaction member:",
        `${mmbr.user.username}#${mmbr.user.discriminator}`
      )
      .addField("Emote used:", `${msg.emoji.name}`)
      .addField("On message ID:", `${msg.message_id}`)
      .addField("In Channel:", `<#${msg.channel_id}>`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).reactadd) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
