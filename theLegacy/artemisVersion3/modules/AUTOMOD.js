////////////////////////////////////
//Auto Mod module
//That stuff happens here
////////////////////////////////////
module.exports = {
  eventTrigger: async function (client, CONFIG, npm, mmbr, msg, snd, gld) {
    ////////////////////////////////////
    //Fetch message for deletion
    //Only gets triggered when needed
    ////////////////////////////////////
    if (!await client.channels.cache.get(msg.channel_id).messages) return;
    
    const msgGet = await client.channels.cache
      .get(msg.channel_id)
      .messages.fetch(msg.id);

    if (!msgGet) return;

    ////////////////////////////////////
    //Exception Channel
    //If not in DB proceed
    ////////////////////////////////////
    const filterException = await getFE.get(msg.channel_id);

    if (!filterException) {
      ////////////////////////////////////
      //Word Filter
      //We check if there are disabled words here
      ////////////////////////////////////
      const wordSel = await db
        .prepare("SELECT badwords FROM badword WHERE gldid = ?;")
        .all(gld.id);

      function similar(a, b) {
        var equivalency = 0;
        var minLength = a.length > b.length ? b.length : a.length;
        var maxLength = a.length < b.length ? b.length : a.length;
        for (var i = 0; i < minLength; i++) {
          if (a[i] == b[i]) {
            equivalency++;
          }
        }

        var weight = equivalency / maxLength;
        return Math.floor(weight * 100);
      }

      if (wordSel) {
        if (wordSel[0]) {
          let MSG = msgGet.content.toLowerCase().split(" ");
          let SHOOT = 0;
          await MSG.forEach((W) => {
            for (let i of wordSel) {
              let badWordSel = i.badwords.toLowerCase();
              let bword = W.replace(/[^a-zA-Z0-9]/g, "");
              if (bword.includes(badWordSel)) {
                wordCheck = similar(`${bword}`, `${badWordSel}`);

                if (wordCheck > 75) {
                  SHOOT++;
                  let a = MSG.indexOf(W);
                  MSG[a] = "<censored>";
                }
              }
            }
          });

          if (SHOOT >= 1) {
            await msgGet.delete();
            return await snd.send(
              `${mmbr}, hold up!\nI detected a bad word in your message so I took the liberty of filtering it.\n\n>>> ${MSG.join(
                " "
              ).replace(/\@/g, "")}`
            );
          }
        }
      }

      ////////////////////////////////////
      //Phrase Filter
      //We check if there are disabled phrases here
      ////////////////////////////////////
      let phraseSel = await db
        .prepare("SELECT badphrases FROM badphrase WHERE gldid = ?;")
        .all(gld.id);

      if (phraseSel) {
        if (phraseSel[0]) {
          for (let i of phraseSel) {
            let y = msg.content.toLowerCase().includes(`${i.badphrases}`);

            if (y) {
              await msgGet.delete();
              return await snd.send(
                `${mmbr}, hold up!\nI detected a bad phrase in your message so I deleted it.`
              );
            }
          }
        }
      }
    }

    ////////////////////////////////////
    //Discord invite filter
    //We check if there are discord invites here
    ////////////////////////////////////
    let uublock = getUU.get(msg.channel_id);

    if (!uublock) {
      if (
        msg.content.toLowerCase().includes("discord.gg/") ||
        msg.content.toLowerCase().includes("discordapp.com/invite/") ||
        msg.content.toLowerCase().includes("discord.com/invite/")
      ) {
        try {
          await msgGet.delete();
          return await snd.send(
            `${mmbr}, hold up there, you posted a Discord Invite link, which is not allowed here.`
          );
        } catch (err) {
          return console.log("");
        }
      }
    }
  },
};
