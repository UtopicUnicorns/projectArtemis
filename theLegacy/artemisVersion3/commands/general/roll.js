////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "roll",
  description: "Roll some dice!",
  permission: "0",
  explain: `Roll some dice!.

Example usage: (PREFIX)roll 1d 20s
Example usage: (PREFIX)roll 2d 6s
Example usage: (PREFIX)roll 3d 20s`,

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
    let numberSel = [
      ":one:",
      ":two:",
      ":three:",
      ":four:",
      ":five:",
      ":six:",
      ":seven:",
      ":eight:",
      ":nine:",
      ":one::zero:",
      ":one::one:",
      ":one::two:",
      ":one::three:",
      ":one::four:",
      ":one::five:",
      ":one::six:",
      ":one::seven:",
      ":one::eight:",
      ":one::nine:",
      ":two::zero:"
    ];

    if (!arguments) {
      var inPut = 1;
      var Die = 6;
    } else {
      let splitArg = arguments.split(" ");

      if (!splitArg[0]) {
        var inPut = 1;
      } else {
        if (isNaN(splitArg[0])) {
          var inPut = 1;
        } else {
          if (splitArg[0] > 10 || splitArg[0] < 1) {
            var inPut = 1;
          } else {
            var inPut = splitArg[0];
          }
        }
      }

      if (!splitArg[1]) {
        var Die = 6;
      } else {
        if (isNaN(splitArg[1])) {
          var Die = 6;
        } else {
          if (splitArg[1] > 20 || splitArg[1] < 6) {
            var Die = 6;
          } else {
            var Die = splitArg[1];
          }
        }
      }
    }

    let i = 0;
    let total = 0;
    let numCol = [`*Die count: ${inPut}, Max Die num: ${Die}*\n`];
    while (i < inPut) {
      let randomNum = Math.floor(Math.random() * Die);
      numCol.push(`Dice **${Math.floor(i + 1)}**: ${numberSel[randomNum]}\n`);
      total = Math.floor(total + randomNum + 1);
      i++;
    }

    snd.send(`${numCol.join("")}\nTotal: **${total}**`, {
      split: true
    });
  }
};
