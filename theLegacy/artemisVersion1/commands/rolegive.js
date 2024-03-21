const npm = require("../modules/NPM.js");
npm.npm();
module.exports = {
  name: `rolegive`,
  description: `[mod] Give a role to a member. rolegive @USER ROLENAME`,
  execute(message) {
    const getGuild = db.prepare("SELECT * FROM guildhub WHERE guild = ?");
    const prefixstart = getGuild.get(message.guild.id);
    const prefix = prefixstart.prefix;
    if (!message.member.hasPermission(`KICK_MEMBERS`)) return;
    //
    let getUsage = db.prepare("SELECT * FROM usage WHERE command = ?");
    let setUsage = db.prepare(
      "INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);"
    );
    usage = getUsage.get("rolegive");
    usage.number++;
    setUsage.run(usage);
    //
    let args = message.content.slice().split(` `);
    let rolegive = message.guild.roles.find((r) => r.name === `${args[2]}`);
    let member = message.mentions.members.first();
    let check = message.mentions.members
      .first()
      .roles.some((r) => [`${args[2]}`].includes(r.name));
    if (!check) {
      member.addRole(rolegive).catch(console.error);
      //LOGS
      const guildChannels = getGuild.get(message.guild.id);
      var logger = message.guild.channels.get(guildChannels.logsChannel);
      if (!logger) {
        var logger = "0";
      }
      if (logger == "0") {
      } else {
        const logsmessage = new Discord.RichEmbed()
          .setTitle(prefix + "rolegive")
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription("Used by: " + message.author)
          .setURL(message.url)
          .setColor("RANDOM")
          .addField("Usage:\n", message.content, true)
          .addField("Channel", message.channel, true)
          .setFooter("Message ID: " + message.id)
          .setTimestamp();
        logger
          .send({
            embed: logsmessage,
          })
          .catch((error) =>
            console.log(
              moment().format("MMMM Do YYYY, HH:mm:ss") +
                "\n" +
                __filename +
                ":" +
                ln()
            )
          );
      }
      //
      return message.channel.send(
        `Gave ${member} the following role: **${args[2]}**!`
      );
    }
    member.removeRole(rolegive).catch(console.error);
    //LOGS
    const guildChannels = getGuild.get(message.guild.id);
    var logger = message.guild.channels.get(guildChannels.logsChannel);
    if (!logger) {
      var logger = "0";
    }
    if (logger == "0") {
    } else {
      const logsmessage = new Discord.RichEmbed()
        .setTitle(prefix + "rolegive")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription("Used by: " + message.author)
        .setURL(message.url)
        .setColor("RANDOM")
        .addField("Usage:\n", message.content, true)
        .addField("Channel", message.channel, true)
        .setFooter("Message ID: " + message.id)
        .setTimestamp();
      logger
        .send({
          embed: logsmessage,
        })
        .catch((error) =>
          console.log(
            moment().format("MMMM Do YYYY, HH:mm:ss") +
              "\n" +
              __filename +
              ":" +
              ln()
          )
        );
    }
    //
    message.channel.send(
      `Took the following role: **${args[2]}** from: ${member}!`
    );
  },
};
