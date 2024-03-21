////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "emoji",
  description: "Show a big version of an emoji.",
  permission: "0",
  explain: `Show a big version of an emoji.
  
Example usage: (PREFIX)emoji <:KEKW:730486351970959501>`,

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

    split = arguments.split(" ");
    if (!split[0])
      return snd.send("Might want to send an emoji for me to parse");

    split = split[0].split(":");

    if (!split[2])
      return snd.send("Might want to send an emoji for me to parse");

    split = split[2].replace(">", "");

    request(
      `https://cdn.discordapp.com/emojis/${split}.gif`,
      {
        json: true,
      },
      (err, res, body) => {
        if (res) {
          //if valid response for gif
          if (res.statusCode == "200") {
            embed = new Discord.MessageEmbed().setImage(
              `https://cdn.discordapp.com/emojis/${split}.gif`
            );
            snd.send({
              embed: embed,
            });
          } else {
            embed = new Discord.MessageEmbed().setImage(
              `https://cdn.discordapp.com/emojis/${split}.png`
            );
            snd.send({
              embed: embed,
            });
          }
        } else {
          snd.send("Invalid emoji!");
        }
      }
    );
  },
};
