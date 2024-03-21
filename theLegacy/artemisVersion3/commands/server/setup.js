////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "setup",
  description: "This command allows you to setup important server settings.",
  permission: "3",
  explain: `This command allows you to setup important server settings.
This command allows step by step configuration.

Example usage: (PREFIX)setup --setup=channels
Example usage: (PREFIX)setup --setup=settings
Example usage: (PREFIX)setup --setup=logs
Example usage: (PREFIX)setup --setup=levels
Example usage: (PREFIX)setup --setup=support

Example usage: (PREFIX)setup --view=channels
Example usage: (PREFIX)setup --view=logs
Example usage: (PREFIX)setup --view=levels
Example usage: (PREFIX)setup --view=settings`,

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

    let thisGuild = await getGuild.get(msg.guild_id);
    if (!thisGuild) {
      thisGuild = {
        guild: msg.guild_id,
        generalChannel: "",
        highlightChannel: "",
        muteChannel: "",
        logsChannel: "",
        streamChannel: "",
        reactionChannel: "",
        verificationChannel: "",
        supportChannel: "",
        supportInUseChannel: "",
      };

      await setGuild.run(thisGuild);
    }

    let thisGuildL = await getLogs.get(msg.guild_id);
    if (!thisGuildL) {
      thisGuildL = {
        guildid: msg.guild_id,
        msgupdate: "OFF",
        msgdelete: "OFF",
        chancreate: "OFF",
        chandelete: "OFF",
        chanupdate: "OFF",
        reactadd: "OFF",
        reactdelete: "OFF",
        invcreate: "OFF",
        invdelete: "OFF",
        grolecreate: "OFF",
        groledelete: "OFF",
        groleupdate: "OFF",
        gmemadd: "OFF",
        gmemupdate: "OFF",
        gmemdelete: "OFF",
        gbanadd: "OFF",
        gbanremove: "OFF",
        voiceupdate: "OFF",
      };

      await setLogs.run(thisGuildL);
    }

    let thisGuildS = await getSettings.get(msg.guild_id);
    if (!thisGuildS) {
      thisGuildS = {
        guildid: msg.guild_id,
        streamHere: "OFF",
        autoMod: "OFF",
        prefix: "a!",
        leveling: "ON",
        wmessage: "Welcome!",
        wimage: "NONE",
        defaultrole: "",
        bonuspoints: 30,
        artemisTalks: "OFF",
      };

      await setSettings.run(thisGuildS);
    }

    async function logsSet() {
      let LS = snd.createMessageCollector((m) => m.author.id === msg.author.id);
      let lScount = 0;

      LS.on("collect", async (m) => {
        lScount++;
        message = m.content.toLowerCase();

        if (message == "stop") return LS.stop();

        switch (lScount) {
          case 1:
            if (message == "on") {
              thisGuildL.msgupdate = "ON";
            } else {
              thisGuildL.msgupdate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Message Updates are ${thisGuildL.msgupdate}!\nShould Message Deletions logs be ON or OFF?`
            );
            break;
          case 2:
            if (message == "on") {
              thisGuildL.msgdelete = "ON";
            } else {
              thisGuildL.msgdelete = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Message Deletions are ${thisGuildL.msgdelete}!\nShould Channel Creation logs be ON or OFF?`
            );
            break;
          case 3:
            if (message == "on") {
              thisGuildL.chancreate = "ON";
            } else {
              thisGuildL.chancreate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Channel Creations are ${thisGuildL.chancreate}!\nShould Channel Deletion logs be ON or OFF?`
            );
            break;
          case 4:
            if (message == "on") {
              thisGuildL.chandelete = "ON";
            } else {
              thisGuildL.chandelete = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Channel Deletions are ${thisGuildL.chandelete}!\nShould Channel Update logs be ON or OFF?`
            );
            break;
          case 5:
            if (message == "on") {
              thisGuildL.chanupdate = "ON";
            } else {
              thisGuildL.chanupdate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Channel Updates are ${thisGuildL.chanupdate}!\nShould Reaction Add logs be ON or OFF?`
            );
            break;
          case 6:
            if (message == "on") {
              thisGuildL.reactadd = "ON";
            } else {
              thisGuildL.reactadd = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Reaction Adds are ${thisGuildL.reactadd}!\nShould Reaction Remove logs be ON or OFF?`
            );
            break;
          case 7:
            if (message == "on") {
              thisGuildL.reactdelete = "ON";
            } else {
              thisGuildL.reactdelete = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Reaction Deletion are ${thisGuildL.reactdelete}!\nShould Invite Creations logs be ON or OFF?`
            );
            break;
          case 8:
            if (message == "on") {
              thisGuildL.invcreate = "ON";
            } else {
              thisGuildL.invcreate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Invite Creations are ${thisGuildL.invcreate}!\nShould Invite Deletion logs be ON or OFF?`
            );
            break;
          case 9:
            if (message == "on") {
              thisGuildL.invdelete = "ON";
            } else {
              thisGuildL.invdelete = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Invite Deletions are ${thisGuildL.invdelete}!\nShould Role Creation logs be ON or OFF?`
            );
            break;
          case 10:
            if (message == "on") {
              thisGuildL.grolecreate = "ON";
            } else {
              thisGuildL.grolecreate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Role Creations are ${thisGuildL.grolecreate}!\nShould Role Update logs be ON or OFF?`
            );
            break;
          case 11:
            if (message == "on") {
              thisGuildL.groleupdate = "ON";
            } else {
              thisGuildL.groleupdate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Role Updates are ${thisGuildL.groleupdate}!\nShould Role Deletion logs be ON or OFF?`
            );
            break;
          case 12:
            if (message == "on") {
              thisGuildL.groledelete = "ON";
            } else {
              thisGuildL.groledelete = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Role Deletions are ${thisGuildL.groledelete}!\nShould Member Join logs be ON or OFF?`
            );
            break;
          case 13:
            if (message == "on") {
              thisGuildL.gmemadd = "ON";
            } else {
              thisGuildL.gmemadd = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Member Joins are ${thisGuildL.gmemadd}!\nShould Member Leave logs be ON or OFF?`
            );
            break;
          case 14:
            if (message == "on") {
              thisGuildL.gmemdelete = "ON";
            } else {
              thisGuildL.gmemdelete = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Member Leaves are ${thisGuildL.gmemdelete}!\nShould Member Update logs be ON or OFF?`
            );
            break;
          case 15:
            if (message == "on") {
              thisGuildL.gmemupdate = "ON";
            } else {
              thisGuildL.gmemupdate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Member Updates are ${thisGuildL.gmemupdate}!\nShould Member Bans logs be ON or OFF?`
            );
            break;
          case 16:
            if (message == "on") {
              thisGuildL.gbanadd = "ON";
            } else {
              thisGuildL.gbanadd = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Member Bans are ${thisGuildL.gbanadd}!\nShould Member Ban Removal logs be ON or OFF?`
            );
            break;
          case 17:
            if (message == "on") {
              thisGuildL.gbanremove = "ON";
            } else {
              thisGuildL.gbanremove = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Member Ban Removals are ${thisGuildL.gbanremove}!\nShould Voice Activity logs be ON or OFF?`
            );
            break;
          case 18:
            if (message == "on") {
              thisGuildL.voiceupdate = "ON";
            } else {
              thisGuildL.voiceupdate = "OFF";
            }
            await setLogs.run(thisGuildL);
            snd.send(
              `Logs for Voice Updates are ${thisGuildL.voiceupdate}!
We are all done!

Message Update logs: ${thisGuildL.msgupdate}
Message Delete logs: ${thisGuildL.msgdelete}
Channel Create logs: ${thisGuildL.chancreate}
Channel Delete logs: ${thisGuildL.chandelete}
Channel Update logs: ${thisGuildL.chanupdate}
Reaction Add logs: ${thisGuildL.reactadd}
Reaction Remove logs: ${thisGuildL.reactdelete}
Invite Create logs: ${thisGuildL.invcreate}
Invite Delete logs: ${thisGuildL.invdelete}
Role Create logs: ${thisGuildL.grolecreate}
Role Delete logs: ${thisGuildL.groledelete}
Role Update logs: ${thisGuildL.groleupdate}
Member Join log: ${thisGuildL.gmemadd}
Member Update log: ${thisGuildL.gmemupdate}
Member Leave log: ${thisGuildL.gmemdelete}
Member Ban log: ${thisGuildL.gbanadd}
Member Ban Lifted log: ${thisGuildL.gbanremove}
VoiceUpdates log: ${thisGuildL.voiceupdate}
`
            );
            break;
        }
      });
    }

    async function levSet() {
      let LS = snd.createMessageCollector((m) => m.author.id === msg.author.id);
      let LSCount = 0;
      let LSTag = "EMPTY";

      let LVL;
      let LVLROLE;
      let LVLGUILD = gld.id;

      LS.on("collect", async (m) => {
        LSCount++;
        message = m.content.toLowerCase();

        if (LSCount == 1 && message == "remove") {
          LSTag = "remove";
          return snd.send("Which level-up level do you want to remove?");
        }

        if (LSCount == 2 && LSTag == "remove") {
          LSTag = "remove";
          LVL = await parseInt(message);

          await db
            .prepare(
              `DELETE FROM levelup WHERE GuildAndLevel = '${msg.guild_id}-${LVL}'`
            )
            .run();

          snd.send(`Alright removed \`${LVL}\`!`);
          return LS.stop();
        }

        if (LSCount == 1 && message == "create") {
          LSTag = "create";
          return snd.send(
            "Which level(Number) do you want to give users a role to?"
          );
        }

        if (LSCount == 2 && LSTag == "create") {
          LSTag = "create";
          LVL = await parseInt(message);

          return snd.send(
            `Alright level \`${LVL}\` it is.\nWhat role do you want these users to get when they reach this level?`
          );
        }

        if (LSCount == 3 && LSTag == "create") {
          LSTag = "create";
          LVLROLE = message;

          roleGet1 = message
            .replace("<", "")
            .replace("@", "")
            .replace("&", "")
            .replace(">", "");
          let G1 = await client.guilds.cache.get(msg.guild_id);
          let roleCheck1 = await G1.roles.cache.find((r) => r.id === roleGet1);

          if (!roleCheck1) {
            LSCount--;
            return snd.send("Invalid role, Try again!");
          } else {
            LVLROLE = roleCheck1.id;

            roleInsert = {
              GuildAndLevel: `${gld.id}-${LVL}`,
              guildid: gld.id,
              level: LVL,
              role: roleCheck1.id,
            };

            await setLevelUp.run(roleInsert);

            snd.send(
              `Level-up created!\n\nlevel: \`${LVL}\`\nRole reward: \`${roleCheck1.name}\``
            );
            return LS.stop();
          }
        }

        snd.send("Action canceled!");
        LS.stop();
      });
    }

    async function settingsSet() {
      let S = snd.createMessageCollector((m) => m.author.id === msg.author.id);
      let sCount = 0;
      S.on("collect", async (m) => {
        sCount++;
        message = m.content.toLowerCase();

        if (message == "stop") return S.stop();

        switch (sCount) {
          case 1: //Stream ghere
            if (message !== "skip") {
              if (message == "on") {
                thisGuildS.streamHere = "ON";
              } else {
                thisGuildS.streamHere = "OFF";
              }
              await setSettings.run(thisGuildS);
              snd.send(
                `Stream (at)here pings are ${thisGuildS.streamHere}!\nMust Automod be ON or OFF?`
              );
            } else {
              snd.send("Skipped!\nMust Automod be ON or OFF?");
            }
            break;
          case 2: //Automod
            if (message !== "skip") {
              if (message == "on") {
                thisGuildS.autoMod = "ON";
              } else {
                thisGuildS.autoMod = "OFF";
              }
              await setSettings.run(thisGuildS);
              snd.send(
                `Automod is ${thisGuildS.autoMod}!\nWhat should the bots prefix be in this server?`
              );
            } else {
              snd.send(
                "Skipped!\nWhat should the bots prefix be in this server?"
              );
            }
            break;
          case 3: //prefix
            if (message !== "skip") {
              thisGuildS.prefix = `${m.content}`;

              await setSettings.run(thisGuildS);
              snd.send(
                `Bots prefix is \`${thisGuildS.prefix}\`\nShould leveling and point gathering be ON or OFF?`
              );
            } else {
              snd.send(
                "Skipped!\nShould leveling and point gathering be ON or OFF?"
              );
            }
            break;
          case 4: //leveling
            if (message !== "skip") {
              if (message == "on") {
                thisGuildS.leveling = "ON";
              } else {
                thisGuildS.leveling = "OFF";
              }
              await setSettings.run(thisGuildS);
              snd.send(
                `Leveling and point gathering is turned ${thisGuildS.leveling}!\nSet a welcome message for new users`
              );
            } else {
              snd.send("Skipped!\nSet a welcome message for new users");
            }
            break;
          case 5: // Welcome message
            if (message !== "skip") {
              thisGuildS.wmessage = `${m.content}`;

              await setSettings.run(thisGuildS);
              snd.send(
                `Welcome message has been set!\nWhat is the default role for users on this server?`
              );
            } else {
              snd.send(
                "Skipped!\nWhat is the default role for users on this server?"
              );
            }
            break;
          case 6: //Default role
            if (message !== "skip") {
              roleGet = m.content
                .replace("<", "")
                .replace("@", "")
                .replace("&", "")
                .replace(">", "");
              let G = await client.guilds.cache.get(msg.guild_id);
              let roleCheck = G.roles.cache.find((r) => r.id === roleGet);

              if (!roleCheck) {
                sCount--;
                snd.send("Invalid role, Try again!");
              } else {
                thisGuildS.defaultrole = roleCheck.id;

                await setSettings.run(thisGuildS);
                snd.send(
                  `Bots default role is ${thisGuildS.defaultrole}!\nShould the bot responses to their name with witty comments be \`ON\` or \`OFF\`?`
                );
              }
            } else {
              snd.send(
                "Skipped!\nShould the bot responses to their name with witty comments be `ON` or `OFF`?"
              );
            }
            break;
          case 7: //art talk
            if (message !== "skip") {
              if (message == "on") {
                thisGuildS.artemisTalks = "ON";
              } else {
                thisGuildS.artemisTalks = "OFF";
              }
              await setSettings.run(thisGuildS);
              snd.send(
                `Bot responses are ${thisGuildS.artemisTalks}!\nWhat image should the welcome embed have? please provide an URL.`
              );
            } else {
              snd.send(
                "Skipped!\nWhat image should the welcome embed have? please provide an URL."
              );
            }
            break;
          case 8: //Welcome image
            if (message !== "skip") {
              thisGuildS.wimage = `${m.content}`;

              await setSettings.run(thisGuildS);
              snd.send(
                `Bots welcome image is ${thisGuildS.wimage}!\nHow many points should welcoming new users, thanking users and congratulating users award?`
              );
            } else {
              snd.send(
                "Skipped!\nHow many points should welcoming new users, thanking users and congratulating users award?"
              );
            }
            break;

          case 9: //Bonus points
            if (message !== "skip") {
              thisGuildS.bonuspoints = parseInt(m.content);

              await setSettings.run(thisGuildS);
              snd.send(
                `Bonus point value is ${thisGuildS.bonuspoints}!
We are done now!

Stream (at)here pings are: ${thisGuildS.streamHere}
Automod is: ${thisGuildS.autoMod}
Guild prefix: ${thisGuildS.prefix}
Point and level gathering is: ${thisGuildS.leveling}
Guilds default role: ${thisGuildS.defaultrole}
Bonus points for thanking and welcoming: ${thisGuildS.bonuspoints}
Bots welcome image: ${thisGuildS.wimage}
Bot responses are: ${thisGuildS.artemisTalks}
`
              );
              S.stop();
            } else {
              snd.send(
                `Skipped!
We are done now!

Stream (at)here pings are: ${thisGuildS.streamHere}
Automod is: ${thisGuildS.autoMod}
Guild prefix: ${thisGuildS.prefix}
Point and level gathering is: ${thisGuildS.leveling}
Guilds default role: ${thisGuildS.defaultrole}
Bonus points for thanking and welcoming: ${thisGuildS.bonuspoints}
Bots welcome image: ${thisGuildS.wimage}
Bot responses are: ${thisGuildS.artemisTalks}`
              );
              S.stop();
            }
            break;
        }
      });
    }

    async function channelSet() {
      let CG = snd.createMessageCollector((m) => m.author.id === msg.author.id);
      let cgCount = 0;

      CG.on("collect", async (m) => {
        cgCount++;
        message = m.content.replace("<", "").replace("#", "").replace(">", "");

        if (m.content.toLowerCase() == "stop") return S.stop();

        switch (cgCount) {
          case 1: //Welcoming Channel
            if (message !== "skip") {
              thisGuild.generalChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your welcoming channel!\nNext up tell me your logs channel.`
                );
              }
              setGuild.run(thisGuild);
            } else {
              snd.send("Skipped!\nNext up tell me your logs channel.");
            }
            break;
          case 2: //Logs Channel
            if (message !== "skip") {
              thisGuild.logsChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your logs channel!\nNext up tell me your mute channel.`
                );
              }
              setGuild.run(thisGuild);
            } else {
              snd.send("Skipped!\nNext up tell me your mute channel.");
            }
            break;
          case 3: //Mute Channel
            if (message !== "skip") {
              thisGuild.muteChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your mute channel!\nNext up tell me your reaction role channel.`
                );
              }
              setGuild.run(thisGuild);
            } else {
              snd.send("Skipped!\nNext up tell me your reaction role channel.");
            }
            break;
          case 4: //Reaction Role Channel
            if (message !== "skip") {
              thisGuild.reactionChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your reaction role channel!\nNext up tell me your twitch streaming channel.`
                );
              }
              setGuild.run(thisGuild);
            } else {
              snd.send(
                "Skipped!\nNext up tell me your twitch streaming channel."
              );
            }
            break;
          case 5: //Streaming Channel
            if (message !== "skip") {
              thisGuild.streamChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your Twitch streaming channel!\nNext up tell me your highlights/starboard channel.`
                );
              }
              setGuild.run(thisGuild);
            } else {
              snd.send(
                "Skipped!\nNext up tell me your highlights/starboard channel."
              );
            }
            break;
          case 6: //Highlights
            if (message !== "skip") {
              thisGuild.highlightChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your highlights/starboard channel!\n Next up tell me your verification channel.`
                );
              }
              setGuild.run(thisGuild);
            } else {
              snd.send("Skipped!\nNext up tell me your verification channel.");
            }
            break;
          case 7: //verification
            if (message !== "skip") {
              thisGuild.verificationChannel = message;
              if (message !== "remove")
                testC = await client.channels.cache.get(message);
              if (message == "remove") testC = "OFF";

              if (!testC) {
                cgCount--;
                snd.send(`${message} is not a channel, try again!`);
              } else {
                snd.send(
                  `${testC} has been set as your verification channel!
We are done here.

Welcome channel: <#${thisGuild.generalChannel}>
Logs channel: <#${thisGuild.logsChannel}>
Mute channel: <#${thisGuild.muteChannel}>
Reaction role channel: <#${thisGuild.reactionChannel}>
Twitch stream channel: <#${thisGuild.streamChannel}>
Highlight/starboard channel: <#${thisGuild.highlightChannel}>
Verification channel: <#${thisGuild.verificationChannel}>
`
                );
              }
              setGuild.run(thisGuild);
              CG.stop();
            } else {
              snd.send(
                `Skipped!
We are done here.

Welcome channel: <#${thisGuild.generalChannel}>
Logs channel: <#${thisGuild.logsChannel}>
Mute channel: <#${thisGuild.muteChannel}>
Reaction role channel: <#${thisGuild.reactionChannel}>
Twitch stream channel: <#${thisGuild.streamChannel}>
Highlight/starboard channel: <#${thisGuild.highlightChannel}>
Verification channel: <#${thisGuild.verificationChannel}>`
              );
              CG.stop();
            }
            break;
        }
      });
    }

    async function supSet() {
      let supSetting = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );
      let supSettingCount = 0;

      supSetting.on("collect", async (m) => {
        supSettingCount++;
        message = m.content.replace("<", "").replace("#", "").replace(">", "");

        if (m.content.toLowerCase() == "stop") return supSetting.stop();

        if (supSettingCount == 1) {
          let supChanTest = await client.channels.cache.get(message);

          if (!supChanTest) {
            supSettingCount--;
            return snd.send(
              "The channel you provided is not actually a channel, please try again or write `stop` to cancel this session."
            );
          } else {
            channelMake = {
              chanid: message,
              inuse: "FALSE",
            };

            await setSupportChannels.run(channelMake);
            return snd.send(
              `<#${message}> has been selected as your host channel.\n\nWhen users create a session trough the support system do you want when the session starts that a certain role gets pinged/tagged; E.G: A support role. \`YES\` or \`NO\``
            );
          }
        }

        if (supSettingCount == 2) {
          if (m.content.toLowerCase() !== "yes") {
            snd.send("Alright, we are done here.");
            return await supSetting.stop();
          } else {
            return snd.send(
              "Please mention the role you want to be pinged when a session is created OR provide a role ID if you are not doing this in a private channel."
            );
          }
        }

        if (supSettingCount == 3) {
          roleGet = m.content
            .replace("<", "")
            .replace("@", "")
            .replace("&", "")
            .replace(">", "");
          let gild = await client.guilds.cache.get(msg.guild_id);
          let supportRole = gild.roles.cache.find((r) => r.id === roleGet);

          if (!supportRole) {
            supSettingCount--;
            return snd.send(
              "The ID/Mention you provided was not a role!\nPlease try again or write `stop` to cancel this, your support host channel has been saved regardless."
            );
          } else {
            let getSupportGuild = await getGuild.get(gild.id);
            if (!getSupportGuild) {
              snd.send("CRITICAL ERROR! please report this as a bug!");
              return await supSetting.stop();
            } else {
              getSupportGuild.supportInUseChannel = supportRole.id;

              await setGuild.run(getSupportGuild);

              snd.send(
                `${supportRole.name} has been selected as the role that gets pinged when a session starts!\nWe are done now, bye.`
              );
              return await supSetting.stop();
            }
          }
        }
      });
    }

    if (!arguments) {
      return snd.send(`This command allows you to setup important server settings.
This command allows step by step configuration.

Example usage: ${prefix}setup --setup=channels
Example usage: ${prefix}setup --setup=settings
Example usage: ${prefix}setup --setup=logs
Example usage: ${prefix}setup --setup=levels
Example usage: ${prefix}setup --setup=support

Example usage: ${prefix}setup --view=channels
Example usage: ${prefix}setup --view=logs
Example usage: ${prefix}setup --view=levels
Example usage: ${prefix}setup --view=settings`);
    }

    if (arguments.toLowerCase().includes("--setup=")) {
      argSplit = arguments.toLowerCase().split("--setup=");

      switch (argSplit[1].toLowerCase()) {
        case "channels":
          channelSet();
          snd.send(
            "To skip this question/option simply type `skip`, then we move on to the next question.\nYou can also type `remove` to turn off the features for this option.\n\nTell me what channel will be used as a welcoming channel.\nEither tell me the ID of the channel or mention the channel."
          );
          break;

        case "settings":
          settingsSet();
          snd.send(
            "To skip this question/option simply type `skip`, then we move on to the next question.\n\nMust stream (at)here pings be ON or OFF?"
          );
          break;

        case "logs":
          logsSet();
          snd.send(
            "To skip this question/option simply type `skip`, then we move on to the next question.\n\nShould Message Updates logs be ON or OFF?"
          );
          break;

        case "levels":
          levSet();
          snd.send(
            "Do you want to `create` a new level-up level, or `remove` an existing level-up?"
          );
          break;

        case "support":
          supSet();
          snd.send(
            "Please mention a channel that you want to be a host for support session starts, do note that the newly created sessions will be in fact new channels and will be placed in the same category as your host channel."
          );
          break;
      }
    }

    if (arguments.toLowerCase().includes("--view=")) {
      argSplit = arguments.split("--view=");

      switch (argSplit[1].toLowerCase()) {
        case "channels":
          snd.send(`
 Welcome channel: 
    <#${thisGuild.generalChannel}>

 Logs channel: 
    <#${thisGuild.logsChannel}>

 Mute channel: 
    <#${thisGuild.muteChannel}>

 Reaction role channel: 
    <#${thisGuild.reactionChannel}>

 Twitch stream channel: 
    <#${thisGuild.streamChannel}>

 Highlight/starboard channel: 
    <#${thisGuild.highlightChannel}>

 Verification channel: 
    <#${thisGuild.verificationChannel}>
`);
          break;

        case "settings":
          snd.send(`
\`\`\`diff
+ Stream (at)here pings are: 
    ${thisGuildS.streamHere}

- Automod is: 
    ${thisGuildS.autoMod}

+ Guild prefix: 
    ${thisGuildS.prefix}

- Point and level gathering is: 
    ${thisGuildS.leveling}

+ Guilds default role: 
    ${thisGuildS.defaultrole}

- Bonus points for thanking and welcoming: 
    ${thisGuildS.bonuspoints}

+ Bots welcome image: 
    ${thisGuildS.wimage}

- Bot responses are: 
    ${thisGuildS.artemisTalks}
\`\`\``);
          break;

        case "logs":
          snd.send(`
\`\`\`diff
+ Message Update logs: 
    ${thisGuildL.msgupdate}

- Message Delete logs: 
    ${thisGuildL.msgdelete}

+ Channel Create logs: 
    ${thisGuildL.chancreate}

- Channel Delete logs: 
    ${thisGuildL.chandelete}

+ Channel Update logs: 
    ${thisGuildL.chanupdate}

- Reaction Add logs: 
    ${thisGuildL.reactadd}

+ Reaction Remove logs: 
    ${thisGuildL.reactdelete}

- Invite Create logs: 
    ${thisGuildL.invcreate}

+ Invite Delete logs: 
    ${thisGuildL.invdelete}

- Role Create logs: 
    ${thisGuildL.grolecreate}

+ Role Delete logs: 
    ${thisGuildL.groledelete}

- Role Update logs: 
    ${thisGuildL.groleupdate}

+ Member Join log: 
    ${thisGuildL.gmemadd}

- Member Update log: 
    ${thisGuildL.gmemupdate}

+ Member Leave log: 
    ${thisGuildL.gmemdelete}

- Member Ban log: 
    ${thisGuildL.gbanadd}

+ Member Ban Lifted log: 
    ${thisGuildL.gbanremove}

- VoiceUpdates log: 
    ${thisGuildL.voiceupdate}
\`\`\``);
          break;

        case "levels":
          let getLevels = await db
            .prepare(
              `SELECT * FROM levelup WHERE guildid = ? ORDER BY "level" ASC`
            )
            .all(`${gld.id}`);

          if (!getLevels[0])
            return snd.send("There are no level roles set up yet.");

          let levelArray = [];

          await getLevels.forEach((L) => {
            let roleCheck5 = gld.roles.cache.find((r) => r.id === L.role);
            if (roleCheck5) {
              levelArray.push(
                `\`Level: ${L.level}\nRole Reward: ${roleCheck5.name}\`\n\n`
              );
            } else {
              levelArray.push(
                `\`Level: ${L.level}\nRole Reward: ${L.role}\nAttached role seems to be missing!\`\n\n`
              );
            }
          });

          await snd.send(levelArray.join("\n"), {
            split: true,
          });
          break;
      }
    }
  },
};
