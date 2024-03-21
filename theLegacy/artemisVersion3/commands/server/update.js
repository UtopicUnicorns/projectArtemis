////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "update",
  description:
    "Send out an update message to all log channels of all connected servers.",
  permission: "4",
  explain: `Send out an update message to all log channels of all connected servers.

  Example usage (PREFIX)update`,

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

    await snd.send("Sending update...");

    const logslist = await db.prepare("SELECT * FROM guildhub").all(); //Get channels

    let count = 0;

    var logProm = new Promise(async (resolve, reject) => {
      await logslist.forEach(async L => {
        count++;

        if (count === logslist.length) resolve();
        if (
          L.logsChannel !== 0 ||
          L.logsChannel !== "0" ||
          L.logsChannel !== "remove" ||
          L.logsChannel !== "delete"
        ) {
          try {
            let chan = await client.channels.cache.get(L.logsChannel);

            let pre = await CONFIG.PREFIX("PREFIX", L.guild);

            let embed = new Discord.MessageEmbed()
              .setThumbnail("https://artemis.rest/images/icons/art.png")
              .setColor("GOLD")
              .setAuthor(
                "Artemis Update Manager",
                "https://artemis.rest/images/icons/artColor.png"
              )
              .setDescription(`${arguments}`)
              .addField(
                "GitHub:",
                `[Artemis V3 repository](https://github.com/UtopicUnicorns/ArtemisV3)`,
                true
              )
              .addField(
                "Website:",
                `[Artemis main website](https://artemis.rest)`,
                true
              )
              .addField("Report a bug:", `${pre}bug`, true)
              .setFooter(
                `Contact: .initrd#0383`,
                "https://artemis.rest/images/icons/artColor.png"
              );

            await chan.send(embed);
          } catch (error) {
            console.log(error);
          }
        }
      });
    });

    logProm.then(async () => {
      await snd.send("All servers have been notified.");
    });
  }
};
