////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "proton",
  description:
    "This command allows you to check if a steam game runs via proton on Linux.",
  permission: "0",
  explain: `This command allows you to check if a steam game runs via proton on Linux.
*Courtesy of ProtonDB*

Example usage: (PREFIX)proton subnautica`,

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
      `https://store.steampowered.com/api/storesearch/?term=${arguments}&l=english&cc=US&currency=1`,
      {
        json: true,
      },
      async (err, res, body) => {
        //if something went wrong
        if (err) return snd.send("An error occured!");

        //redefine the first entry
        let found = body.items[0];

        //if err
        if (!found) return snd.send("Game not found!");

        //Define stuff
        let gameName = found.name;
        let gameId = found.id;
        let gameThumb = found.tiny_image;
        let gameScore = found.metascore;
        let gameLinux = found.platforms.linux;

        //next request
        request(
          `https://www.protondb.com/api/v1/reports/summaries/${gameId}.json`,
          {
            json: true,
          },
          (err, res, body) => {
            //if something went wrong
            if (err) return snd.send("An error occured!");

            //Embed to send
            const embed = new Discord.MessageEmbed()
              .setTitle(`${gameName} (${gameScore})`)
              .setURL("https://www.protondb.com/app/" + gameId)
              .setThumbnail(gameThumb)
              .setDescription("Native: " + gameLinux)
              .addField("Rating confidence: ", body.confidence)
              .addField("Tier: ", body.tier)
              .addField("Trending Tier: ", body.trendingTier)
              .addField("Best rating given", body.bestReportedTier)
              .addField(
                "Steam Link",
                "https://store.steampowered.com/app/" + gameId
              )
              .addField(
                "ProtonDB Link: ",
                "https://www.protondb.com/app/" + gameId
              )
              .setImage(gameThumb)
              .setColor("#RANDOM");

            if (found.price) {
              if (found.price.final) {
                let price = found.price.final.toString();
                let len = price.length;
                let x =
                  "$" + price.slice(0, len - 2) + "," + price.slice(len - 2);
                embed.addField("Price: ", x);
              }
            }

            snd.send({
              embed: embed,
            });
          }
        );
      }
    );
  },
};
