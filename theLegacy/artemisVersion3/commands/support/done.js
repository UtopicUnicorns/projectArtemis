////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "support",
  name: "done",
  description: "Close an in-use support session.",
  permission: "0",
  explain: `Close an in-use support session.
You can only use this command within an in-use support session.

Example usage: (PREFIX)done`,

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
    let sChan = await getSupportInUseChannels.get(msg.channel_id);

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
              return snd.send(
                "If you got a solution for this case then please write it here."
              );
            } else {
              snd.send("Alright, let me know when you do want to close it!");
              return confirmAction.stop();
            }
          }

          if (counter == 2) {
            let modify = await getSCase.get(sChan.caseid);
            if (!modify) {
              snd.send(
                "A CRITICAL ERROR OCCURED!\nPlease report this as a bug."
              );
              return confirmAction.stop();
            } else {
              modify.solution = m.content;
              modify.solvedby = `${mmbr.user.username}#${mmbr.user.discriminator}`;

              await setSCase.run(modify);
              await db
                .prepare(
                  `DELETE FROM supportinusechannels WHERE chanid = '${msg.channel_id}'`
                )
                .run();
              await snd.send(
                "If you provided a solution then it has been recorded!\n\nThis channel will self-destruct in 10 seconds!"
              );

              setTimeout(async () => {
                try {
                  return await snd.delete();
                } catch (err) {
                  return snd.send(
                    "I could not delete this channel, perhaps I am missing permissions."
                  );
                }
              }, 10000);
            }
          }
        });
      }

      confirmActionFN();
      return snd.send(
        "Are you sure you want to close this case?\n`YES` or `NO`"
      );
    } else {
      snd.send("This is not an in-use support session channel.");
    }
  },
};
