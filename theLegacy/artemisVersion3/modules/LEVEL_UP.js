////////////////////////////////////
//Level up module
//That stuff happens here
////////////////////////////////////
module.exports = {
  eventTrigger: async function (client, CONFIG, npm, mmbr, msg, snd, gld) {
    const redoMember = await gld.members.cache.get(msg.author.id);

    const score = await getScore.get(redoMember.user.id, msg.guild_id);
    if (!score) return;

    const getLevels = await db
      .prepare(`SELECT * FROM levelup WHERE guildid = ? ORDER BY "level" ASC`)
      .all(`${gld.id}`);
    if (!getLevels[0]) return;

    for (let i of getLevels) {
      if (!score) return;
      if (score.level >= i.level) {
        let checking = await redoMember.roles.cache.has(i.role);
        if (!checking) {
          let check2 = await gld.roles.cache.find((r) => r.id == `${i.role}`);
          if (check2) {
            try {
              await redoMember.roles.add(check2);

              let embed = new Discord.MessageEmbed()
                .setThumbnail(
                  "https://upload.wikimedia.org/wikipedia/commons/5/50/Green-animated-arrow.gif"
                )
                .setColor("GREEN")
                .addField(
                  "Member:",
                  `${mmbr.user.username}#${mmbr.user.discriminator}`
                )
                .addField(
                  `Congratulations on reaching level: \`${i.level}\``,
                  `You earned the role: ${check2}`
                );

              snd.send({ embed });
            } catch (err) {
              console.log("");
            }
          }
        }
      }
    }
  },
};
