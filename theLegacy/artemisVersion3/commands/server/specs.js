////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "specs",
  description: "See, set and view specifications.",
  permission: "0",
  explain: `See, set and view specifications.

Example usage: (PREFIX)specs
Example usage: (PREFIX)specs @mention
Example usage: (PREFIX)specs userID
Example usage: (PREFIX)specs --set`,

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

    async function getSpecs(uid) {
      let uInfo = await getUserInfo.get(uid);

      if (!uInfo)
        return snd.send("User not found, or no entry found for the user!");

      if (!uInfo.specs)
        return snd.send(
          `This user does not have their specifications set up.\n Try using \`${prefix}specs --set\` to set them up.`
        );

      return snd.send(uInfo.specs.replace(/\@/g, "").slice(0, 1500));
    }

    async function setSpecs() {
      let uInfo = await getUserInfo.get(msg.author.id);

      if (!uInfo)
        return snd.send("It looks like you do not have the proper Database.");

      let setSpecsM = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      setSpecsM.on("collect", async m => {
        if (!m.content) {
          snd.send("You did not write anything.. canceling.");
          return setSpecsM.stop();
        }

        uInfo.specs = await m.content;

        await setUserInfo.run(uInfo);

        snd.send("Specs have been set.");
        return setSpecsM.stop();
      });
    }

    if (!arguments) {
      return getSpecs(msg.author.id);
    }

    if (arguments.toLowerCase().includes("--set")) {
      setSpecs();
      return snd.send("In the next message set your specifications.");
    }

    const Identify = await arguments
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    return getSpecs(Identify);
  }
};
