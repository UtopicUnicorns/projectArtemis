////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "steal",
  description:
    "Steal an emoji or image and make it an emoji in your own server.",
  permission: "1",
  explain: `Steal an emoji or image and make it an emoji in your own server.
  
Example usage: (PREFIX)steal https://example.com/emote.gif --name= EmoteName
Example usage: (PREFIX)steal <:KEKW:730486351970959501> --name= EmoteName`,

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

    if (!arguments)
      return snd.send(`Steal an emoji or image and make it an emoji in your own server.
  
Example usage: ${prefix}steal https://example.com/emote.gif --name= EmoteName
Example usage: ${prefix}steal <:KEKW:730486351970959501> --name= EmoteName`);

    parseArg = arguments.toLowerCase().split("--name=");

    if (!parseArg) return snd.send("Please give me a proper flag.");
    if (!parseArg[1]) return snd.send("Please give me a proper emote name!");

    if (parseArg[0].toLowerCase().startsWith("http")) {
      IMAGE = parseArg[0].replace(/ /g, "");

      NAME = parseArg[1].replace(/ /g, "");

      return gld.emojis
        .create(`${IMAGE}`, `${NAME}`)
        .then((emoji) => snd.send(`Done added ${emoji}`))
        .catch((err) => {
          snd.send("An error occured!");
          console.log(err);
        });
    } else {
      IMAGE = parseArg[0]
        .replace(/ /g, "")
        .replace("<:", "")
        .replace(">", "")
        .replace("<a:", "")
        .split(":");

      if (!IMAGE[1]) return snd.send("Invalid emoji detected!");

      NAME = parseArg[1].replace(/ /g, "");

      request(
        `https://cdn.discordapp.com/emojis/${IMAGE[1]}.gif`,
        {
          json: true,
        },
        (err, res, body) => {
          if (res) {
            if (res.statusCode == "200") {
              gld.emojis
                .create(
                  `https://cdn.discordapp.com/emojis/${IMAGE[1]}.gif`,
                  `${NAME}`
                )
                .then((emoji) => snd.send(`Done added ${emoji}`))
                .catch((err) => snd.send("An error occured!"));
            } else {
              gld.emojis
                .create(
                  `https://cdn.discordapp.com/emojis/${IMAGE[1]}.png`,
                  `${NAME}`
                )
                .then((emoji) => snd.send(`Done added ${emoji}`))
                .catch((err) => snd.send("An error occured!"));
            }
          } else {
            snd.send("An error occured!");
          }
        }
      );
    }
  },
};
