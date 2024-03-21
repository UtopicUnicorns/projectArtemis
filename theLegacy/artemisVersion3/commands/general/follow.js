////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "follow",
  description: "Check what links redirect to.",
  permission: "0",
  explain: `Check what links redirect to..

Example usage: (PREFIX)follow https://artemis.rest`,

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
    request(
      arguments,
      {
        json: true,
      },
      (err, res, body) => {
        if (!body) return snd.send("Page was not found, sorry.");

        return snd.send(`\`\`\`html\n${body.slice(0, 1500)}\n\`\`\``);
      }
    );
  },
};
