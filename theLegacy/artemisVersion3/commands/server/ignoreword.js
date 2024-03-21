////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "ignoreword",
  description: "Add or remove a channel from the ignore list!",
  permission: "2",
  explain: `Add or remove a word from the ignore list!

Example usage: (PREFIX)ignoreword add
Example usage: (PREFIX)ignoreword remove`,

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
      return snd.send(`Add or remove a channel from the ignore list!

    Example usage: ${prefix}ignoreword add
    Example usage: ${prefix}ignoreword remove

    https://artemis.rest/ignore?guildid=${snd.id}
    `);
    }

    async function filterAddSTART() {
      let filterAdd = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      filterAdd.on("collect", async m => {
        let channelThis = m.content;

        if (!channelThis) {
          snd.send(
            "There seems to be no word(s) mentioned, stopping this action."
          );
          return filterAdd.stop();
        }

        filterEditAdd = {
          wordchan: `${snd.id}${channelThis}`,
          chan: snd.id,
          word: `${channelThis}`
        };

        await setWI.run(filterEditAdd);

        filterAdd.stop();

        return snd.send(
          `\`${channelThis}\` has been added to the ignore list!`
        );
      });
    }

    async function filterRemSTART() {
      let filterRem = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      filterRem.on("collect", async m => {
        let channelThis = m.content;

        if (!channelThis) {
          snd.send(
            "There seems to be no word(s) mentioned, stopping this action."
          );
          return filterRem.stop();
        }

        await db
          .prepare(
            `DELETE FROM wordignore WHERE word = '${channelThis}' AND chan = '${snd.id}'`
          )
          .run();

        filterRem.stop();

        return snd.send(
          `\`${channelThis}\` has been removed from the ignore list!`
        );
      });
    }

    if (arguments.toLowerCase().includes("add")) {
      snd.send(
        "Please mention the word(s) you want to add to the ignore list."
      );

      return filterAddSTART();
    }

    if (arguments.toLowerCase().includes("rem")) {
      snd.send(
        "Please mention the word(s) you want to remove from the ignore list."
      );

      return filterRemSTART();
    }
  }
};
