////////////////////////////////////
//This event is triggered whenever Artemis receives a NEW message
//A lot gets set in motion.
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //For safety reasons any and all bots after this line
    //may not go on, bots therefor cannot execute commands and such.
    ////////////////////////////////////
    if (c.d.author.bot == true) return;

    ////////////////////////////////////
    //We define some quicker ways to call info
    //Basically you never need to do this, but it's easier.
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", c.d.guild_id);

    const snd = await client.channels.cache.get(c.d.channel_id);
    if (!snd) return;

    const gld = await client.guilds.cache.get(c.d.guild_id);
    if (!gld) return;

    const msg = c.d;

    const mmbr = await gld.members.cache.get(msg.author.id);
    if (!mmbr) return;

    const mntns = c.d.mentions;

    ////////////////////////////////////
    //Some functions now that we know
    //the user is real
    ////////////////////////////////////
    USERINFO = require("../modules/USERINFO");
    USERINFO.eventTrigger(c, client, CONFIG, npm, mmbr);

    POINTS = require("../modules/POINTS");
    POINTS.eventTrigger(c, client, CONFIG, npm, mmbr);

    if (
      msg.content.toLowerCase().includes(client.user.id) &&
      msg.content.toLowerCase().includes("prefix")
    ) {
      const prefixGrab = await CONFIG.PREFIX("PREFIX", gld.id);
      await snd.send(
        `Hello ${mmbr}, the prefix for this server is \`${prefixGrab}\``
      );
    }

    let geo = getGG.get(msg.author.id);

    if (geo) {
      let currentTime = moment().format("dddd");
      if (currentTime !== geo.lastday) {
        try {
          request(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${
              geo.lan
            }&lon=${geo.lon}&units=metric&appid=${CONFIG.CONFIG("weather")}`,
            {
              json: true,
            },
            (err, res, body) => {
              //if something went wrong
              if (err) return;
              if (body) {
                mmbr.send(
                  `
**Hello <@${msg.author.id}>!**
*This is your daily weather update*

Time: \`${moment.unix(body.current.dt).format("dddd, MMMM Do YYYY, HH:mm:ss")}\`
Temperature: \`${body.current.temp}°c\`
Feels like: \`${body.current.feels_like}°c\`
Average temperature today: \`${body.daily[0].temp.day}°c\`
Humidity: \`${body.current.humidity}%\`
Weather: ${body.current.weather[0].main} (${
                    body.current.weather[0].description
                  })

**Forecast:**
${moment.unix(body.daily[1].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[1].temp.day
                  }°c\` (${body.daily[1].weather[0].main})
  ${moment.unix(body.daily[2].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[2].temp.day
                  }°c\` (${body.daily[2].weather[0].main})
${moment.unix(body.daily[3].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[3].temp.day
                  }°c\` (${body.daily[3].weather[0].main})
  ${moment.unix(body.daily[4].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[4].temp.day
                  }°c\` (${body.daily[4].weather[0].main})
${moment.unix(body.daily[5].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[5].temp.day
                  }°c\` (${body.daily[5].weather[0].main})
  ${moment.unix(body.daily[6].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[6].temp.day
                  }°c\` (${body.daily[6].weather[0].main})
${moment.unix(body.daily[7].dt).format("dddd, MMMM Do")}: \`${
                    body.daily[7].temp.day
                  }°c\` (${body.daily[7].weather[0].main})

*To set up your own alert use the command \`${prefix}weather\`*
                  `
                );
              }
            }
          );

          geo.lastday = currentTime;

          setGG.run(geo);
        } catch (err) {
          console.log("");
        }
      }
    }

    ////////////////////////////////////
    //Ignore list
    //We return where it needs
    ////////////////////////////////////
    const ignoreCheck = db
      .prepare("SELECT * FROM wordignore WHERE chan = ?;")
      .all(snd.id);

    if (ignoreCheck) {
      if (ignoreCheck[0]) {
        for (let i of ignoreCheck) {
          if (msg.content.toLowerCase().startsWith(i.word.toLowerCase()))
            return;
        }
      }
    }

    ////////////////////////////////////
    //AutoMod Trigger
    //We check if it's enabled
    ////////////////////////////////////
    if (
      mmbr.permissions.has("KICK_MEMBERS") ||
      mmbr.permissions.has("BAN_MEMBERS")
    ) {
    } else {
      let autoModCheck = await getSettings.get(msg.guild_id);

      if (msg.content) {
        if (autoModCheck) {
          if (autoModCheck.autoMod) {
            if (autoModCheck.autoMod == "ON") {
              AUTO = require("../modules/AUTOMOD");
              AUTO.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);
            }
          }
        }
      }
    }

    ////////////////////////////////////
    //Embed message links
    //We check if the message contains a message link and then process it
    ////////////////////////////////////
    LINK = require("../modules/LINK");
    LINK.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);

    ////////////////////////////////////
    //User ban word list
    //We return where it needs
    ////////////////////////////////////
    const pwordBan = db
      .prepare("SELECT * FROM pwordban WHERE gid = ? AND usrid = ?;")
      .all(gld.id, mmbr.user.id);

    if (pwordBan) {
      if (pwordBan[0]) {
        for (let i of pwordBan) {
          if (msg.content.toLowerCase().includes(`${i.bword}`)) {
            const msgGet = await client.channels.cache
              .get(msg.channel_id)
              .messages.fetch(msg.id);

            if (!msgGet) return;

            await msgGet.delete();

            return await snd.send(
              `${mmbr}, hold up!\nI detected a bad word in your message so I deleted it.\n\nThis word or phrase is only banned for you!`
            );
          }
        }
      }
    }

    ////////////////////////////////////
    //Fake AI
    //Or maybe real I don't know, fuck you
    ////////////////////////////////////
    if (msg.content.toLowerCase().startsWith("artemis")) {
      let artSet = await getSettings.get(msg.guild_id);
      if (artSet) {
        if (artSet.artemisTalks == "ON") {
          var contextMsg = msg.content.slice(8);

          if (!contextMsg) contextMsg = "Who is your master?";

          try {
            //
            request(
              `https://api.affiliateplus.xyz/api/chatbot?message=${contextMsg}&botname=Artemis&ownername=initrd&user=${mmbr.user.id}`,
              {
                json: true,
              },
              (err, res, body) => {
                //if something went wrong
                if (err) return snd.send("An error occured!");
                if (body) snd.send(body.message);
              }
            );
          } catch (err) {
            console.log("");
          }
        }
      }
    }

    ////////////////////////////////////
    //Bump triggers
    //Will have to be expanded upon
    ////////////////////////////////////
    let bumpArray = ["!bump", "!d bump", "dlm!bump", "!like", ".bump"];

    await bumpArray.forEach((b) => {
      if (msg.content.toLowerCase() == b) {
        BUMP = require("../modules/BUMP");
        BUMP.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);
      }
    });

    ////////////////////////////////////
    //Hello Artemis Module
    //Basically this is the verification stuff.
    ////////////////////////////////////
    let veriCall = await getGuild.get(msg.guild_id);
    if (veriCall) {
      if (veriCall.verificationChannel) {
        if (c.d.channel_id == veriCall.verificationChannel) {
          VERIFICATION = require("../modules/VERIFICATION");
          VERIFICATION.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);
        }
      }
    }

    ////////////////////////////////////
    //Checks if leveling is enabled!
    //If it is these 2 modules are triggered
    ////////////////////////////////////
    let pointGather = await getSettings.get(gld.id);

    if (pointGather) {
      if (pointGather.leveling == "ON") {
        ////////////////////////////////////
        //Thanking and congratulating module
        //Calls all mentions and rewards accordingly
        ////////////////////////////////////
        if (
          msg.content.toLowerCase().includes("thank") ||
          msg.content.toLowerCase().includes("congrat")
        ) {
          THANKS = require("../modules/THANKS");
          THANKS.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld, mntns);
        }

        ////////////////////////////////////
        //Level up events/modules
        //Only happens on new messages period
        ////////////////////////////////////
        LEVEL_UP = require("../modules/LEVEL_UP");
        LEVEL_UP.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);
      }
    }

    ////////////////////////////////////
    //Custom commands gets parsed here!
    //We check everything
    ////////////////////////////////////
    let pullCC = await db
      .prepare("SELECT * FROM cc WHERE gldid = ?")
      .all(gld.id);

    if (pullCC[0]) {
      for (let i of pullCC) {
        if (msg.content.includes(i.ccname)) {
          if (i.cclocation == "START") {
            if (msg.content.startsWith(i.ccname)) {
              actionParse = i.ccaction.replace(/\[author]/g, mmbr);
              if (mntns[0]) {
                actionParse = actionParse.replace(
                  /\[mention]/g,
                  `<@${mntns[0].id}>`
                );
              } else {
                actionParse = actionParse.replace(/\[mention]/g, mmbr);
              }

              await snd.send(actionParse);
            }
          } else {
            actionParse = i.ccaction.replace(/\[author]/g, mmbr);
            if (mntns[0]) {
              actionParse = actionParse.replace(
                /\[mention]/g,
                `<@${mntns[0].id}>`
              );
            } else {
              actionParse = actionParse.replace(/\[mention]/g, mmbr);
            }

            await snd.send(actionParse);
          }
        }
      }
    }

    ////////////////////////////////////
    //Commands get executed here
    //We pass trough information to the command file.
    ////////////////////////////////////
    if (!msg.content.startsWith(prefix)) return;

    try {
      const comExec = await client.commands.get(
        msg.content.slice(prefix.length).split(/ +/).shift().toLowerCase()
      );
      if (!comExec) return;

      ////////////////////////////////////
      //Permission check system
      //Goes from 0 to 4
      ////////////////////////////////////
      let perm = "NO";
      let permitCheck = await getScore.get(mmbr.id, gld.id);

      switch (comExec.permission) {
        case "0": //Regular Members
          perm = "YES";
          if (permitCheck.permit >= 0) perm = "YES";
          break;
        case "1": //Mute permissions
          if (mmbr.permissions.has("MUTE_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 1) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
        case "2": //Kick permissions
          if (mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 2) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
        case "3": //Ban permissions
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 3) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
        case "4": //Bot Owner
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 4) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
      }

      if (perm == "YES") {
        let usage = await getUsage.get(comExec.name);
        usage.number++;
        setUsage.run(usage);

        comExec.execute(msg, client, CONFIG, npm, mmbr);
      }

      if (perm == "NO")
        snd.send(
          `${mmbr}, You are lacking permissions to use this command!\n You need permission level: ${comExec.permission}!`
        );
    } catch (error) {
      console.error(error);
    }
  },
};
