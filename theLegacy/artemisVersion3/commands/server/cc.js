////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "cc",
  description: "Custom command creation and deletion.",
  permission: "2",
  explain: `Custom command creation and deletion.
This command allows you to make or delete a custom command, commands made like this are fairly simple.

Example usage: (PREFIX)cc --action=create
Example usage: (PREFIX)cc --action=view
Example usage: (PREFIX)cc --action=delete`,

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

    function confirmCreate() {
      let confirmCreateA = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );

      let createCount = 0;

      let ccName;
      let ccLocation;
      let ccAction;

      confirmCreateA.on("collect", (m) => {
        if (!m.content) {
          confirmCreateA.stop();
          return snd.send("Action has been canceled!");
        }

        if (m.content.toLowerCase() == "cancel") {
          confirmCreateA.stop();
          return snd.send("Action has been canceled!");
        }

        createCount++;

        switch (createCount) {
          case 1:
            ccName = `${m.content}`;

            return snd.send(
              `Where does the command have to be used, at the \`START\` or \`ANYWHERE\`?\n\nExample: **custom** how are you\nExample: Hey there **custom** how are you`
            );
            break;

          case 2:
            if (m.content.toLowerCase() !== "start") {
              ccLocation = "ANYWHERE";
            } else {
              ccLocation = "START";
            }

            return snd.send(
              "What does the bot have to say when the custom command is triggered?\n\nExample: `[author] slaps [mention] with a large trout!`\n\nTo include the author as a tag use `[author]`\nTo include the first mentioned user as a tag use `[mention]`"
            );
            break;

          case 3:
            ccAction = m.content;

            commandCreation = {
              gldidtime: moment().format("x"),
              gldid: gld.id,
              ccname: ccName,
              cclocation: ccLocation,
              ccaction: ccAction,
            };

            setCC.run(commandCreation);

            return snd.send("Custom Command has been created!");
            break;
        }
      });
    }

    function confirmDelete() {
      let confirmDeleteA = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );

      confirmDeleteA.on("collect", (m) => {
        if (!m.content) {
          confirmCreateA.stop();
          return snd.send("Action has been canceled!");
        }

        if (m.content.toLowerCase() == "cancel") {
          confirmCreateA.stop();
          return snd.send("Action has been canceled!");
        }

        db.prepare(
          `DELETE FROM cc WHERE gldid = '${gld.id}' AND ccname = '${m.content}'`
        ).run();

        confirmDeleteA.stop();

        return snd.send("Custom command has been deleted!");
      });
    }

    if (!arguments) {
      return snd.send(`Custom command creation and deletion.
This command allows you to make or delete a custom command, commands made like this are fairly simple.

Example usage: ${prefix}cc --action=create
Example usage: ${prefix}cc --action=view
Example usage: ${prefix}cc --action=delete

https://artemis.rest/cc?guildid=${gld.id}
`);
    }

    if (arguments.toLowerCase().includes("--action=")) {
      argSplit = arguments.toLowerCase().split("--action=");
      if (!argSplit[1]) return snd.send("Please select an action!");

      switch (argSplit[1]) {
        case "create":
          snd.send("What word or phrase has to trigger the custom command?");
          return confirmCreate();
          break;

        case "view":
          let pull = await db
            .prepare('SELECT * FROM cc WHERE gldid = ? ORDER BY "ccname" ASC')
            .all(gld.id);

          if (!pull[0]) return snd.send("No custom commands found!");

          array = [];

          await pull.forEach((P) => {
            array.push(
              `Command: \`${P.ccname}\` \\\\ Location: \`${P.cclocation}\` \\\\ Action: \`${P.ccaction}\``
            );
          });

          await snd.send(array.join("\n"), {
            split: true,
          });

          break;

        case "delete":
          let x = getCC.get(gld.id);
          if (!x) return snd.send("No custom commands found!");

          snd.send("Which custom command do you want to remove?");
          return confirmDelete();
          break;
      }
    }
  },
};
