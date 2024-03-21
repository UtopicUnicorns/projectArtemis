////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "weather",
  description: "Set your location for weather updates.",
  permission: "0",
  explain: `Set your location for weather updates.

Example usage: (PREFIX)weather
Example usage: (PREFIX)weather --delete`,

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

    if (arguments) {
      if (arguments.toLowerCase().includes("delete")) {
        let geo_del = getGG.get(msg.author.id);

        if (geo_del) {
          await db
            .prepare(`DELETE FROM geograb WHERE usrid = '${msg.author.id}'`)
            .run();

          return snd.send(`${mmbr}, your data has been destroyed.`);
        }
      }
    }

    let geo = getGG.get(msg.author.id);

    async function geoSet() {
      let geoVer = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );

      let geoCount = 0;
      let geoFinal;

      geoVer.on("collect", async (m) => {
        if (m.content) {
          if (geoCount == 2) {
            if (m.content.toLowerCase().includes("yes")) {
              locationSet = {
                usrid: mmbr.user.id,
                loc: `${geoFinal.name}, ${geoFinal.country}`,
                lastday: "NONE",
                lon: `${geoFinal.lon}`,
                lan: `${geoFinal.lat}`,
              };
              await setGG.run(locationSet);

              snd.send(
                `${mmbr}, I have set your location to: ${geoFinal.name}, ${geoFinal.country}`
              );

              return geoVer.stop();
            } else {
              snd.send(
                "Alright, I aborted the action. Please use the command again to check if I can do it now."
              );

              return geoVer.stop();
            }
          }

          if (geoCount == 1) {
            request(
              `http://api.openweathermap.org/geo/1.0/direct?q=${
                m.content
              }&limit=1&appid=${CONFIG.CONFIG("weather")}`,
              {
                json: true,
              },
              (err, res, body) => {
                //if something went wrong
                if (err) {
                  snd.send("An error occured!, action has been aborted!");
                  return geoVer.stop();
                }

                if (res) {
                  if (res.body) {
                    if (res.body[0]) {
                      geoCount++;

                      geoFinal = res.body[0];

                      snd.send(`
${mmbr}, this is the data I got:
${res.body[0].name}
${res.body[0].country}

Is this right?
\`YES\` \`NO\`
                      `);
                    } else {
                      snd.send(
                        "This location was not recognized! Action has been aborted."
                      );
                      return geoVer.stop();
                    }
                  }
                }
              }
            );
          }

          if (geoCount == 0) {
            if (m.content.toLowerCase().includes("yes")) {
              geoCount++;
              snd.send(
                `${mmbr}, please write down your location.\n\`city name , state code, country code\`\nThis may also be just your city name.`
              );
            } else {
              geoVer.stop();

              return snd.send(`${mmbr}, understandable, have a nice day!`);
            }
          }
        } else {
          geoVer.stop();

          return snd.send(
            `${mmbr}, it looks like you did not send me a message, this action has been aborted!`
          );
        }
      });
    }

    if (geo) {
      request(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${geo.lan}&lon=${
          geo.lon
        }&units=metric&appid=${CONFIG.CONFIG("weather")}`,
        {
          json: true,
        },
        (err, res, body) => {
          //if something went wrong
          if (err) return;
          if (body) {
            mmbr.send(
              `
**Weather for ${mmbr} @ ${geo.loc}**
  Time: \`${moment
    .unix(body.current.dt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss")}\`
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
              `
            );
          }
        }
      );
    } else {
      geoSet();
      snd.send(
        `Hello ${mmbr}, I do not know your location, do you want to tell me?\n\n\`YES\` \`NO\``
      );
    }
  },
};
