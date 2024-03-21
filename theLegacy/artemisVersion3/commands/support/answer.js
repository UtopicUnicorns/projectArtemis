////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "support",
  name: "answer",
  description: "This command allows you to edit a previous support ticket.",
  permission: "0",
  explain: `This command allows you to edit a previous support ticket.
  
Example usage: (PREFIX)answer 10`,

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
    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    if (await isNaN(arguments))
      return snd.send("The message you send was not a number.");

    let openCase = await getSCase.get(arguments);

    if (!openCase) return snd.send("This case does not exist.");

    let embed = new Discord.MessageEmbed()
      .setColor("DARK_ORANGE")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .setTitle(`Case ${openCase.caseid}`)

      .addField("Opened by:", `${openCase.username}\n${openCase.userid}`)
      .setFooter(`${openCase.date}`);
    if (openCase.casemessage)
      embed.setDescription(`${openCase.casemessage.slice(0, 1000)}`);
    if (openCase.solution)
      embed.addField("Solution:", `${openCase.solution.slice(0, 1000)}`);
    if (openCase.solvedby) embed.addField("Solved by:", `${openCase.solvedby}`);
    if (openCase.attachments)
      embed.addField("Attachment", `${openCase.attachments}`);
    await snd.send(
      "In your next post please write down the answer to this support ticket.\nYou can cancel this action by writing `cancel`",
      embed
    );

    async function confirmActionFN() {
      let confirmAction = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );
      confirmAction.on("collect", async (m) => {
        if (m.content.toLowerCase() == "cancel") {
          await snd.send("Action was canceled!");
          return confirmAction.stop();
        }
        openCase.solution = m.content;
        openCase.solvedby = `${mmbr.user.username}#${mmbr.user.discriminator}`;

        await setSCase.run(openCase);
        await snd.send("Your solution has been posted!");
        return confirmAction.stop();
      });
    }

    confirmActionFN();
  },
};
