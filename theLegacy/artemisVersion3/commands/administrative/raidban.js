////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "raidban",
  description:
    "This command lets you ban users from the userjoin list sorted by newest join to oldest join.",
  permission: "2",
  explain: `This command lets you ban users from the userjoin list sorted by newest join to oldest join.
Use (PREFIX)joinlog as a reference sheet!

Example usage: (PREFIX)raidban 100
Example usage: (PREFIX)raidban 54`,

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

    const chain = await db
      .prepare(
        "SELECT * FROM joinchain WHERE gldid = ? ORDER BY joindate DESC;"
      )
      .all(gld.id);

    let chainArr = ["Banned the following users:"];
    let count = 0;

    let num = parseInt(arguments.toLowerCase().replace("--id"));
    if (!num) num = 0;
    if (num < 1) num = 0;

    if (num == 0)
      return snd.send(
        "You have to specify a number which is above 0 to be able to use this command!"
      );

    for (let i of chain) {
      count++;
      if (count <= num) {
        try {
          await gld.members.ban(i.usrid);
          chainArr.push(
            `\`ID: ${i.usrid}, JoinDate: ${moment(i.joindate, "x").format(
              "DD/MM/YYYY HH:mm:ss"
            )}\``
          );
        } catch (err) {
          console.log("");
        }
      }
    }

    await snd.send(chainArr.join("\n"), {
      split: true,
    });
  },
};
