////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "numbers",
  description:
    "This command shows the member sizes of the self asignable roles.",
  permission: "0",
  explain: `This command shows the member sizes of the self asignable roles.

Example usage: (PREFIX)numbers`,

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

    const allroles = await db
      .prepare("SELECT * FROM roles WHERE guild = ?;")
      .all(gld.id);

    if (allroles.length < 1) return snd.send("No roles found in database!");

    dataRole = [];

    for (const data of allroles) {
      //push into array2
      dataRole.push(await data);
    }

    finalRole = await [];

    let count = 0;

    var afterProc = new Promise(async (resolve, reject) => {
      await dataRole.forEach(async AR => {
        count++;
        
        if (gld.roles.cache.find(r => r.id === AR.roles)) {
          await finalRole.push(
            new disbut.MessageMenuOption()
              .setLabel(
                `${await gld.roles.cache.find(r => r.id === AR.roles).name}`
              )
              .setValue(AR.roles)
              .setEmoji(AR.emoji)
              .setDescription(
                `${await gld.roles.cache.find(r => r.id === AR.roles).members
                  .size} Members`
              )
          );
        }

        if (count === dataRole.length) resolve();
      });
    });

    afterProc.then(async () => {
      let select = new disbut.MessageMenu()
        .setID("numbersarray")
        .setPlaceholder("Show me the numbers")
        .setMaxValues(1)
        .setMinValues(1);

      for (let i in finalRole) {
        select.addOption(finalRole[i]);
      }

      snd.send("Click to view role numbers", select, {
        split: true
      });
    });
  }
};
