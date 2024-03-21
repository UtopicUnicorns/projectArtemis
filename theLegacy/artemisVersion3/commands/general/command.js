////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "command",
  description:
    "Shows all available commands, if you elaborate the command with a command name it will try to explain the command.",
  permission: "0",
  explain: `This command will attempt to display all available commands to your server.
  The command may be elaborated upon to ask the bot to explain a certain command in detail.

  Example usage: (PREFIX)command ping
  Example usage: (PREFIX)command`,

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
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    if (!arguments) {
      let cats = [];

      var afterProc = new Promise(async (resolve, reject) => {
        await client.commands.forEach(async com => {
          cats.push(com.category);
        });
        resolve();
      });
      afterProc.then(async () => {
        let uCats = await cats.filter(onlyUnique);
        let catFetch = [];

        uCats.forEach(AR => {
          catFetch.push(
            new disbut.MessageMenuOption()
              .setLabel(`${AR.toUpperCase()}`)
              .setValue(`${AR.toUpperCase()}`)
              .setDescription(`${AR} command list`)
          );
        });

        let select = new disbut.MessageMenu()
          .setID("commandCenter")
          .setPlaceholder("Command Categories")
          .setMaxValues(1)
          .setMinValues(1);

        for (let i in catFetch) {
          select.addOption(catFetch[i]);
        }

        snd.send(
          `You can get specific command info and example usages by typing:\n\`${prefix}command commandname\`\n\nThis command list is also available on:\n<https://artemis.rest/commands>\n\nClick to reveal category list.`,
          select
        );
      });
    } else {
      let comGet = await client.commands.get(arguments);
      if (!comGet) return snd.send("Command was not found!");
      let usag2 = getUsage.get(arguments);
      return snd.send(`
**Command name: ${comGet.name}**
  Permission level needed: \`${comGet.permission}\`
    Command used \`${usag2.number}\` times
      Command explanation:\n\`\`\`
${comGet.explain.replace(
  /\(PREFIX\)/g,
  `${await CONFIG.PREFIX("PREFIX", msg.guild_id)}`
)}\`\`\`
`);
    }
  }
};
