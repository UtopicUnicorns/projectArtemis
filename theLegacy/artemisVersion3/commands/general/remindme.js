////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "remindme",
  description: "This command allows you to set a reminder.",
  permission: "0",
  explain: `This command allows you to set a reminder.
This command needs the time parameter!
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: (PREFIX)remindme This is an example reminder --time=1 hour
Example usage: (PREFIX)remindme Another example reminder --time=2 day
Example usage: (PREFIX)remindme --delete`,

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
    let buildArray = [];

    async function confirmActionFN() {
      finalArr = [];

      count = 0;

      for (let i of buildArray) {
        count++;
        finalArr.push(
          `Entry num: **${count}**\nReminder:\n\`${i.reminder}\`\nWhen:\n\`${i.nicetime}\`\n`
        );
      }

      if (!finalArr[0]) return snd.send("**There are no reminders for you.**");
      await snd.send("**Pick the entry number you want to delete**");
      await snd.send(finalArr.join("\n"), {
        split: true,
      });

      let confirmAction = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );

      confirmAction.on("collect", async (m) => {
        if (await isNaN(m.content)) {
          snd.send(
            "The message you send was not a number.\nAction has been canceled!"
          );
          confirmAction.stop();
        } else {
          let num2 = parseInt(m.content);
          if (buildArray[num2 - 1]) {
            await db
              .prepare(
                `DELETE FROM remindtimers WHERE GuildUserTime = '${
                  buildArray[num2 - 1].key
                }'`
              )
              .run();
            await snd.send("Entry has been deleted!");
            confirmAction.stop();
          } else {
            snd.send(
              "The message you send was not an entry.\nAction has been canceled!"
            );
            confirmAction.stop();
          }
        }
      });
    }

    if (arguments.toLowerCase().includes("--delete")) {
      timeGet = await db
        .prepare("SELECT * FROM remindtimers WHERE GuildUserTime LIKE ?")
        .all(`%${mmbr.id}%`);

      for (let i of timeGet) {
        pushArray = {
          key: i.GuildUserTime,
          reminder: i.reason,
          channel: i.channel,
          memname: `${mmbr.user.username}#${mmbr.user.discriminator}`,
          nicetime: moment(`${i.GuildUserTime.split("-")[2]}`, "x").fromNow(),
        };
        buildArray.push(pushArray);
      }

      confirmActionFN();

      return;
    }

    getTime = arguments.toLowerCase().split("--time=");
    let getTimeA;
    if (getTime[1]) {
      getTimeA = getTime[1];
    } else {
      getTimeA = "1 hour";
    }

    if (!getTime[0]) {
      return snd.send(
        "Please provide a message for yourself to remind you why you needed the reminder."
      );
    }

    info = {
      type: "remind",
      guild: msg.guild_id,
      channel: msg.channel_id,
      judge: `${mmbr.user.username}#${mmbr.user.discriminator}`,
      judge_id: mmbr.user.id,
      target: mmbr.user.id,
      reason: `${getTime[0]}`,
      time: `${getTimeA}`,
    };

    await adminEvent.remindEvent(msg, client, CONFIG, npm, mmbr, info, snd);
  },
};
