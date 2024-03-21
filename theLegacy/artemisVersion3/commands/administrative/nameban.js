////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "nameban",
  description:
    "This command allows you to deny users with a specified username to join your guild.",
  permission: "2",
  explain: `This command allows you to deny users with a specified username to join your guild.

Example usage: (PREFIX)nameban --action=add
Example usage: (PREFIX)nameban --action=delete`,

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
    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    async function addA() {
      let addC = snd.createMessageCollector(m => m.author.id === msg.author.id);
      await addC.on("collect", async m => {
        let splitter = m.content;

        let addname = {
          gldidbadname: `${gld.id}${splitter}`,
          gldid: gld.id,
          badname: splitter
        };

        await setBN.run(await addname);

        snd.send("Done!");
        addC.stop();
      });
    }

    async function deleteA() {
      let delC = snd.createMessageCollector(m => m.author.id === msg.author.id);

      delC.on("collect", async m => {
        db.prepare(
          `DELETE FROM badnames WHERE gldid = '${gld.id}' AND badname = '${m.content}'`
        ).run();

        snd.send("Done!");
        return delC.stop();
      });
    }

    let split = arguments.toLowerCase().split("--action=");
    if (split[1]) {
      switch (split[1]) {
        case "add":
          snd.send(
            "Please write the name that should be automatically banned when they join your guild!"
          );
          return await addA();
          break;

        case "delete":
          snd.send(
            "Please write the name that should no longer get banned automatically when they join your guild!"
          );
          return await deleteA();
          break;
      }
    } else {
      return snd.send(
        `This command needs a parameter!\n\nTo check the nameban list go to: https://artemis.rest/nameban?guildid=${gld.id}`
      );
    }
  }
};
