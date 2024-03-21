////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "filterexception",
  description: "Add or remove a channel from the Automod filter exception!",
  permission: "2",
  explain: `Add or remove a channel from the Automod filter exception!

Example usage: (PREFIX)filterexception add
Example usage: (PREFIX)filterexception remove`,

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

    if (!arguments) {
      return snd.send(`Add or remove a channel from the Automod filter exception!

    Example usage: ${prefix}filterexception add
    Example usage: ${prefix}filterexception remove`);
    }

    async function filterAddSTART() {
      let filterAdd = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      filterAdd.on("collect", async m => {
        let channelThis = m.content
          .replace("<", "")
          .replace("@", "")
          .replace("&", "")
          .replace("!", "")
          .replace("#", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!channelThis) {
          snd.send(
            "There seems to be no channel mentioned, stopping this action."
          );
          return filterAdd.stop();
        }

        filterEditAdd = {
          chnid: channelThis
        };

        await setFE.run(filterEditAdd);

        filterAdd.stop();

        return snd.send(
          `<#${channelThis}> has been added to the exception list!`
        );
      });
    }

    async function filterRemSTART() {
      let filterRem = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      filterRem.on("collect", async m => {
        let channelThis = m.content
          .replace("<", "")
          .replace("@", "")
          .replace("&", "")
          .replace("!", "")
          .replace("#", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!channelThis) {
          snd.send(
            "There seems to be no channel mentioned, stopping this action."
          );
          return filterRem.stop();
        }

        await db
          .prepare(`DELETE FROM filterexcept WHERE chnid = '${channelThis}'`)
          .run();

        filterRem.stop();

        return snd.send(
          `<#${channelThis}> has been removed from the exception list!`
        );
      });
    }

    if (arguments.toLowerCase().includes("add")) {
      snd.send(
        "Please mention the channel you want to add to the exception list, you may also use the channelID if needed."
      );

      return filterAddSTART();
    }

    if (arguments.toLowerCase().includes("rem")) {
      snd.send(
        "Please mention the channel you want to remove from the exception list, you may also use the channelID if needed."
      );

      return filterRemSTART();
    }
  }
};
