////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "support",
  name: "help",
  description: "This command allows you to create a support session.",
  permission: "0",
  explain: `This command allows you to create a support session.
The channel this command is used in needs to be a designated support creation channel as setup in (PREFIX)setup --setup=support

Example usage: (PREFIX)help`,

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
    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;
    let sChan = await getSupportChannels.get(msg.channel_id);

    if (sChan) {
      async function confirmActionFN() {
        let counter = 0;
        let confirmAction = snd.createMessageCollector(
          (m) => m.author.id === msg.author.id
        );
        confirmAction.on("collect", async (m) => {
          counter++;

          if (counter == 1) {
            if (m.content.toLowerCase() == "yes") {
              return snd.send(
                "In one message explain your issue.\nYou can also attach one file this may be a text file or an image elaborating the issue.\n\nIf this creation was a mistake then simply write `cancel`"
              );
            } else {
              snd.send("Case creation canceled!");
              return confirmAction.stop();
            }
          }

          if (counter == 2) {
            if (m.content.toLowerCase() == "cancel") {
              confirmAction.stop();
              return snd.send("Case creation canceled!");
            } else {
              scaseNumberGet = await db.prepare(
                'SELECT * FROM supportcases ORDER BY "caseid" DESC'
              );

              let numGet = await scaseNumberGet.get();

              if (!numGet) {
                if (await m.attachments.first()) {
                  var att = await m.attachments.first().url;
                } else {
                  var att = await "NONE";
                }

                if (m.content) {
                  var mess = m.content.slice(0, 1000);
                } else {
                  var mess = "NONE";
                }

                numGet = {
                  caseid: 1,
                  userid: mmbr.user.id,
                  username: `${mmbr.user.username}#${mmbr.user.discriminator}`,
                  attachments: await att,
                  casemessage: mess,
                  date: `${moment().format("MMMM Do YYYY, HH:mm:ss")}`,
                  solvedby: "NONE",
                  solution: "",
                };

                await setSCase.run(numGet);
              } else {
                caseNumber = (await parseInt(numGet.caseid)) + 1;

                if (await m.attachments.first()) {
                  var att = await m.attachments.first().url;
                } else {
                  var att = await "NONE";
                }

                if (m.content) {
                  var mess = m.content.slice(0, 1000);
                } else {
                  var mess = "NONE";
                }

                numGet = {
                  caseid: caseNumber,
                  userid: mmbr.user.id,
                  username: `${mmbr.user.username}#${mmbr.user.discriminator}`,
                  attachments: await att,
                  casemessage: mess,
                  date: `${moment().format("MMMM Do YYYY, HH:mm:ss")}`,
                  solvedby: "NONE",
                  solution: "",
                };

                await setSCase.run(numGet);
              }

              try {
                const fruits = [
                  "Apple",
                  "Apricot",
                  "Avocado",
                  "Banana",
                  "Bilberry",
                  "Blackberry",
                  "Blackcurrant",
                  "Blueberry",
                  "Boysenberry",
                  "Currant",
                  "Cherry",
                  "Cherimoya",
                  "Chicofruit",
                  "Cloudberry",
                  "Coconut",
                  "Cranberry",
                  "Cucumber",
                  "Custardapple",
                  "Damson",
                  "Dragonfruit",
                  "Durian",
                  "Elderberry",
                  "Feijoa",
                  "Fig",
                  "Gojiberry",
                  "Gooseberry",
                  "Grape",
                  "Raisin",
                  "Grapefruit",
                  "Guava",
                  "Honeyberry",
                  "Huckleberry",
                  "Jabuticaba",
                  "Jackfruit",
                  "Jambul",
                  "Jujube",
                  "Juniperberry",
                  "Kiwano",
                  "Kiwifruit",
                  "Kumquat",
                  "Lemon",
                  "Lime",
                  "Loquat",
                  "Longan",
                  "Lychee",
                  "Mango",
                  "Mangosteen",
                  "Marionberry",
                  "Melon",
                  "Cantaloupe",
                  "Honeydew",
                  "Watermelon",
                  "Miracle fruit",
                  "Mulberry",
                  "Nectarine",
                  "Nance",
                  "Olive",
                  "Orange",
                  "Bloodorange",
                  "Clementine",
                  "Mandarine",
                  "Tangerine",
                  "Papaya",
                  "Passionfruit",
                  "Peach",
                  "Pear",
                  "Persimmon",
                  "Physalis",
                  "Plantain",
                  "Plum",
                  "Prune",
                  "Pineapple",
                  "Plumcot",
                  "Pomegranate",
                  "Pomelo",
                  "Quince",
                  "Raspberry",
                  "Salmonberry",
                  "Rambutan",
                  "Redcurrant",
                  "Salal berry",
                  "Salak",
                  "Satsuma",
                  "Soursop",
                  "Star fruit",
                  "Strawberry",
                  "Tamarillo",
                  "Tamarind",
                  "Yuzu",
                ];

                const select = await fruits[~~(Math.random() * fruits.length)];

                await gld.channels
                  .create(`🔔${select}-${numGet.caseid}`, {
                    type: "text",
                    permissionOverwrites: [
                      {
                        id: gld.roles.everyone,
                        allow: [
                          "VIEW_CHANNEL",
                          "SEND_MESSAGES",
                          "READ_MESSAGE_HISTORY",
                        ],
                      },
                    ],
                  })
                  .then(async (chan) => {
                    await chan.setParent(snd.parent);

                    inuseset = {
                      chanid: chan.id,
                      caseid: numGet.caseid,
                    };

                    await setSupportInUseChannels.run(inuseset);

                    let getThis = getGuild.get(gld.id);
                    if (getThis) {
                      let testRole = await gld.roles.cache.find(
                        (r) => r.id === getThis.supportInUseChannel
                      );

                      if (testRole) {
                        await chan.send(`${testRole}, You have been summoned!`);
                      }
                    }

                    let embed = new Discord.MessageEmbed()
                      .setColor("DARK_ORANGE")
                      .setThumbnail(
                        `https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`
                      )
                      .setTitle(`Case ${numGet.caseid}`)
                      .setDescription(`${numGet.casemessage.slice(0, 1000)}`)
                      .addField(
                        "Opened by:",
                        `${numGet.username}\n${numGet.userid}`
                      )
                      .setFooter(`${numGet.date}`);

                    if (gld.id == "628978428019736619") {
                      var infoText = `**Kindly provide system info to us.**
Doing so will help us, assist you better.

You can do this in Linux Mint by:
1. opening the start menu
2. then open the 'System Reports' application
3. then click "System Information'
4. then click copy, then paste the information **inside the support ticket** in Discord. " `;
                    } else {
                      var infoText = "This is your Ticket!";
                    }
                    await chan
                      .send(`<@${mmbr.user.id}>, ${infoText}`, embed)
                      .then((M) => M.pin());
                    if (numGet.attachments)
                      chan.send(`Attachment:\n${numGet.attachments}`);
                    await snd.send(
                      `<@${mmbr.user.id}>, Your case has been opened in: ${chan}.\nYour case number is \`${numGet.caseid}\`.`
                    );
                  });
              } catch (err) {
                await snd.send("Something went wrong!");
              }

              return confirmAction.stop();
            }
          }
        });
      }

      confirmActionFN();
      return snd.send("Are you sure you want to create a case?\n`YES` or `NO`");
    } else {
      snd.send("This is not a designated support creation channel.");
    }
  },
};
