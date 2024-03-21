////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "massrole",
  description: "This command allows you to give everyone a role.",
  permission: "2",
  explain: `This command allows you to give everyone a role.
Please use a role ID if you are in a public channel.

Example usage: (PREFIX)massrole roleID
Example usage: (PREFIX)massrole @roleMention`,

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

    if (!arguments)
      return snd.send(
        "Please mention a role or role ID which I should add to every member in the server."
      );

    let parseMsg = await arguments
      .replace("<", "")
      .replace("@", "")
      .replace("&", "")
      .replace(">", "");

    let role = await gld.roles.cache.find((r) => r.id === parseMsg);

    if (!role) return snd.send("You selected an invalid role!");

    await gld.members.fetch();

    let array = await gld.members.cache.map((m) => m);

    snd.send("This will take a while.");

    for (let i of array)
      if (!i.roles.cache.find((r) => r.id === role.id))
        if (!i.user.bot) await gld.members.cache.get(i.user.id).roles.add(role);

    snd.send(`And we are done!\nAdded \`${role.name}\` to everyone.`);
  },
};
