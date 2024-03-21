////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "role",
  description:
    "This command allows you to add or remove a self asignable role.",
  permission: "2",
  explain: `This command allows you to add or remove a self asignable role.
You can specify a role within the process with either a roleID or a role mention.
Emojis askes can be custom emojis or regular emojis.

Example usage: (PREFIX)role --action=add
Example usage: (PREFIX)role --action=delete
Example usage: (PREFIX)role --action=edit`,

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

    async function actAdd() {
      let actionAdd = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      let addCount = 0;

      let roleAddGuild = msg.guild_id;
      let roleAddRole;
      let roleAddDescription;
      let roleAddEmoji;

      actionAdd.on("collect", async m => {
        addCount++;

        if (m.content.toLowerCase() == "stop") {
          actionAdd.stop();
          return await snd.send("Add Action canceled!");
        }

        switch (addCount) {
          case 1:
            let idGet = m.content
              .replace("<", "")
              .replace("@", "")
              .replace("&", "")
              .replace("!", "")
              .replace(">", "")
              .replace(/ /g, "");

            let nameTest = await gld.roles.cache.find(
              r => r.name === m.content
            );

            if (nameTest) {
              roleAddRole = nameTest.id;

              return await snd.send(
                "Give your role a small description."
              );
            } else {
              let idTest = await gld.roles.cache.find(r => r.id === idGet);
              if (!idTest) {
                addCount--;
                return snd.send(
                  "Role was not found, I tried to check both the role name and ID.\nTry again or type `stop`"
                );
              } else {
                roleAddRole = idTest.id;

                return await snd.send(
                  "Give your role a small description."
                );
              }
            }

            break;

          case 2:
            roleAddDescription = m.content;

            return await snd.send("Now react with the emoji that you want to tie to your role.\nIf users use this emoji in your reaction Role channel, they will either get the role or remove it depending on if they have the role or not.");
            break;

          case 3:
            let emojiSplit = await m.content.split(":");
            if (emojiSplit[1]) {
              let roleAddEmoji = await emojiSplit[2]
                .replace("<", "")
                .replace("@", "")
                .replace("&", "")
                .replace("!", "")
                .replace(">", "")
                .replace(/ /g, "");

              roleAdd = {
                guild: roleAddGuild,
                roles: roleAddRole,
                emoji: roleAddEmoji,
                description: roleAddDescription
              };

              await setRoles.run(roleAdd);

              await snd.send(
                `Added to the self-asignable list - \nRole: ${roleAddRole}\nEmoji: ${roleAddEmoji}`
              );
            } else {
              let roleAddEmoji = m.content
                .replace("<", "")
                .replace("@", "")
                .replace("&", "")
                .replace("!", "")
                .replace(">", "")
                .replace(/ /g, "");

              roleAdd = {
                guild: roleAddGuild,
                roles: roleAddRole,
                emoji: roleAddEmoji,
                description: roleAddDescription
              };

              await setRoles.run(roleAdd);

              await snd.send(
                `Added to the self-asignable list - \nRole: ${roleAddRole}\nEmoji: ${roleAddEmoji}\nDescription: ${roleAddDescription}`
              );
            }
            actionAdd.stop();
            break;
        }
      });
    }

    async function actDel() {
      let actionDel = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      let roleDelRole1;

      actionDel.on("collect", async m => {
        let idGet1 = m.content
          .replace("<", "")
          .replace("@", "")
          .replace("&", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

        let nameTest1 = await gld.roles.cache.find(r => r.name === m.content);

        if (nameTest1) {
          roleDelRole1 = nameTest1.id;

          await db
            .prepare(
              `DELETE FROM roles WHERE guild = '${msg.guild_id}' AND roles = '${roleDelRole1}'`
            )
            .run();
          await snd.send("Role removed from self-asignable list!");
          return actionDel.stop();
        } else {
          let idTest1 = await gld.roles.cache.find(r => r.id === idGet1);
          if (!idTest1) {
            return snd.send(
              "Role was not found, I tried to check both the role name and ID.\nTry again or type `stop`"
            );
          } else {
            roleDelRole1 = idTest1.id;
            await db
              .prepare(
                `DELETE FROM roles WHERE guild = '${msg.guild_id}' AND roles = '${roleDelRole1}'`
              )
              .run();
            await snd.send("Role removed from self-asignable list!");
            return actionDel.stop();
          }
        }
      });
    }

    let getRoles2 = await db.prepare(
      "SELECT * FROM roles WHERE guild = ? AND roles = ?"
    );

    async function actEdit() {
      let actionEdit = snd.createMessageCollector(
        m => m.author.id === msg.author.id
      );

      let addCounter = 0;

      let editRole;
      let editdesc;
      let editEmoji;

      actionEdit.on("collect", async m => {
        addCounter++;

        switch (addCounter) {
          case 1:
            let idGet4 = m.content
              .replace("<", "")
              .replace("@", "")
              .replace("&", "")
              .replace("!", "")
              .replace(">", "")
              .replace(/ /g, "");

            let checkRoles2 = getRoles2.get(gld.id, idGet4);

            if (!checkRoles2) {
              actionEdit.stop();
              return snd.send(
                "The role you provided was not found, action has been canceled!"
              );
            }
            editRole = idGet4;

            snd.send(
              `The current description of this role is:\n${checkRoles2.description}\n\nPlease write a new description in your next message!`
            );
            break;

          case 2:
            let checkRoles4 = getRoles2.get(gld.id, editRole);

            checkRoles4.description = m.content.slice(0, 50);

            setRoles.run(checkRoles4);

            actionEdit.stop();

            return snd.send("Role has been updated!");

            break;
        }
      });
    }

    if (!arguments) {
      return snd.send(`This command allows you to add or remove a self asignable role.
You can specify a role within the process with either a roleID or a role mention.
Emojis askes can be custom emojis or regular emojis.

Example usage: ${prefix}role --action=add
Example usage: ${prefix}role --action=delete
Example usage: ${prefix}role --action=edit`);
    }

    switch (arguments.toLowerCase()) {
      case "--action=add":
        actAdd();
        await snd.send(
          "What role do you want to add as a self-asignable/reaction role?\n*This does not create the role for you, you will have to do that yourself!*\n\n`You can say the role name, role mention or role ID in the next message!`"
        );
        break;

      case "--action=delete":
        actDel();
        await snd.send(
          "What role do you want to remove from the self-asignable list? *This does not remove the role for you, you will have to do that yourself!*\n\n`You can say the role name, role mention or role ID in the next message!`"
        );
        break;

      case "--action=edit":
        actEdit();
        await snd.send(
          "What role do you want edit?\n\n`You can say the role name, role mention or role ID in the next message!`"
        );
        break;

      default:
        break;
    }
  }
};
