////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "wordban",
  description: "Allows you to add or remove blocked words.",
  permission: "1",
  explain: `Allows you to add or remove blocked words.
To use this in action you need to have automod enabled!

Example usage: (PREFIX)wordban --action=add
Example usage: (PREFIX)wordban --action=delete`,

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

    async function addA() {
      let addC = snd.createMessageCollector(m => m.author.id === msg.author.id);
      await addC.on("collect", async m => {
        let splitter = m.content.toLowerCase().split(" ");

        for (let i of splitter) {
          if (i !== "") {
            addWord = await {
              gldidtime: `${gld.id}${moment().format("x")}${Math.random() *
                100}`,
              gldid: gld.id,
              badwords: i.toLowerCase()
            };

            await setBW.run(await addWord);
          }
        }

        snd.send("Done!");
        addC.stop();
      });
    }

    async function deleteA() {
      let delC = snd.createMessageCollector(m => m.author.id === msg.author.id);

      delC.on("collect", async m => {
        m.content
          .toLowerCase()
          .split(" ")
          .forEach(async mess => {
            db.prepare(
              `DELETE FROM badword WHERE gldid = '${gld.id}' AND badwords = '${mess}'`
            ).run();
          });

        snd.send("Done!");
        return delC.stop();
      });
    }

    let split = arguments.toLowerCase().split("--action=");
    if (split[1]) {
      switch (split[1]) {
        case "add":
          snd.send(
            "Please write the word or words(seperated by a space) you want to get auto removed when automod is on in the next message!"
          );
          return await addA();
          break;

        case "delete":
          snd.send(
            "Please write the word or words(seperated by a space) you want to remove from the automod remover!"
          );
          return await deleteA();
          break;
      }
    } else {
      return snd.send(
        `This command needs a parameter!\n\nTo check the wordban list go to: https://artemis.rest/wordban?guildid=${gld.id}`
      );
    }
  }
};
