////////////////////////////////////
//Bump module
//That stuff happens here
////////////////////////////////////
module.exports = {
  eventTrigger: async function (client, CONFIG, npm, mmbr, msg, snd, gld) {
    async function bumping(bumpWord, bumpTime) {
      let bumpSure = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );

      setTimeout(() => {
        bumpSure.stop();
      }, 30000);

      bumpSure.on("collect", async (m) => {
        if (m.content.toLowerCase() == "no") {
          return bumpSure.stop();
        }

        bumpTrigger(`${bumpWord}`, `${bumpTime}`);
        return bumpSure.stop();
      });
    }

    async function bumpTrigger(bumpWord, bumpTime) {
      let timerFinal = await adminEvent.timer(`${bumpTime}`);

      if (timerFinal.ms !== "PERMANENT") {
        timersForAdmins = {
          GuildUserTime: `${gld.id}-${mmbr.user.id}-${timerFinal.ms}`,
          guildid: `${gld.id}`,
          userid: `${mmbr.user.id}`,
          type: `bump`,
          time: `${timerFinal.ms}`,
        };
        await setAdminTimer.run(timersForAdmins);
      } else {
        return snd.send("Something went horribly wrong!");
      }

      reminderSet = {
        GuildUserTime: `${gld.id}-${mmbr.user.id}-${timerFinal.ms}`,
        reason: `Do \`${bumpWord}\``,
        channel: `${snd.id}`,
      };
      await setRemindTimer.run(reminderSet);

      await snd.send(
        `Bump reminder has been set.\nI will remind you \`${timerFinal.nice}\``
      );

      let bumpPoints = await getBumpRecord.get(mmbr.user.id, gld.id);

      if (!bumpPoints) {
        bumpPoints = {
          GuildUser: `${gld.id}-${mmbr.user.id}`,
          user: `${mmbr.user.id}`,
          guild: `${gld.id}`,
          bump: 0,
          dbump: 0,
          dlmbump: 0,
          like: 0,
          dotbump: 0,
        };
        await setBumpRecord.run(bumpPoints);
      }

      if (bumpWord == "!bump") bumpPoints.bump++;
      if (bumpWord == "!like") bumpPoints.like++;
      if (bumpWord == "dlm!bump") bumpPoints.dlmbump++;
      if (bumpWord == "!d bump") bumpPoints.dbump++;
      if (bumpWord == ".bump") bumpPoints.dotbump++;

      await setBumpRecord.run(bumpPoints);
    }

    switch (msg.content.toLowerCase()) {
      case "!bump":
        await snd.send(
          "I think you just bumped, want me to set a reminder?\nType `no` to not do that, type anything else to set the reminder!"
        );
        return bumping("!bump", "20 minute");
        break;
      case "!d bump":
        await snd.send(
          "I think you just bumped, want me to set a reminder?\nType `no` to not do that, type anything else to set the reminder!"
        );
        return bumping("!d bump", "2 hour");
        break;
      case "dlm!bump":
        await snd.send(
          "I think you just bumped, want me to set a reminder?\nType `no` to not do that, type anything else to set the reminder!"
        );
        return bumping("dlm!bump", "8 hour");
        break;
      case "!like":
        await snd.send(
          "I think you just bumped, want me to set a reminder?\nType `no` to not do that, type anything else to set the reminder!"
        );
        return bumping("!like", "4 hour");
        break;

      case ".bump":
        await snd.send(
          "I think you just bumped, want me to set a reminder?\nType `no` to not do that, type anything else to set the reminder!"
        );
        return bumping(".bump", "1 hour");
        break;
    }
  },
};
