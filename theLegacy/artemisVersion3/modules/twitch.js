////////////////////////////////////
//This file processes the twitch emmiter
//Streamers get checked for online and offline and such
////////////////////////////////////
module.exports = {
  twitchEmit: async function (dat, client, CONFIG, npm) {
    ////////////////////////////////////
    //We grab the streamer
    //If there is none we don't do shit
    ////////////////////////////////////
    StreamerCheck = await getStream.get(`${dat[1]}-${dat[0]}`);
    if (!StreamerCheck) return;

    ////////////////////////////////////
    //We load the channels database for the streamer channel
    //This is important else we cant send a message
    ////////////////////////////////////
    guildDB = await getGuild.get(dat[1]);
    if (!guildDB) return;
    const streamerChannel = guildDB.streamChannel;

    ////////////////////////////////////
    //The (at)here ping in handled in settings
    //Depending on output the ping will be send
    ////////////////////////////////////
    const settingsGet = await getSettings.get(dat[1]);
    if (!settingsGet) return;

    const CompGLD = settingsGet.guildid;
    const CompPing = settingsGet.streamHere;

    ////////////////////////////////////
    //Load the guild itself
    //We can do stuff with it
    ////////////////////////////////////
    guildGet = await client.guilds.cache.get(guildDB.guild);
    if (!guildGet) return;

    ////////////////////////////////////
    //Easy send function
    //This is why we needed the guild get
    ////////////////////////////////////
    const snd = await client.channels.cache.get(streamerChannel);
    if (!snd) return;

    ////////////////////////////////////
    //Main function after all checks
    //We use our earlier data to do stuff
    ////////////////////////////////////
    if (dat[2] == "OFFLINE") {
      if (StreamerCheck.status == "offline") {
        return;
      } else {
        //set to offline
        StreamerCheck.status = "offline";

        //run database
        setStream.run(StreamerCheck);

        return; //await snd.send(`${dat[0]} went offline!`);
      }
    } else {
      //check status
      if (StreamerCheck.status == "offline") {
        StreamerCheck.status = "online";
        setStream.run(StreamerCheck);
        const SCOPE = "analytics:read:games";
        Twitch.getToken(
          CONFIG.CONFIG("TWITCH_ID"),
          CONFIG.CONFIG("TWITCH_SECRET"),
          SCOPE
        ).then(async (result) => {
          let stream_info = await Twitch.getGames(
            result.access_token,
            await CONFIG.CONFIG("TWITCH_ID"),
            dat[3]
          );
          if (!stream_info.data[0]) return;
          let gameName = stream_info.data[0].name;
          let gameImg = await stream_info.data[0].box_art_url
            .replace("{width}", "500")
            .replace("{height}", "500")
            .replace("./", "");
          let streamImg = dat[6]
            .replace("{width}", "500")
            .replace("{height}", "400");
          let streamUrl = `https://twitch.tv/${dat[0]}`;
          let streamView = dat[5];
          let streamName = dat[0];
          let streamInfo = dat[4];
          const embed = new Discord.MessageEmbed()
            .setAuthor(streamName, gameImg)
            .setThumbnail(`${dat[7]}`)
            .setTitle(`${streamName} is streaming ${gameName}!`)
            .setColor(`RANDOM`)
            .setURL(streamUrl)
            .setDescription(`${streamName} went live on Twitch!`)
            .addField(streamInfo, "\n" + streamUrl)
            .setImage(gameImg)
            .setFooter(`Viewers: ${streamView}`);
          if (CompPing == "ON" && CompGLD == snd.guild.id) {
            return await snd.send("@here", {
              embed,
            });
          } else {
            return await snd.send({
              embed,
            });
          }
        });
      } else {
        return;
      }
    }
  },
};
