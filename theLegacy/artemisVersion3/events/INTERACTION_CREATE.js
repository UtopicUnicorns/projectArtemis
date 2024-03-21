module.exports = {
  eventTrigger: async function(c, client, CONFIG, npm) {
    ////////////////////////////////////
    //We define some quicker ways to call info
    //Basically you never need to do this, but it's easier.
    ////////////////////////////////////
    const msg = c.d;
    if (!msg) return;

    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);

    const snd = await client.channels.cache.get(msg.message.channel_id);
    if (!snd) return;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.member.user.id);
    if (!mmbr) return;

    ////////////////////////////////////
    //Do something with info
    //Perhaps try defining shit
    ////////////////////////////////////
    if (msg.data.custom_id == "commandCenter") {
      let catName = msg.data.values[0].toLowerCase();
      let prefixName = await CONFIG.PREFIX("PREFIX", msg.guild_id);
      let fetcher = [];
      var comfetch = new Promise(async (resolve, reject) => {
        await client.commands.forEach(async com => {
          if (com.category == catName) {
            let usag = getUsage.get(com.name);
            await fetcher.push(
              `Command name: \`${prefixName}${com.name}\` | Used \`${usag.number}\` times | Permission level: \`${com.permission}\`
  Small description: \n\`${com.description}\n\``
            );
          }
        });
        resolve();
      });

      comfetch.then(async () => {
        snd.send(`Category: **${catName}**\n\n${fetcher.join("\n")}`, {
          split: true
        });
      });
    }

    if (msg.data.custom_id == "rolemenu") {
      if (msg.data.values) {
        let reactChan = await getGuild.get(msg.guild_id);

        if (reactChan) {
          let chanReact = await client.channels.cache.get(
            reactChan.reactionChannel
          );

          if (chanReact && chanReact.id == msg.channel_id) {
            let roleArrayA = [];
            let roleArrayD = [];
            let countThis = 0;

            var roleUpdates = new Promise(async (resolve, reject) => {
              await msg.data.values.forEach(async V => {
                try {
                  let roleSelect = await gld.roles.cache.find(r => r.id === V);

                  if (roleSelect) {
                    let roleCheck = await mmbr.roles.cache.find(
                      r => r.id === `${V}`
                    );

                    if (roleCheck) {
                      await mmbr.roles.remove(roleSelect);
                      await roleArrayD.push(roleSelect.name);
                      countThis++;

                      if (countThis === msg.data.values.length) resolve();
                    } else {
                      await mmbr.roles.add(roleSelect);
                      await roleArrayA.push(roleSelect.name);
                      countThis++;
                      if (countThis === msg.data.values.length) resolve();
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              });
            });

            try {
              let x = await snd.send(
                mmbr,
                new Discord.MessageEmbed().addField(
                  `Roles being updated`,
                  `have some patience`
                )
              );

              roleUpdates.then(async () => {
                let embed = new Discord.MessageEmbed().addField(
                  `Roles updated`,
                  `Added \`${roleArrayA.length}\` roles.\nRemoved \`${roleArrayD.length}\` roles.`
                );

                await x.edit(mmbr, { embed }).then(message => {
                  message
                    .delete({
                      timeout: 5000,
                      reason: "It had to be done."
                    })
                    .catch(err => console.log(""));
                });
              });
            } catch (error) {
              console.log("");
            }
          }
        }
      }
    }

    //return console.log(msg.data.values, msg.data.custom_id);
    //let replyMsg = `${mmbr}, test ${prefix}`;
    //await snd.send(`${replyMsg}`);
  }
};
