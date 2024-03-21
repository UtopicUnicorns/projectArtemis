////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "lookup",
  description: "Lookup user info.",
  permission: "1",
  explain: `Lookup user info.
This command shows you pas nicknames, usernames, wanrings, latest cases and such.

Example usage: (PREFIX)lookup --user=@mention
Example usage: (PREFIX)lookup --user=userID`,

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
    async function userInfo(ID) {
      const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
      if (!gld) return;

      const mmbr2 = await gld.members.cache.get(ID); //Get author
      if (!mmbr2) return snd.send("Member not found!");

      let embed = new Discord.MessageEmbed()
        .setAuthor(
          mmbr2.user.username + "#" + mmbr2.user.discriminator,
          mmbr2.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setThumbnail(
          mmbr2.user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setDescription(`${mmbr2}`)
        .setColor(`RANDOM`)
        .setFooter(`User ID: ${mmbr2.user.id}`);

      score = await getScore.get(mmbr2.user.id, msg.guild_id); //Fetch score
      if (score) {
        embed.addField("Current warning amount:", `${score.warning}`);
        embed.addField("Current permit level:", `${score.permit}`);
        embed.addField("Bonuses received:", `${score.bonus}`);
        embed.addField("Current userpoints:", `${score.points}`);

        let bonusSetting = await getSettings.get(msg.guild_id);
        let bonusPoint = await parseInt(bonusSetting.bonuspoints);
        if (bonusSetting) {
          let math = (await score.bonus) * bonusPoint;
          let math2 = (await score.points) - math;
          embed.addField("Current userpoints without bonuses:", `${math2}`);
        }
      } else {
        score = {
          id: `${mmbr2.user.id}-${msg.guild_id}`,
          user: `${mmbr2.user.id}`,
          guild: `${msg.guild_id}`,
          points: 1,
          level: 1,
          warning: 0,
          muted: 0,
          permit: 0,
          bonus: 0,
        };
        await setScore.run(score);

        embed.addField("Current warning amount:", `${score.warning}`);
        embed.addField("Current permit level:", `${score.permit}`);
        embed.addField("Bonuses received:", `${score.bonus}`);
        embed.addField("Current userpoints:", `${score.points}`);

        let bonusSetting = await getSettings.get(msg.guild_id);
        let bonusPoint = await parseInt(bonusSetting.bonuspoints);
        if (bonusSetting) {
          let math = (await score.bonus) * bonusPoint;
          let math2 = (await score.points) - math;
          embed.addField("Current userpoints without bonuses:", `${math2}`);
        }
      }

      let targetSel = await db
        .prepare(
          `SELECT * FROM admincases WHERE guildid = ${msg.guild_id} AND userid = ?`
        )
        .all(`${mmbr2.user.id}`);

      if (targetSel) {
        targetCases = [];

        await targetSel.forEach((t) => {
          targetCases.push(`\n\`${t.type} - case: ${t.caseid}\``);
        });

        if (targetCases[0]) {
          embed.addField(
            "Recent Cases:",
            `${targetCases.slice(targetCases.length - 3).join("")}`
          );
        }
      }

      userinfo = await getUserInfo.get(mmbr2.user.id);

      if (userinfo) {
        knick = await userinfo.nickname.split("##");
        kname = await userinfo.username.split("##");

        if (kname)
          embed.addField(
            `Know Usernames:`,
            `\u200b${await kname.slice(kname.length - 4).join("\n")}`
          );
        if (knick)
          embed.addField(
            `Know Nicknames:`,
            `\u200b${knick.slice(knick.length - 4).join("\n")}`
          );
        embed.addField(
          `Total warnings across servers:`,
          `\u200b${userinfo.totalwarnings}`
        );
      } else {
        userinfo = {
          id: mmbr2.user.id,
          username: `${mmbr2.user.username}##`,
          nickname: `${mmbr2.nickname}##`,
          specs: "",
          totalwarnings: 0,
          totalmutes: 0,
        };
        await setUserInfo.run(userinfo);

        knick = userinfo.nickname.split("##");
        kname = userinfo.username.split("##");

        embed.addField(`Know Usernames:`, `\u200b${kname.join("\n")}`);
        embed.addField(`Know Nicknames:`, `\u200b${knick.join("\n")}`);
        embed.addField(
          `Total warnings across servers:`,
          `${userinfo.totalwarnings}`
        );
      }

      //send embed
      return snd.send(embed);
    }

    let args = arguments.toLowerCase().split("--user=");

    if (!args[1]) return userInfo(msg.author.id);

    let argsProc = args[1]
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    return userInfo(argsProc);
  },
};
