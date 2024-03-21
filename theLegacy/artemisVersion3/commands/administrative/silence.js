////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "silence",
  description: "Prevent a user from sending a specific word.",
  permission: "1",
  explain: `Prevent a user from sending a specific word.

Example usage: (PREFIX)silence @mention
Example usage: (PREFIX)silence userID`,

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

    if (!arguments) return snd.send(`${mmbr}, You have to mention a user.`);

    let getTarget = arguments
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    const targetSilence = await gld.members.cache.get(getTarget);

    if (!targetSilence)
      return snd.send(`${mmbr}, the user you specified is not in this server.`);

    async function shhhhh() {
      let shhhhht = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      let status = [];

      shhhhht.on("collect", async m => {
        if (!m.content) {
          snd.send(
            `${mmbr}, You have not given me any input, canceling this action.`
          );
          return shhhhht.stop();
        }

        if (status[0]) {
          if (status[0] == "add") {
            theThings = {
              gldusridwrd: `${gld.id}${targetSilence.user.id}${m.content}`,
              usrid: `${targetSilence.user.id}`,
              gid: `${gld.id}`,
              bword: `${m.content.toLowerCase()}`
            };

            setPWB.run(theThings);

            shhhhht.stop();

            return snd.send(
              `${mmbr}, You have added a word to ${targetSilence}'s banned word list.`
            );
          }

          if (status[0] == "rem") {
            await db
              .prepare(
                `DELETE FROM pwordban WHERE gid = '${gld.id}' AND usrid = '${
                  targetSilence.user.id
                }' AND bword = '${m.content.toLowerCase()}'`
              )
              .run();

            shhhhht.stop();

            return snd.send(
              `${mmbr}, You have removed a word from ${targetSilence}'s banned word list.`
            );
          }
        }

        if (m.content.toLowerCase().includes("add")) {
          status.push("add");
          return snd.send(
            `${mmbr}, Please write the word you want to be on ${targetSilence}'s banned word list in your next message.`
          );
        }

        if (m.content.toLowerCase().includes("rem")) {
          status.push("rem");
          return snd.send(
            `${mmbr}, please write the word you want to remove from ${targetSilence}'s banned word list in your next message.`
          );
        }

        shhhhht.stop();
        return snd.send(
          `${mmbr}, You have not given me any useful input, canceling this action.`
        );
      });
    }

    await snd.send(
      `${mmbr}, do you want to \`add\` or \`remove\` a banned word for this specific user?`
    );
    shhhhh();
  }
};
