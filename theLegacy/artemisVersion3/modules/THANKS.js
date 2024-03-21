////////////////////////////////////
//Thanks Module
//That stuff happens here
////////////////////////////////////
module.exports = {
  eventTrigger: async function (
    client,
    CONFIG,
    npm,
    mmbr,
    msg,
    snd,
    gld,
    mntns
  ) {
    let bonusSetting = await getSettings.get(msg.guild_id);
    let bonusPoint = await parseInt(bonusSetting.bonuspoints);
    let thankedUsers = [];
    let thankCount = 0;
    await mntns.forEach(async (trouble) => {
      thankCount++;
      if (
        trouble.id !== msg.author.id &&
        (await getScore.get(trouble.id, msg.guild_id))
      ) {
        let thankget = await getScore.get(trouble.id, msg.guild_id);
        thankget.bonus++;
        thankget.points = thankget.points + bonusPoint;
        await setScore.run(thankget);
        await thankedUsers.push(trouble.username);
      }
    });

    setTimeout(async () => {
      if (thankedUsers.length > 0) {
        snd.send(
          `${mmbr} gifted ${thankedUsers.join(", ")} ${await CONFIG.CONFIG(
            "CURRENCY"
          )}${bonusPoint}!`
        );
      }
    }, 500 * mntns.length);
  },
};
