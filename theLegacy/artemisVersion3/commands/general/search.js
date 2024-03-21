////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "search",
  description: "Search the internet within Discord!",
  permission: "0",
  explain: `Search the internet within Discord!
This command will pull your search query trough StartPage.

Example usage: (PREFIX)search Why do farts smell?`,

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
    //let search = `cheat.sh/${keyword}`;
    let search = `https://www.startpage.com/do/search?lr=lang_en&q=${keyword}`;
    browser.browse(search, async function (err, out) {
      const text = html.fromString(out.result, {
        wordwrap: 130,
      });

      proc = text
        .replace(/\[https\:\/\/eu\-browse\..*\]/gm, "")
        .replace(/Anonymous\sView/gm, "")
        .replace(/\/\?sc\=.*WEB\sRESULTS/s, "")
        .replace(/\nNext\n.*/s, "")
        .split(/\[.*\]/);

      let array = [];
      proc.forEach((p) => {
        p1 = p.split("\n");
        p1.forEach((p2) => {
          if (p2 !== "") array.push(p2);
        });
      });

      let links = [];
      let title = [];
      let rest = [];
      array.forEach((a) => {
        if (a.startsWith("https://")) links.push(a);
        if (a == a.toUpperCase()) title.push(a);
        if (!a.startsWith("https://") && a !== a.toUpperCase()) rest.push(a);
      });

      let embed = new Discord.MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")
        .setThumbnail(
          mmbr.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setDescription(`Search results for: \`${keyword}\``)
        .setTimestamp()
        .setFooter("Powered by startpage.");

      if (title[0] && links[0] && rest[0]) {
        embed.addField(
          `${title[0]}`,
          `${rest[0]}\n\n[Go to Site](${links[0]})`
        );
      }

      if (title[1] && links[1] && rest[1]) {
        embed.addField(
          `${title[1]}`,
          `${rest[1]}\n\n[Go to Site](${links[1]})`
        );
      }

      if (title[2] && links[2] && rest[2]) {
        embed.addField(
          `${title[2]}`,
          `${rest[2]}\n\n[Go to Site](${links[2]})`
        );
      }

      if (title[3] && links[3] && rest[3]) {
        embed.addField(
          `${title[3]}`,
          `${rest[3]}\n\n[Go to Site](${links[3]})`
        );
      }

      if (title[4] && links[4] && rest[4]) {
        embed.addField(
          `${title[4]}`,
          `${rest[4]}\n\n[Go to Site](${links[4]})`
        );
      }

      await snd.send({ embed });
    });
  },
};
