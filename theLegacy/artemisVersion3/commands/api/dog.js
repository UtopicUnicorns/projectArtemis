////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "api",
  name: "dog",
  description: "Get a random dog!",
  permission: "0",
  explain: `Get a random dog!
  
Example usage: (PREFIX)dog`,

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

    request(
      `https://dog.ceo/api/breeds/image/random`,
      {
        json: true,
      },
      (err, res, body) => {
        //if something went wrong
        if (err) return snd.send("An error occured!");
        if (!body) return snd.send("An error occured!");
        if (!body.message) return snd.send("An error occured!");

        let embed = new Discord.MessageEmbed()
          .setColor("MAGENTA")
          .setImage(`${body.message}`);
        return snd.send(embed);
      }
    );
  },
};
