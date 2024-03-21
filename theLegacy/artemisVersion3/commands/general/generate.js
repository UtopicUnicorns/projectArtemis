////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "generate",
  description: "generate",
  permission: "4",
  explain: `generate`,

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
    function permCheck() {
      let perm = "0";

      if (mmbr.permissions.has("MUTE_MEMBERS")) perm = "1";
      if (mmbr.permissions.has("KICK_MEMBERS")) perm = "2";
      if (mmbr.permissions.has("BAN_MEMBERS")) perm = "3";
      if (mmbr.id == CONFIG.CONFIG("OWNER")) perm = "4";

      return perm;
    }

    let num = await permCheck();

    let cats = [];
    await client.commands.forEach(async (com) => {
      if (!cats[com.category]) cats[com.category] = [];
      if (com.permission > num) return;
      let usag = getUsage.get(com.name);
      await cats[com.category].push(
        `
#### Command name: \`${await CONFIG.PREFIX("PREFIX", msg.guild_id)}${com.name}\`
Permission level: \`${com.permission}\`
Description:\n\`\`\`sh\n${com.explain.replace(/\(PREFIX\)/g, "!")}\n\`\`\``
      );
    });
    let doneCats = [];
    let procCats = [];

    await client.commands.forEach(async (cat) => {
      if (!procCats[cat.category]) {
        procCats[cat.category] = "DONE";
        await doneCats.push(
          `\n### Category: ${cat.category}${await cats[cat.category]}`
        );
      }
    });

    async function confirmActionFN() {
      let confirmAction = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );
      confirmAction.on("collect", async (m) => {
        if (m.content.toLowerCase() == "yes") {
          fs.writeFile(
            "generatedCommands.txt",
            doneCats.join("\n"),
            function (err) {
              if (err) return console.log(err);
              console.log("Hello World > helloworld.txt");
            }
          );
          confirmAction.stop();
        } else {
          snd.send("Command canceled!");
          confirmAction.stop();
        }
      });
    }

    confirmActionFN();
    snd.send("`YES` or `NO`");
  },
};
