////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "purge",
  description: "Allows you to purge messages in the current channel.",
  permission: "1",
  explain: `Allows you to purge messages in the current channel.
The limit decided by the API is 100 messages.

Example usage: (PREFIX)purge 100
Example usage: (PREFIX)purge 2`,

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

    if (isNaN(arguments)) {
      amount = 100;
    } else {
      if (arguments > 100) {
        amount = 100;
      } else {
        if (arguments < 1) {
          amount = 100;
        } else {
          amount = arguments;
        }
      }
    }

    snd.messages
      .fetch({
        limit: 100,
      })
      .then(async (m) => {
        messages = m.array().slice(0, amount);

        try {
          await snd.bulkDelete(messages);
        } catch (err) {
          snd.send("An error has occured!");
        }
      });
  },
};
