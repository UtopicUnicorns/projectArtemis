////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "support",
  name: "open",
  description: "This command allows you to reopen a previous support ticket.",
  permission: "0",
  explain: `This command allows you to reopen a previous support ticket.
This command is to be used in a designated support creation channel.

Example usage: (PREFIX)open 20`,

  ////////////////////////////////////
  //We pass trough some predefined things
  //Within this command we can work with Client, raw content and a config file
  ////////////////////////////////////
  async execute(msg, client, CONFIG, npm, mmbr) {
    ////////////////////////////////////
    //We fetch the channel here
    //We can easely send with this const
    ////////////////////////////////////
    const snd = await client.channels.cache.get(msg.channel_id);

    ////////////////////////////////////
    //Defining the arguments here
    //Splits can happen later if needed
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);
    const comName = module.exports.name;
    const arguments = await msg.content.slice(
      prefix.length + comName.length + 1
    );

    ////////////////////////////////////
    //Main command starts here
    //Comments might get smaller here
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;
    let sChan = await getSupportChannels.get(msg.channel_id);

    if (await isNaN(arguments))
      return snd.send("The message you send was not a number.");

    let openCase = await getSCase.get(arguments);

    if (!openCase) return snd.send("This case does not exist.");

    if (sChan) {
      async function confirmActionFN() {
        let counter = 0;
        let confirmAction = snd.createMessageCollector(
          (m) => m.author.id === msg.author.id
        );
        confirmAction.on("collect", async (m) => {
          counter++;

          if (counter == 1) {
            if (m.content.toLowerCase() == "yes") {
              //OPEN
              try {
                await gld.channels
                  .create(`🔔re-case-${openCase.caseid}`, {
                    type: "text",
                    permissionOverwrites: [
                      {
                        id: gld.roles.everyone,
                        allow: [
                          "VIEW_CHANNEL",
                          "SEND_MESSAGES",
                          "READ_MESSAGE_HISTORY",
                        ],
                      },
                    ],
                  })
                  .then(async (chan) => {
                    await chan.setParent(snd.parent);

                    inuseset = {
                      chanid: chan.id,
                      caseid: openCase.caseid,
                    };

                    await setSupportInUseChannels.run(inuseset);

                    let getThis = getGuild.get(gld.id);
                    if (getThis) {
                      let testRole = await gld.roles.cache.find(
                        (r) => r.id === getThis.supportInUseChannel
                      );

                      if (testRole) {
                        await chan.send(`${testRole}, You have been summoned!`);
                      }
                    }

                    let embed = new Discord.MessageEmbed()
                      .setColor("DARK_ORANGE")
                      .setThumbnail(
                        `https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`
                      )
                      .setTitle(`Case ${openCase.caseid}`)
                      .setDescription(`${openCase.casemessage.slice(0, 1000)}`)
                      .addField(
                        "Opened by:",
                        `${openCase.username}\n${openCase.userid}`
                      )
                      .setFooter(`${openCase.date}`);

                    await chan
                      .send(`<@${mmbr.user.id}>`, embed)
                      .then((M) => M.pin());
                    if (openCase.attachments)
                      chan.send(`Attachment:\n${openCase.attachments}`);
                    await snd.send(
                      `<@${mmbr.user.id}>, Your case has been re-opened in: ${chan}.\nYour case number is \`${openCase.caseid}\`.`
                    );
                    return confirmAction.stop();
                  });
              } catch (err) {
                await snd.send("Something went wrong!");
                return confirmAction.stop();
              }
            } else {
              snd.send(
                "Alright, let me know when you do want to re-open a case!"
              );
              return confirmAction.stop();
            }
          }
        });
      }

      confirmActionFN();
      return snd.send(
        "Are you sure you want to re-open this case?\n`YES` or `NO`"
      );
    } else {
      snd.send("This is not a designated support creation channel.");
    }
  },
};
