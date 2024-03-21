////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "scorereset",
  description: "Resets all points!",
  permission: "3",
  explain: `Resets all points!

Example usage: (PREFIX)scorereset`,

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

    async function resetConfirm() {
      let resetMe = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );
      await resetMe.on("collect", async (m) => {
        if (m.content) {
          if (m.content.toLowerCase().includes("yes")) {
            let fetchScores = await db
              .prepare("SELECT * FROM scores WHERE guild = ?;")
              .all(gld.id);

            for (let i of fetchScores) {
              let score = await getScore.get(i.user, gld.id);

              score.points = 1;

              score.level = 1;

              await setScore.run(score);
            }

            resetMe.stop();

            return snd.send("All done, enjoy the reset!");
          }
          resetMe.stop();
        }
        resetMe.stop();
      });
    }

    snd.send(
      "Are you sure you want to reset all gathered points for everyone in your server?\n YES NO"
    );
    resetConfirm();
  },
};
