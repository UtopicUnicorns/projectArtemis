////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "warn",
  description: "Warns the target user.",
  permission: "1",
  explain: `Warns the target user.
Without the time flag the warn lasts forever.
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: (PREFIX)warn userID --reason=Reason here --time=30 day
Example usage: (PREFIX)warn @mention --reason=Reason here --time=30 hour`,

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
    getReason = arguments.toLowerCase().split("--reason=");
    let getReasonA;
    if (getReason[1]) getReasonA = getReason[1].replace(/\-\-time\=.*/gm, "");
    if (!getReasonA) getReasonA = "None given!";

    getTime = arguments.toLowerCase().split("--time=");
    let getTimeA;
    if (getTime[1]) getTimeA = getTime[1].replace(/\-\-reason\=.*/gm, "");
    if (!getTimeA) getTimeA = "0";

    let getTarget = arguments.toLowerCase().split("--");

    if (!getTarget[0])
      return snd.send("Could not find an user in your message.");

    getTarget[0].split(" ").forEach(async T => {
      try {
        let getTargetA = T.replace("<", "")
          .replace("@", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!getTargetA) return;

        info = {
          type: "warn",
          guild: msg.guild_id,
          channel: msg.channel_id,
          judge: `${mmbr.user.username}#${mmbr.user.discriminator}`,
          judge_id: mmbr.user.id,
          target: `${getTargetA}`,
          reason: `${getReasonA}`,
          time: `${getTimeA}`
        };

        await adminEvent.warnEvent(msg, client, CONFIG, npm, mmbr, info, snd);
      } catch (error) {
        console.log("");
      }
    });

    return await snd.send(`${mmbr}, I am on it, twat.`);
  }
};
