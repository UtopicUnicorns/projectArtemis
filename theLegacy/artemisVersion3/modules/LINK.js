////////////////////////////////////
//Message grab
//If found it gets processed
////////////////////////////////////
module.exports = {
  eventTrigger: async function(client, CONFIG, npm, mmbr, msg, snd, gld) {
    let linkArgs = msg.content.toLowerCase().split(" ");

    if (linkArgs) {
      let checkUrl = `https://discordapp.com/channels/${gld.id}/`;
      let checkUrlSecond = `https://discord.com/channels/${gld.id}/`;
      let checkUrlThird = `https://canary.discord.com/channels/${gld.id}/`;
      let checkUrlForth = `https://ptb.discord.com/channels/${gld.id}/`;

      for (let i of linkArgs) {
        if (
          i.includes(checkUrl) ||
          i.includes(checkUrlSecond) ||
          i.includes(checkUrlThird) ||
          i.includes(checkUrlForth)
        ) {
          let processURL = await i
            .replace("https://discordapp.com/channels/", "")
            .replace("https://discord.com/channels/", "")
            .replace("https://canary.discord.com/channels/", "")
            .replace("https://ptb.discord.com/channels/", "");

          processURL = await processURL.split("/");

          if (processURL[0] && processURL[1] && processURL[2]) {
            try {
              let fetchMsg = await client.channels.cache
                .get(processURL[1])
                .messages.fetch(processURL[2]);

              embed = new Discord.MessageEmbed()
                .setTitle("Message link contents")
                .setAuthor(
                  `${fetchMsg.author.username}#${fetchMsg.author.discriminator}`,
                  `https://cdn.discordapp.com/avatars/${fetchMsg.author.id}/${fetchMsg.author.avatar}`
                )

                .setColor("DARK_VIVID_PINK")
                .setFooter(
                  moment
                    .utc(fetchMsg.createdTimestamp)
                    .format("dddd, MMMM Do YYYY, HH:mm:ss")
                );

              if (fetchMsg.content)
                embed.setDescription(`${fetchMsg.content.slice(0, 1000)}`);

              if (fetchMsg.channel.id && fetchMsg.channel.name)
                embed.addField(
                  "Found in channel: ",
                  `<#${fetchMsg.channel.id}>\n${fetchMsg.channel.name}/${fetchMsg.channel.id}`
                );

              if (fetchMsg.attachments) {
                if (fetchMsg.attachments.first()) {
                  if (fetchMsg.attachments.first().attachment) {
                    embed.setImage(fetchMsg.attachments.first().attachment);
                    embed.addField(
                      "Attachment:",
                      `${fetchMsg.attachments.first().attachment}`
                    );
                  }
                }
              }
              try {
                await snd.send({ embed: embed });
              } catch (err) {
                console.log("");
              }
            } catch (err) {
              console.log("");
            }
          }
        }
      }
    }
  }
};
