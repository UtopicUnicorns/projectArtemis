////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "hug",
  description: "Hug a user!",
  permission: "0",
  explain: `Hug a user!.
  
Example usage: (PREFIX)hug @mention`,

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
    if (!msg.mentions[0]) return;

    request(
      "https://some-random-api.ml/animu/hug",
      function (error, response, body) {
        if (!body) return;
        const info = JSON.parse(body);
        if (!info) return;
        if (!info.link) return;

        snd.send(
          new Discord.MessageEmbed()
            .setTitle(
              `${mmbr.user.username} hugged ${msg.mentions[0].username}`
            )
            .setColor("RED")
            .setImage(info.link)
        );
      }
    );
  },
};
