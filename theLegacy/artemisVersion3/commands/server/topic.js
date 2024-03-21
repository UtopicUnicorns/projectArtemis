////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "topic",
  description: "This command allows you to set a topic or create/view them.",
  permission: "1",
  explain: `This command allows you to set a topic or create/view them.
Without parameters this command will pull a random topic and applies it.

Example usage: (PREFIX)topic
Example usage: (PREFIX)topic Example Topic text --action=create
Example usage: (PREFIX)topic --action=view`,

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

    let actionSel = await arguments.split("--action=");

    if (actionSel[1]) {
      switch (actionSel[1].toLowerCase()) {
        case "create":
          if (!actionSel[0]) return snd.send("Please provide some topic text!");

          topicCreate = {
            gldidtime: `${gld.id}-${moment().format("x")}`,
            gldid: gld.id,
            topictext: `${actionSel[0]}`,
          };

          await setTopic.run(topicCreate);

          return snd.send("Topic was created!");
          break;

        case "view":
          let topicView = await db
            .prepare("SELECT topictext FROM topic WHERE gldid = ?;")
            .all(gld.id);

          if (!topicView[0]) return snd.send("No topics were found!");

          topics = [];
          count = 0;

          for (let i of topicView) {
            count++;
            topics.push(`**[${count}]** \`${i.topictext}\n\``);
          }

          return await snd.send(topics.join("\n\n"), {
            split: true,
          });
          break;
      }
    }

    let topicSel = await db
      .prepare("SELECT topictext FROM topic WHERE gldid = ?;")
      .all(gld.id);

    if (!topicSel[0])
      return snd.send("No topics found, please create some first!");

    selected = await topicSel[~~(Math.random() * topicSel.length)].topictext;

    if (snd.topic) {
      topicRestore = snd.topic;
    } else {
      topicRestore = "No topic set!";
    }

    let embed = new Discord.MessageEmbed()
      .setColor("DARK_ORANGE")
      .setTitle(`Channel topic was set`)
      .setDescription(`${selected}`)
      .setFooter(
        `This will be the topic for the next 30 minutes! Behave properly.`
      );

    await snd.send(embed);

    setTimeout(async () => {
      try {
        await snd.send("Topic time is now over, be free my people!");
        await snd.setTopic(topicRestore);
      } catch (err) {
        console.log("");
      }
    }, 900000);

    try {
      await snd.setTopic(selected.slice(0, 100));
    } catch (err) {
      console.log("");
    }
  },
};
