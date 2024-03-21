////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "rolemenu",
  description: "This command generates a selectable menu for assignable roles.",
  permission: "2",
  explain: `This command generates a selectable menu for assignable roles.

Example usage: (PREFIX)rolemenu`,

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

    let fetchArray = [];
    let count = 0;
    await allroles.forEach(AR => {
      count++;
      
      if (gld.roles.cache.find(r => r.id === AR.roles)) {
        fetchArray.push(
          new disbut.MessageMenuOption()
            .setLabel(`${gld.roles.cache.get(AR.roles).name}`)
            .setEmoji(AR.emoji)
            .setValue(AR.roles)
            .setDescription(AR.description)
        );
      }
    });

    let select = new disbut.MessageMenu()
      .setID("rolemenu")
      .setPlaceholder("Click me for Role menu")
      .setMaxValues(fetchArray.length)
      .setMinValues(1);

    for (let i in fetchArray) {
      select.addOption(fetchArray[i]);
    }

    snd.send("Select your role", select);
  }
};
