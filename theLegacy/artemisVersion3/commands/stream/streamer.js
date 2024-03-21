////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "stream",
  name: "streamer",
  description:
    "This command allows you to add or remove streamers from the stream list.",
  permission: "2",
  explain: `This command allows you to add or remove streamers from the stream list.
For this to be in action you need to have setup a streaming channel.

Example usage: (PREFIX)streamer StreamerName`,

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
    const SCOPE = "user:read:email";

    await Twitch.getToken(
      CONFIG.CONFIG("TWITCH_ID"),
      CONFIG.CONFIG("TWITCH_SECRET"),
      SCOPE
    ).then(async (result) => {
      let access_token = result.access_token;

      let user = await Twitch.getUserInfo(
        access_token,
        await CONFIG.CONFIG("TWITCH_ID"),
        arguments.toLowerCase()
      );
      if (!user) return (check = "false");
      if (!user.data) return (check = "false");
      if (!user.data[0]) {
        check = "false";
      } else {
        check = "true";
      }
    });

    if (check !== "true")
      return snd.send(`${arguments} is not a valid streamer.`);

    let StreamerCheck = getStream.get(
      `${msg.guild_id}-${arguments.toLowerCase()}`
    );

    if (!StreamerCheck) {
      streamerAdd = {
        streamerguild: `${msg.guild_id}-${arguments.toLowerCase()}`,
        streamer: `${arguments.toLowerCase()}`,
        guild: `${msg.guild_id}`,
        status: `offline`,
      };

      setStream.run(streamerAdd);

      return snd.send(`Added ${arguments.toLowerCase()} to our list!`);
    } else {
      db.prepare(
        `DELETE FROM streamers WHERE streamerguild = '${
          msg.guild_id
        }-${arguments.toLowerCase()}'`
      ).run();

      return snd.send(
        `Removed ${arguments.toLowerCase()} from the guild streamers list!`
      );
    }
  },
};
