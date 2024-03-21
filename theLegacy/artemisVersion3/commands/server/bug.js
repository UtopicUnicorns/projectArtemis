////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "bug",
  description: "Report a bug in the bot.",
  permission: "0",
  explain: `Report a bug in the bot.
Abuse will be punished.

Example usage: (PREFIX)bug`,

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

    async function bugStart() {
      let bugReport = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );
      let count = 0;

      let user = {
        username: `${await mmbr.user.username}#${await mmbr.user
          .discriminator}`,
        userid: await mmbr.id,
        guildname: await gld.name,
        guildid: await gld.id,
        date: await moment().format("DD/MM/YYYY HH:mm:ss"),
      };

      bugReport.on("collect", async (m) => {
        count++;
        if (m.content.toLowerCase() == "stop") {
          snd.send("Bug report has been canceled!");
          return bugReport.stop();
        }
        if (count == 1 && m.content.toLowerCase() !== "yes") {
          snd.send("Bug report has been canceled!");
          return bugReport.stop();
        }
        if (count == 1 && m.content.toLowerCase() == "yes") {
          return snd.send(
            `Alright let's start, if you want to quit this process you can write your message only containing the word \`stop\` and the process will be canceled.

Describe the bug you encountered; please be as detailed as possible without using pictures, since I don't watch those.`
          );
        }

        if (count == 2) {
          if (!m.content) {
            snd.send("Bug report has been canceled!");
            return bugReport.stop();
          }

          const bugGet = await m.content.slice(0, 1000);

          const newSnd = await client.channels.cache.get("808351134649548851");

          if (!newSnd) {
            snd.send(
              "I was not able to reach my main server, please try again later."
            );
            return bugReport.stop();
          }

          const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username} filed a bug`)
            .setDescription(`${bugGet}`)
            .addField(
              "User Data: ",
              `User name: ${user.username}\nUser ID: ${user.userid}\nGuild name: ${user.guildname}\nGuild ID: ${user.guildid}`
            )
            .setFooter(`${user.date}`)
            .setColor("DARK_GREEN");

          try {
            await newSnd.send(embed);
            await snd.send("Bug report has been filed!");
            return bugReport.stop();
          } catch (err) {
            snd.send(
              "I was not able to reach my main server, please try again later."
            );
            return bugReport.stop();
          }
        }

        bugReport.stop();
      });
    }

    bugStart();
    snd.send("Do you want to report a bug?\n`YES` or `NO`");
  },
};
