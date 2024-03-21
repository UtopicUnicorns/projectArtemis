////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "migrate",
  description: "Migrate",
  permission: "4",
  explain: `f`,

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

    migrateDB = await require("better-sqlite3")(
      "/home/librorum/Documents/Art-re/scores.sqlite"
    );

    //phase 1
    aa = await migrateDB.prepare("SELECT * FROM admincases;").all();

    await aa.forEach((A) => {
      buildCase = {
        guildidcaseid: `${A.guildidcaseid}`,
        caseid: `${A.caseid}`,
        guildid: `${A.guildid}`,
        userid: `${A.userid}`,
        username: `${A.username}`,
        type: `${A.type}`,
        reason: `${A.reason}`,
        date: `${A.date}`,
        judge: `NONE`,
      };

      setACase.run(buildCase);
    });

    await snd.send("Phase 1 complete.");

    //phase 2
    bb = await migrateDB.prepare("SELECT * FROM scores;").all();

    await bb.forEach((B) => {
      processID = B.id.split("-");
      final = `${processID[1]}-${processID[0]}`;
      score = {
        id: `${final}`,
        user: `${B.user}`,
        guild: `${B.guild}`,
        points: B.points,
        level: B.level,
        warning: 0,
        muted: 0,
        permit: 0,
        bonus: 0,
      };
      setScore.run(score);
    });

    await snd.send("Phase 2 complete.");

    //phase 3
    cc = await migrateDB.prepare("SELECT * FROM supcase;").all();

    await cc.forEach((C) => {
      numGet = {
        caseid: C.scase,
        userid: C.askby,
        username: C.askby,
        attachments: "NONE",
        casemessage: C.question,
        date: `${moment().format("MMMM Do YYYY, HH:mm:ss")}`,
        solvedby: C.solveby,
        solution: C.answer,
      };

      setSCase.run(numGet);
    });

    await snd.send("Phase 3 complete.");

    //phase 4
    dd = await migrateDB.prepare("SELECT * FROM guildhub;").all();

    await dd.forEach((D) => {
      thisGuild = {
        guild: `${D.guild}`,
        generalChannel: `${D.generalChannel}`,
        highlightChannel: `${D.highlightChannel}`,
        muteChannel: `${D.muteChannel}`,
        logsChannel: `${D.logsChannel}`,
        streamChannel: `${D.streamChannel}`,
        reactionChannel: `${D.reactionChannel}`,
        verificationChannel: `${D.muteChannel}`,
        supportChannel: ``,
        supportInUseChannel: ``,
      };

      setGuild.run(thisGuild);
    });

    await snd.send("Phase 4 complete.");

    //phase 5
    ee = await migrateDB.prepare("SELECT * FROM guildhub;").all();

    await ee.forEach((E) => {
      if (E.streamHere == "2") {
        streamping = "ON";
      } else {
        streamping = "OFF";
      }

      if (E.autoMod == "2") {
        am = "ON";
      } else {
        am = "OFF";
      }

      if (E.leveling == "2") {
        le = "OFF";
      } else {
        le = "ON";
      }

      thisGuildS = {
        guildid: `${E.guild}`,
        artemisTalks: `ON`,
        streamHere: `${streamping}`,
        autoMod: `${am}`,
        prefix: `${E.prefix}`,
        leveling: `${le}`,
        wmessage: `${E.wmessage}`,
        wimage: `NONE`,
        defaultrole: `${E.defaultrole}`,
        bonuspoints: 50,
      };

      setSettings.run(thisGuildS);
    });

    await snd.send("Phase 5 complete.");

    //phase 6
    ff = await migrateDB.prepare("SELECT * FROM streamers;").all();

    await ff.forEach((F) => {
      streamerAdd = {
        streamerguild: `${F.streamerguild}`,
        streamer: `${F.streamer}`,
        guild: `${F.guild}`,
        status: `offline`,
      };

      setStream.run(streamerAdd);
    });

    await snd.send("Phase 6 complete.");
  },
};
