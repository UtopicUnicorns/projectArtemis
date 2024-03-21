////////////////////////////////////
//The ready event is only triggered once
//So here we start all our important tasks
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //Loading commands
    //Also reading in database if it exists
    ////////////////////////////////////
    client.commands = new Discord.Collection();

    var walkSync = function (dir, filelist) {
      files = fs.readdirSync(dir);
      filelist = filelist || [];
      files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          filelist = walkSync(path.join(dir, file), filelist);
        } else {
          filelist.push(`${dir}/${file}`);
        }
      });
      return filelist;
    };

    walkSync("commands").forEach((file) => {
      const command = require(`../${file}`);
      let usagecheck = getUsage.get(command.name);
      if (!usagecheck) {
        usagecheck = {
          command: command.name,
          number: `0`,
        };
        setUsage.run(usagecheck);
      }
      client.commands.set(command.name, command);
    });

    ////////////////////////////////////
    //Checking the database for every guild
    //We ignore them or make a new database if needed
    ////////////////////////////////////
    await client.guilds.cache.forEach(async (guild) => {
      let thisGuild = await getGuild.get(guild.id);
      if (!thisGuild) {
        thisGuild = {
          guild: guild.id,
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
        setGuild.run(thisGuild);
      }

      let thisGuildS = await getSettings.get(guild.id);
      if (!thisGuildS) {
        thisGuildS = {
          guildid: guild.id,
          artemisTalks: "OFF",
          streamHere: "OFF",
          autoMod: "OFF",
          prefix: "a!",
          leveling: "ON",
          wmessage: "Welcome!",
          wimage: "NONE",
          defaultrole: "",
          bonuspoints: 30,
        };
        setSettings.run(thisGuildS);
      }

      let thisGuildL = await getLogs.get(guild.id);
      if (!thisGuildL) {
        thisGuildL = {
          guildid: guild.id,
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
        setLogs.run(thisGuildL);
      }
    });

    ////////////////////////////////////
    //We create an embed with some useful info
    //And send it to our main server.
    ////////////////////////////////////
    let botAva = await client.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    let embed = new Discord.MessageEmbed()
      .setColor("LUMINOUS_VIVID_PINK")
      .setThumbnail(botAva)
      .setAuthor(`${client.user.username} Client`, botAva)
      .setDescription("Bot Started")
      .addField(
        "Ram: ",
        (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB"
      )
      .addField("Total servers", client.guilds.cache.size)
      .addField("Total users: ", client.users.cache.size)
      .setTimestamp();

    try {
      await client.channels.cache
        .get(await CONFIG.CONFIG("MAIN_LOG"))
        .send({ embed });
    } catch (err) {
      console.log(
        term_clock,
        colour.red,
        "There is no main log channel set-up!\n",
        colour.magenta,
        "     Edit: /modules/CONFIG.js",
        colour.reset
      );
    }

    ////////////////////////////////////
    //We show in our console that we are ready
    //This only happens once.
    ////////////////////////////////////
    console.log(
      term_clock,
      colour.green,
      "Bot started\n",
      colour.magenta,
      `    ${client.guilds.cache.size} servers\n`,
      colour.magenta,
      `    ${client.users.cache.size} users\n`
    );

    ////////////////////////////////////
    //Start website
    //This only happens once.
    ////////////////////////////////////
    siteInit = require("../modules/SITE");

    await siteInit.site(c, client, CONFIG, npm);

    ////////////////////////////////////
    //This will be repeated every X seconds
    //It's an interval after all
    ////////////////////////////////////
    setInterval(async () => {
      ////////////////////////////////////
      //We are looping guild size, member size
      //and ram usage trough the bots presence.
      ////////////////////////////////////
      client.user.setPresence({
        status: "dnd",
        activity: {
          name: `\uD83C\uDF10${client.guilds.cache.size.toLocaleString()} Servers
      \uD83D\uDC64${client.users.cache.size.toLocaleString()} Users
      \uD83D\uDCBB${Math.floor(
        process.memoryUsage().heapUsed / 1024 / 1024
      )} MB ram`,
          type: "PLAYING",
        },
      });

      ////////////////////////////////////
      //We create an interval to check our
      //databases regulary.
      ////////////////////////////////////
      let data2 = db.prepare("SELECT * FROM admintimers;").all();
      let adminTimeNow = moment().format("x");
      await data2.forEach(async (timerData) => {
        if (adminTimeNow > timerData.time) {
          switch (timerData.type) {
            case "warn":
              let warningPointThing = await getScore.get(
                timerData.userid,
                timerData.guildid
              ); //decrease warning point
              if (warningPointThing) {
                warningPointThing.warning--;
                await setScore.run(warningPointThing);
              }
              await db
                .prepare(
                  `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();
              break;

            case "remind":
              let rTime = await getRemindTimer.get(
                `${timerData.GuildUserTime}`
              );

              try {
                snd2 = await client.channels.cache.get(rTime.channel);
                let embed = new Discord.MessageEmbed()
                  .setColor("DARK_NAVY")
                  .addField("Reminder:", `${rTime.reason}`);

                await snd2.send(`<@${timerData.userid}>`, embed);
              } catch (err) {
                await db
                  .prepare(
                    `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                  )
                  .run();

                await db
                  .prepare(
                    `DELETE FROM remindtimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                  )
                  .run();
              }

              await db
                .prepare(
                  `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();

              await db
                .prepare(
                  `DELETE FROM remindtimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();

              break;

            case "bump":
              let rTime2 = await getRemindTimer.get(
                `${timerData.GuildUserTime}`
              );

              try {
                snd2 = await client.channels.cache.get(rTime2.channel);
                let embed = new Discord.MessageEmbed()
                  .setColor("DARK_NAVY")
                  .addField("Bump reminder:", `${rTime2.reason}`);

                await snd2.send(`<@${timerData.userid}>`, embed);
              } catch (err) {
                await db
                  .prepare(
                    `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                  )
                  .run();

                await db
                  .prepare(
                    `DELETE FROM remindtimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                  )
                  .run();
              }

              await db
                .prepare(
                  `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();

              await db
                .prepare(
                  `DELETE FROM remindtimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();

              break;

            case "ban":
              const bangld = await client.guilds.cache.get(timerData.guildid);
              if (bangld) {
                try {
                  await bangld.members.unban(timerData.userid);
                } catch (err) {
                  console.log("");
                }
              }
              await db
                .prepare(
                  `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();
              break;

            case "mute":
              let mutingPointThing = await getScore.get(
                timerData.userid,
                timerData.guildid
              ); //decrease warning point
              if (mutingPointThing) {
                mutingPointThing.muted = 0;
                await setScore.run(mutingPointThing);
              }

              const muteld = await client.guilds.cache.get(timerData.guildid);
              if (muteld) {
                const targetMute = await muteld.members.cache.get(
                  timerData.userid
                );
                if (targetMute) {
                  try {
                    await targetMute.roles.add(
                      await muteld.roles.cache.find(
                        (r) =>
                          r.id ===
                          getSettings.get(timerData.guildid).defaultrole
                      )
                    );
                  } catch (err) {
                    console.log("");
                  }

                  if (await getGuild.get(timerData.guildid).muteChannel) {
                    try {
                      let muteChan = await muteld.channels.cache.find(
                        (channel) =>
                          channel.id ===
                          getGuild.get(timerData.guildid).muteChannel
                      );
                      if (
                        await muteChan.permissionOverwrites.get(
                          timerData.userid
                        )
                      ) {
                        await muteChan.permissionOverwrites
                          .get(timerData.userid)
                          .delete();
                      }
                    } catch (err) {
                      console.log("");
                    }
                  }
                }
              }
              await db
                .prepare(
                  `DELETE FROM admintimers WHERE GuildUserTime = '${timerData.GuildUserTime}'`
                )
                .run();
              break;
          }
        }
      });

      let data = db.prepare("SELECT * FROM streamers;").all();
      await data.forEach((streamerData) => {
        const SCOPE = "user:read:email";

        Twitch.getToken(
          CONFIG.CONFIG("TWITCH_ID"),
          CONFIG.CONFIG("TWITCH_SECRET"),
          SCOPE
        ).then(async (result) => {
          try {
            let access_token = result.access_token;

            let user = await Twitch.getUserInfo(
              access_token,
              await CONFIG.CONFIG("TWITCH_ID"),
              streamerData.streamer
            );

            if (!user) return;
            if (!user.data) return;
            if (!user.data[0]) return;

            let user_id = user.data[0].id;

            let stream_info = await Twitch.getStream(
              access_token,
              await CONFIG.CONFIG("TWITCH_ID"),
              user_id
            );

            if (!stream_info.data) return;

            if (!stream_info.data[0]) {
              var dat = [streamerData.streamer, streamerData.guild, "OFFLINE"];
            } else {
              var dat = [
                streamerData.streamer,
                streamerData.guild,
                stream_info.data[0].user_name,
                stream_info.data[0].game_id,
                stream_info.data[0].title,
                stream_info.data[0].viewer_count,
                stream_info.data[0].thumbnail_url,
                user.data[0].profile_image_url,
              ];
            }

            twitchEmitter.emit("event", dat);
          } catch (err) {
            console.log("");
          }
        });
      });

      //Next
    }, 30000);

    setInterval(async () => {
      try {
        const dataReddit = await parser(
          "https://www.reddit.com/r/linuxmint/new.rss"
        );
        if (dataReddit[0]) {
          let redditGet = getRL.get(`628978428019736619${dataReddit[0].link}`);

          if (!redditGet) {
            let embed = new Discord.MessageEmbed()
              .setThumbnail("https://i.imgur.com/ws2kAA0.png")
              .setColor("RED")
              .setFooter(`Feed from Reddit`, "https://i.imgur.com/ws2kAA0.png");

            if (dataReddit[0].title) {
              embed.setTitle(dataReddit[0].title);
            }

            if (dataReddit[0].author) {
              embed.setAuthor(
                dataReddit[0].author,
                "https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png"
              );
            }

            if (dataReddit[0].image.url) {
              embed.setImage(dataReddit[0].image.url);
            }

            if (dataReddit[0].link) {
              embed.addField(
                "Link:",
                `[View on Reddit!](${dataReddit[0].link})`
              );
            }

            await client.channels.cache.get("656194923107713024").send(embed);

            makeRedditLink = {
              gldurl: `628978428019736619${dataReddit[0].link}`,
              gldid: `628978428019736619`,
              link: `${dataReddit[0].link}`,
            };

            await setRL.run(makeRedditLink);
          }
        }
      } catch (error) {
        console.log("");
      }
    }, 10000);

    setInterval(async () => {
      const sChannels = await db
        .prepare("SELECT * FROM supportinusechannels")
        .all();

      for (let i of sChannels) {
        const chanCheck = await client.channels.cache.get(i.chanid);

        if (chanCheck) {
          chanCheck.messages.fetch({ limit: 1 }).then(async (m) => {
            const supportTime = await moment(
              m.array()[0].createdTimestamp,
              "x"
            ).fromNow();

            if (supportTime.includes("day") || supportTime.includes("month")) {
              let modify = await getSCase.get(i.caseid);
              modify.solution = "Ticket Timed Out!";
              modify.solvedby = "ReOpen#Me";
              await setSCase.run(modify);

              await db
                .prepare(
                  `DELETE FROM supportinusechannels WHERE chanid = '${i.chanid}'`
                )
                .run();
              await chanCheck.delete();
            }
          });
        }
      }
    }, 60000);
  },
};
