////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "add",
  description:
    "This command allows you to add or remove points from a user or role.",
  permission: "2",
  explain: `This command allows you to add or remove points from a user or role.
This command needs parameters.

Example usage: (PREFIX)add --user=userID --points=20
Example usage: (PREFIX)add --user=@mention --points=20
Example usage: (PREFIX)add --user=roleID --points=20
Example usage: (PREFIX)add --user=@roleMention --points=20
Example usage: (PREFIX)add --user=userID --points=-20`,

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

    getUser = arguments.toLowerCase().split("--user=");
    let getUserA;
    if (getUser[1]) getUserA = getUser[1].replace(/\-\-points\=.*/gm, "");
    if (!getUserA)
      return snd.send(
        "You have not told me which user or role should be added/removed points from."
      );

    getPoint = arguments.toLowerCase().split("--points=");
    let getPointA;
    if (getPoint[1]) getPointA = getPoint[1].replace(/\-\-user\=.*/gm, "");
    if (!getPointA)
      return snd.send(
        "You have not told me how many points I should add or remove from this user/role."
      );

    checkPoint = await getPointA
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace("&", "")
      .replace(/ /g, "");

    checkUser = await getUserA
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace("&", "")
      .replace(/ /g, "");

    if (await isNaN(checkPoint))
      return snd.send(
        "The number you gave to add/remove turns out to not be a number."
      );

    checkPoint = await parseInt(checkPoint, 10);

    const mmbr2 = await gld.members.cache.get(checkUser);

    if (!mmbr2) {
      let roleCheck = await gld.roles.cache.find((r) => r.id === checkUser);

      if (!roleCheck)
        return snd.send(
          "The user you gave up to add points to was neither a valid user nor a role!"
        );

      pointID = roleCheck.id;

      looper = await gld.roles.cache
        .find((role) => role.id === pointID)
        .members.map((m) => m.id);

      await looper.forEach(async (L) => {
        score = await getScore.get(L, gld.id);

        if (!score) return;

        score.points += checkPoint;

        await setScore.run(score);
      });

      return snd.send(
        `I have added \`${await CONFIG.CONFIG(
          "CURRENCY"
        )}${checkPoint.toLocaleString()}\` worth to role \`${roleCheck.name}\``
      );
    } else {
      pointID = await mmbr2.id;

      score = await getScore.get(mmbr2.id, gld.id);

      if (!score)
        return snd.send("This user does not have a database entry yet!");

      score.points += checkPoint;

      await setScore.run(score);

      return snd.send(
        `I have added \`${await CONFIG.CONFIG(
          "CURRENCY"
        )}${checkPoint.toLocaleString()}\` worth to user \`${
          mmbr2.user.username
        }#${
          mmbr2.user.discriminator
        }\`.\nTheir new worth is \`${await CONFIG.CONFIG(
          "CURRENCY"
        )}${score.points.toLocaleString()}\`!`
      );
    }

    console.log(checkPoint, pointID);
  },
};
