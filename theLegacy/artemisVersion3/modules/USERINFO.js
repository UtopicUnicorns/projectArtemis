////////////////////////////////////
//Name and nick changes come in here
//As well as general database checks
////////////////////////////////////
module.exports = {
  eventTrigger: async function(c, client, CONFIG, npm, mmbr) {
    ////////////////////////////////////
    //We define the guild here and change
    //c.d to msg for ease of use
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(c.d.guild_id);
    if (!gld) return;

    const msg = c.d;

    ////////////////////////////////////
    //We check if a user has a db entry
    //If they do they will be monitored to see if they change their name/nick
    ////////////////////////////////////
    let nicknameInfo = await getN.get(gld.id, mmbr.user.id);

    if (nicknameInfo) {
      if (nicknameInfo.nickname !== mmbr.nickname) {
        if (mmbr.nickname) {
          let embed = new Discord.MessageEmbed()
            .setThumbnail(
              mmbr.user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 1024
              })
            )
            .setColor("YELLOW")
            .setDescription("Nickname Changed")
            .addField(
              "Member:",
              `${mmbr.user.username}#${mmbr.user.discriminator}`
            )
            .addField("Old nickname", `${nicknameInfo.nickname}`)
            .addField("New nickname:", `${mmbr.nickname}`)
            .setFooter(`ID: ${mmbr.id}`)
            .setTimestamp();

          try {
            await client.channels.cache
              .get(await getGuild.get(msg.guild_id).logsChannel)
              .send({ embed });
          } catch (err) {
            console.log("");
          }
        }
        nicknameInfo.nickname = mmbr.nickname;
        setN.run(nicknameInfo);
      }
    } else {
      nicknameInfo = {
        usridgldid: `${mmbr.user.id}${gld.id}`,
        gldid: gld.id,
        usrid: mmbr.user.id,
        nickname: `${mmbr.nickname}`
      };
      setN.run(nicknameInfo);
    }

    let userinfo = await getUserInfo.get(mmbr.user.id);
    if (userinfo) {
      if (mmbr.nickname) {
        ////////////////////////////////////
        //If the nickname is not equal to a database entry
        //It will be logged and put into the database.
        ////////////////////////////////////
        if (!userinfo.nickname.split("##").includes(mmbr.nickname)) {
          let pop2 = userinfo.nickname.split("##");
          pop2name = pop2[pop2.length - 2];
          if (!pop2name) pop2name = "None";
          userinfo.nickname = `${userinfo.nickname}${mmbr.nickname}##`;
          setUserInfo.run(userinfo);
        }
      }

      ////////////////////////////////////
      //If the username is unique in the database it will get logged
      //It will also create a database entry
      ////////////////////////////////////
      if (!userinfo.username.split("##").includes(mmbr.user.username)) {
        let pop1 = userinfo.username.split("##");
        pop1name = pop1[pop1.length - 2];
        if (!pop1name) pop1name = "None";

        let embed = new Discord.MessageEmbed()
          .setThumbnail(
            mmbr.user.displayAvatarURL({
              format: "png",
              dynamic: true,
              size: 1024
            })
          )
          .setColor("RED")
          .setDescription("Username Changed")
          .addField(
            "Member:",
            `${mmbr.user.username}#${mmbr.user.discriminator}`
          )
          .addField("Old username", `${pop1name}`)
          .addField("New username:", `${mmbr.user.username}`)
          .setFooter(`ID: ${mmbr.id}`)
          .setTimestamp();

        try {
          await client.channels.cache
            .get(await getGuild.get(msg.guild_id).logsChannel)
            .send({ embed });
        } catch (err) {
          console.log("");
        }

        userinfo.username = `${userinfo.username}${mmbr.user.username}##`;
        setUserInfo.run(userinfo);
      }
    } else {
      ////////////////////////////////////
      //If the user does not have a database entry
      //It will be created
      ////////////////////////////////////
      userinfo = {
        id: mmbr.user.id,
        username: `${mmbr.user.username}##`,
        nickname: `${mmbr.nickname}##`,
        specs: "",
        totalwarnings: 0,
        totalmutes: 0
      };
      setUserInfo.run(userinfo);
    }
  }
};
