////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "permissions",
  description:
    "This command allows you to see what permissions the bot has in the channel you use the command in.",
  permission: "1",
  explain: `This command allows you to see what permissions the bot has in the channel you use the command in.
  
  Example usage: (PREFIX)permissions`,

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

    const embed = new Discord.MessageEmbed()
      .setColor("DARK_VIVID_PINK")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .addField(
        "I am checking my permissions for this channel",
        `Please wait for a bit.`
      );

    const m = await snd
      .send({
        embed: embed,
      })
      .catch((err) => console.log(""));

    let admP = await snd.guild.me.hasPermission(["ADMINISTRATOR"]);
    let invP = await snd.guild.me.hasPermission(["CREATE_INSTANT_INVITE"]);
    let kicP = await snd.guild.me.hasPermission(["KICK_MEMBERS"]);
    let banP = await snd.guild.me.hasPermission(["BAN_MEMBERS"]);
    let chanP = await snd.guild.me.hasPermission(["MANAGE_CHANNELS"]);
    let guilP = await snd.guild.me.hasPermission(["MANAGE_GUILD"]);
    let reaP = await snd.guild.me.hasPermission(["ADD_REACTIONS"]);
    let audP = await snd.guild.me.hasPermission(["VIEW_AUDIT_LOG"]);

    let viewP = await snd.guild.me.hasPermission(["VIEW_CHANNEL"]);
    let sndP = await snd.guild.me.hasPermission(["SEND_MESSAGES"]);
    let ttsP = await snd.guild.me.hasPermission(["SEND_TTS_MESSAGES"]);
    let msgmP = await snd.guild.me.hasPermission(["MANAGE_MESSAGES"]);
    let prevP = await snd.guild.me.hasPermission(["EMBED_LINKS"]);
    let fileP = await snd.guild.me.hasPermission(["ATTACH_FILES"]);
    let hisP = await snd.guild.me.hasPermission(["READ_MESSAGE_HISTORY"]);
    let eveP = await snd.guild.me.hasPermission(["MENTION_EVERYONE"]);
    let extemoP = await snd.guild.me.hasPermission(["USE_EXTERNAL_EMOJIS"]);

    let voiP = await snd.guild.me.hasPermission(["CONNECT"]);
    let vspeakP = await snd.guild.me.hasPermission(["SPEAK"]);
    let muteP = await snd.guild.me.hasPermission(["MUTE_MEMBERS"]);
    let deafP = await snd.guild.me.hasPermission(["DEAFEN_MEMBERS"]);
    let moveP = await snd.guild.me.hasPermission(["MOVE_MEMBERS"]);
    let vadP = await snd.guild.me.hasPermission(["USE_VAD"]);
    let nickP = await snd.guild.me.hasPermission(["CHANGE_NICKNAME"]);

    let mannicP = await snd.guild.me.hasPermission(["MANAGE_NICKNAMES"]);
    let manrolP = await snd.guild.me.hasPermission(["MANAGE_ROLES"]);
    let hookP = await snd.guild.me.hasPermission(["MANAGE_WEBHOOKS"]);
    let emoP = await snd.guild.me.hasPermission(["MANAGE_EMOJIS"]);

    const embed2 = new Discord.MessageEmbed()
      .setColor("DARK_VIVID_PINK")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .setTitle("Permissions bot for this channel").setDescription(`
      \`Administrator:\` **${admP}**
\`Create Invite:\` **${invP}**
\`Kick members:\` **${kicP}**
\`Ban members:\` **${banP}**
\`Edit/re-order channels:\` **${chanP}**
\`Edit guild info:\` **${guilP}**
\`Add reactions:\` **${reaP}**
\`View audit log:\` **${audP}**
\`View channel:\` **${viewP}**
\`Send message:\` **${sndP}**
\`Send TTS:\` **${ttsP}**
\`Manage message:\` **${msgmP}**
\`Embed links:\` **${prevP}**
\`Attach file:\` **${fileP}**
\`Read message history:\` **${hisP}**
\`Mention @here and @everyone:\` **${eveP}**
\`Foreign emoji use:\` **${extemoP}**
\`Join voice channel:\` **${voiP}**
\`Speak in voice channel:\` **${vspeakP}**
\`Mute users:\` **${muteP}**
\`Deafen users:\` **${deafP}**
\`Move users:\` **${moveP}**
\`Voice activation detection:\` **${vadP}**
\`Change own nickname:\` **${nickP}**
\`Manage nicknames:\` **${mannicP}**
\`Manage roles:\` **${manrolP}**
\`Manage webhooks:\` **${hookP}**
\`Manage emoji:\` **${emoP}**

      `);

    m.edit({
      embed: embed2,
    }).catch((err) => console.log(""));
  },
};
