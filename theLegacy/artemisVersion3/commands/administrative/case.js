////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "case",
  description: "View, edit, invalidate and lookup cases.",
  permission: "1",
  explain: `View, edit, invalidate and lookup cases.
Cases are created for mutes, warns, kicks and bans.

Example usage: (PREFIX)case --view=3
Example usage: (PREFIX)case --user=@mention
Example usage: (PREFIX)case --edit=3
Example usage: (PREFIX)case --invalidate=3`,

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
    async function editCase(info) {
      let editingCase = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );

      getACaseIN = await db.prepare(
        "SELECT * FROM admincases WHERE guildidcaseid = ?"
      );

      let editSelIN = await getACaseIN.get(`${info}`);

      editingCase.on("collect", async (m) => {
        editSelIN.reason = `${m.content}`;
        await setACase.run(editSelIN);
        await editingCase.stop();
        await snd.send(`New reason has been set.`);
      });
    }

    switch (arguments.toLowerCase().replace(/ /g, "").split("=")[0]) {
      case "--view":
        getView = arguments.toLowerCase().split("--view=");
        if (!getView[1]) return snd.send("No view target specified!");
        getViewA = getView[1]
          .replace("<", "")
          .replace("@", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!getViewA) return snd.send("No view target specified!");

        let viewNum = getViewA;

        let viewSel = await db
          .prepare("SELECT * FROM admincases WHERE guildidcaseid = ?")
          .all(`${msg.guild_id}-${viewNum}`);

        //if no db
        if (!viewSel[0]) return snd.send("Case Number Not Found!");

        const caseViewer = new Discord.MessageEmbed()
          .setTitle(`Case: ${viewSel[0].caseid}`)
          .setColor("PURPLE");
        if (viewSel[0].username) caseViewer.setAuthor(`${viewSel[0].username}`);
        if (viewSel[0].type)
          caseViewer.addField("Type: ", `${viewSel[0].type}`);
        if (viewSel[0].date)
          caseViewer.addField("Date: ", `${viewSel[0].date}`);
        if (viewSel[0].username)
          caseViewer.addField("Username: ", `${viewSel[0].username}`);
        if (viewSel[0].reason)
          caseViewer.addField(
            "Reason: ",
            `${viewSel[0].reason.slice(0, 1000)}`
          );
        if (viewSel[0].userid)
          caseViewer.setFooter(`UserID: ${viewSel[0].userid}`);
        if (viewSel[0].judge)
          caseViewer.addField("Action performed by: ", `${viewSel[0].judge}`);

        //Send embed
        return snd.send({
          embed: caseViewer,
        });
        break;

      case "--invalidate":
        getInvalidate = arguments.toLowerCase().split("--invalidate=");
        if (!getInvalidate[1])
          return snd.send("No invalidation target specified!");
        getInvalidateA = getInvalidate[1]
          .replace("<", "")
          .replace("@", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!getInvalidateA)
          return snd.send("No invalidation target specified!");

        let invalNum = getInvalidateA;

        getACase4 = await db.prepare(
          "SELECT * FROM admincases WHERE guildidcaseid = ?"
        );

        let invalSel = await getACase4.get(`${msg.guild_id}-${invalNum}`);

        //if no db
        if (!invalSel) return snd.send("Case Number Not Found!");
        if (invalSel.type.startsWith(`\uD83D\uDEAB`))
          return snd.send("Case is already invalid!");
        invalSel.type = `\uD83D\uDEAB${invalSel.type}`;
        await setACase.run(invalSel);
        snd.send(`Case \`${invalNum}\` has been invalidated!`);
        break;

      case "--edit":
        getEdit = arguments.toLowerCase().split("--edit=");
        if (!getEdit[1]) return snd.send("No edit target specified!");
        getEditA = getEdit[1]
          .replace("<", "")
          .replace("@", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!getEditA) return snd.send("No edit target specified!");

        let editNum = getEditA;

        getACase3 = await db.prepare(
          "SELECT * FROM admincases WHERE guildidcaseid = ?"
        );

        let editSel = await getACase3.get(`${msg.guild_id}-${editNum}`);

        //if no db
        if (!editSel) return snd.send("Case Number Not Found!");

        await editCase(`${msg.guild_id}-${editNum}`);
        snd.send(
          `You are editing case: ${editNum}.\n\nCurrent reason is:\n\`${editSel.reason}\`\n\nYour next message will change the reason.`
        );
        break;

      case "--user":
        getTarget = arguments.toLowerCase().split("--user=");
        if (!getTarget[1]) return snd.send("No user target specified!");
        getTargetA = getTarget[1]
          .replace("<", "")
          .replace("@", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

        if (!getTargetA) return snd.send("No user target specified!");

        let targetNum = getTargetA;

        let targetSel = await db
          .prepare(
            `SELECT * FROM admincases WHERE guildid = ${msg.guild_id} AND userid = ?`
          )
          .all(`${targetNum}`);

        targetCases = [];

        await targetSel.forEach((t) => {
          targetCases.push(
            `\n\`${t.type} - case: ${t.caseid} - date: ${t.date}\``
          );
        });

        if (!targetCases[0]) return snd.send("No cases found for this user!");

        snd.send(targetCases.join("\n"), {
          split: true,
        });
        break;
    }

    return;
  },
};
