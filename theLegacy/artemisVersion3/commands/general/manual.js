////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "manual",
  description: "This command is able to fetch Linux manual pages.",
  permission: "0",
  explain: `This command is able to fetch Linux manual pages.
  
Example usage: (PREFIX)manual neofetch`,

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
    let keyword = arguments;
    let search = `cheat.sh/${keyword}`;
    browser.browse(search, async function (err, out) {
      const text = html.fromString(out.result, {
        wordwrap: 130,
      });
      proc = text.split("\n").slice(1, -1);

      array = [];
      await proc.forEach((p) => {
        if (p !== "")
          array.push(
            `\`${p
              .replace("Follow @igor_chubin", "")
              .replace("[https://twitter.com/igor_chubin] cheat.sh", "")
              .replace("[https://github.com/chubin/cheat.sh] tldr", "")}\``
          );
      });
      await snd.send(array.join("\n"), {
        split: true,
      });
    });
  },
};
