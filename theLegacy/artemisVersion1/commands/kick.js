const npm = require("../modules/NPM.js");
npm.npm();
module.exports = {
  name: "kick",
  description: "[mod] Kick a user from the server",
  execute(message) {
    const getGuild = db.prepare("SELECT * FROM guildhub WHERE guild = ?");
    const prefixstart = getGuild.get(message.guild.id);
    const prefix = prefixstart.prefix;
    if (!message.member.hasPermission("KICK_MEMBERS")) return;
    //
    let getUsage = db.prepare("SELECT * FROM usage WHERE command = ?");
    let setUsage = db.prepare(
      "INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);"
    );
    usage = getUsage.get("kick");
    usage.number++;
    setUsage.run(usage);
    //
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("You need to mention the member you want to kick!");
    }
    if (!member.kickable) {
      return message.reply("I can't kick this user.");
    }
    //LOGS
    const guildChannels = getGuild.get(message.guild.id);
    var logger = message.guild.channels.get(guildChannels.logsChannel);
    if (!logger) {
      var logger = "0";
    }
    if (logger == "0") {
    } else {
      const logsmessage = new Discord.RichEmbed()
        .setTitle(prefix + "kick")
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
    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch((error) => message.reply("Sorry, an error occured."));
  },
};
