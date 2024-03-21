////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "joinlog",
  description: "Fetch the join logs.",
  permission: "2",
  explain: `Fetch the join logs.
See userID and join date sorted from new to old.
The --id flag will output just ID's sorted from newest join to oldest join.

Example usage: (PREFIX)joinlog
Example usage: (PREFIX)joinlog --id
Example usage: (PREFIX)joinlog 54
Example usage: (PREFIX)joinlog 97 --id`,

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

    let chainArr = [];
    let count = 0;

    let num = parseInt(arguments.toLowerCase().replace("--id"));
    if (!num) num = 200;
    if (num < 1) num = 200;

    if (arguments.toLowerCase().includes("--id")) {
      for (let i of chain) {
        count++;
        if (count <= num) {
          chainArr.push(`${i.usrid}`);
        }
      }

      await snd.send(chainArr, {
        split: true,
      });
    } else {
      for (let i of chain) {
        count++;
        if (count <= num) {
          chainArr.push(
            `\`(${count})ID: ${i.usrid}, JoinDate: ${moment(
              i.joindate,
              "x"
            ).format("DD/MM/YYYY HH:mm:ss")}\``
          );
        }
      }

      await snd.send(chainArr.join("\n"), {
        split: true,
      });
    }
  },
};
