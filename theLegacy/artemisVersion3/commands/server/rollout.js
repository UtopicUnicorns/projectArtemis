////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "rollout",
  description: "Roll out a JSON file of all support tickets.",
  permission: "4",
  explain: `Roll out a JSON file of all support tickets.

  Example usage (PREFIX)rollout`,

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

    await snd.send("Fetching data...");

    let collectedData = [];

    const fetchData = await db.prepare("SELECT * FROM supportcases;").all();

    await snd.send("Fetched data, collecting information...");

    for (let i of fetchData) {
      collectedData.push(
        JSON.stringify({ question: i.casemessage, answer: i.solution })
      );
    }

    await snd.send("Information collected, processing...");

    fs.writeFile("./support_cases.json", collectedData, function (err) {
      if (err) throw err;
      snd.send("Process complete!");
    });
  },
};
