////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "ping",
  description:
    "This command checks the latency between the server, discord and yourself.",
  permission: "0",
  explain: `This command checks the latency between the server, discord and yourself.
  
Example usage: (PREFIX)ping`,

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
    const m = await snd.send("Ping?").catch((err) => console.log("")); //Send first message, defined as X to edit it
    if (!m) return snd.send("Something went wrong!");

    let i1 = moment(msg.timestamp).format("x");
    let i2 = moment(m.createdTimestamp).format("x");

    m.edit(
      `Ping is ${i2 - i1}ms.\nAPI Latency is ${Math.round(client.ws.ping)}ms`
    ).catch((err) => console.log("")); //Editing X to return a ping
  },
};
