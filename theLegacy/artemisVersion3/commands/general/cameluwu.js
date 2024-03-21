////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "cameluwu",
  description: "Convert text to cameluwu.",
  permission: "0",
  explain: `Convert text to cameluwu.

Example usage: (PREFIX)cameluwu Welcome to the jungle!`,

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
    if (!arguments) return snd.send("Please type some text.");
    v = arguments.toLowerCase();

    function firstLetterUppercase(input) {
      var res = "";
      for (i = 0; i < input.length; i++) {
        res += i % 2 == 0 ? input.charAt(i).toUpperCase() : input.charAt(i);
      }
      return res;
    }

    v = await firstLetterUppercase(v);

    v = v.replace(/(?:r|l)/g, "w");
    v = v.replace(/(?:R|L)/g, "W");
    v = v.replace(/n([aeiou])/g, "ny$1");
    v = v.replace(/N([aeiou])/g, "Ny$1");
    v = v.replace(/N([AEIOU])/g, "Ny$1");
    v = v.replace(/ove/g, "uv");
    v = v.replace(/o/g, "owo");
    v = v.replace(/O/g, "OwO");
    v = v.replace(/u/g, "uwu");
    v = v.replace(/U/g, "UwU");

    return snd.send(v);
  },
};
