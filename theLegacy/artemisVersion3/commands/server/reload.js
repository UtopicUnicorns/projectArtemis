////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "reload",
  description: "Reload a command!",
  permission: "4",
  explain: `Reload a command!
  
Example usage: (PREFIX)reload ping`,

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

    let commandName = await client.commands.has(arguments.toLowerCase());

    if (!commandName) {
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
        //return console.log(file);
        const command = require(`../../${file}`);

        if (command.name == arguments.toLowerCase()) {
          let usagecheck = getUsage.get(command.name);
          if (!usagecheck) {
            usagecheck = {
              command: command.name,
              number: `0`,
            };
            setUsage.run(usagecheck);
          }
          client.commands.set(command.name, command);

          return snd.send(`\`${command.name}\` has been loaded!`);
        }
      });
    } else {
      let commandProcName = await arguments.toLowerCase();

      Object.keys(require.cache).forEach(function (key) {
        let delReq = require.cache[key];

        if (delReq.id.includes("/root/Server/commands/")) {
          let delReq2 = delReq.id.split("/");

          let commandPush = [];

          delReq2.forEach((mod) => {
            //if object is input.js
            if (mod === `${commandProcName}.js`) {
              if (delReq.id.length > 1) {
                //Push into array
                commandPush.push(`${delReq.id}`);
              }
            }

            //loop trough array
            commandPush.forEach((comName) => {
              //if it includes this key
              if (comName.includes("/root/Server/commands/")) {
                //delete cache for command
                delete require.cache[require.resolve(`${comName}`)];

                //delete from set
                client.commands.delete(commandProcName);

                //reload command
                const props = require(`${comName}`);

                //pour into set
                client.commands.set(commandProcName, props);

                //notify
                snd.send(`The command ${commandProcName} has been reloaded`);
              }
            });
          });
        }
      });
    }
  },
};
