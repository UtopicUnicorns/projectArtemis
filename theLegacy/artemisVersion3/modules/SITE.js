////////////////////////////////////
//Website add module
//gets triggered on READY
////////////////////////////////////
module.exports = {
  site: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //Select engine used
    //In our case its ejs
    ////////////////////////////////////
    app.set("view engine", "ejs");
    app.set("views", "./content/SITE");
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    ////////////////////////////////////
    //Force https
    //triggers a 301 redirect
    ////////////////////////////////////
    app.use(function (req, res, next) {
      if (req.secure) {
        next();
      } else {
        res.redirect(301, "https://" + req.headers.host + req.url);
      }
    });

    ////////////////////////////////////
    //Static content
    //Easy to use
    ////////////////////////////////////
    app.use("/", express.static("./content/SITE"));
    const oPort = await CONFIG.CONFIG("oauthport");
    const oID = await CONFIG.CONFIG("oauthclientid");
    const oSecret = await CONFIG.CONFIG("oauthclientsecret");
    var cookieParser = require("cookie-parser");
    app.use(cookieParser());

    ////////////////////////////////////
    //Login Redirect
    //Just a redirect
    ////////////////////////////////////
    app.get("/login", (req, res) => {
      res.redirect(
        `https://discord.com/api/oauth2/authorize?client_id=440892659264126997&redirect_uri=https%3A%2F%2Fartemis.rest%2Fpasstrough&response_type=code&scope=identify%20guilds`
      );
    });

    ////////////////////////////////////
    //Passing trough with info
    //Checking if everything is ok
    ////////////////////////////////////
    app.get("/passtrough", async ({ query }, response) => {
      const { code } = query;

      if (code) {
        try {
          const oauthResult = await oFetch(
            "https://discord.com/api/oauth2/token",
            {
              method: "POST",
              body: new URLSearchParams({
                client_id: oID,
                client_secret: oSecret,
                code,
                grant_type: "authorization_code",
                redirect_uri: `https://artemis.rest/passtrough`,
                scope: "identify guilds",
              }),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const oauthData = await oauthResult.json();

          response.cookie("auth", `${oauthData.access_token}`);

          response.redirect("/");
        } catch (error) {
          response.redirect("/");
        }
      }
    });

    ////////////////////////////////////
    //Basically index.html
    //Front page stuff
    ////////////////////////////////////
    app.get("/", async (req, res) => {
      ////////////////////////////////////
      //Login Check
      //Checks stuff
      ////////////////////////////////////
      let authCode = req.cookies.auth;

      async function loggedin() {
        const userResult = await oFetch("https://discord.com/api/users/@me", {
          headers: {
            authorization: `Bearer ${authCode}`,
          },
        });

        datalogin = await userResult.json();

        return datalogin;
      }

      async function loggedguild() {
        const guildResult = await oFetch(
          "https://discord.com/api/users/@me/guilds ",
          {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          }
        );

        dataguild = await guildResult.json();

        return dataguild;
      }

      const guildData = await loggedguild();
      const loginData = await loggedin();

      async function loggedIn2(isLogin) {
        if (isLogin.username) {
          let counter = 0;
          let buttons = [];
          let mbuttons = [];

          for (let i of guildData) {
            let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
            let gget = await client.guilds.cache.get(i.id);
            if (gget) {
              let uget = await gget.members.cache.get(isLogin.id);

              if (
                uget.hasPermission("KICK_MEMBERS") ||
                uget.hasPermission("BAN_MEMBERS")
              ) {
                await counter++;

                if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                mbuttons.push(
                  `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                );
              }

              buttons.push(
                `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
              );
            }
          }
          let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

          return `<script>document.getElementById("logodiv").innerHTML = "${
            isLogin.username
          }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
            isLogin.username
          }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
        } else {
          return `<div class="aBox"><a href="/login">Login</a></div>`;
        }
      }

      ////////////////////////////////////
      //Client function
      //Basically gives us access to raw functions
      ////////////////////////////////////
      const test = {
        client: client,
      };

      ////////////////////////////////////
      //Render the final page
      //All functions gets passed trough
      ////////////////////////////////////
      res.render("index", {
        page: "index",
        test: test,
        logged: await loggedIn2(loginData),
      });
    });

    ////////////////////////////////////
    //Basic command page
    //no css commands
    ////////////////////////////////////
    app.get("/commands", async (req, res) => {
      ////////////////////////////////////
      //Login Check
      //Checks stuff
      ////////////////////////////////////
      let authCode = req.cookies.auth;

      async function loggedin() {
        const userResult = await oFetch("https://discord.com/api/users/@me", {
          headers: {
            authorization: `Bearer ${authCode}`,
          },
        });

        datalogin = await userResult.json();

        return datalogin;
      }

      async function loggedguild() {
        const guildResult = await oFetch(
          "https://discord.com/api/users/@me/guilds ",
          {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          }
        );

        dataguild = await guildResult.json();

        return dataguild;
      }

      const guildData = await loggedguild();
      const loginData = await loggedin();

      async function loggedIn2(isLogin) {
        if (isLogin.username) {
          let counter = 0;
          let buttons = [];
          let mbuttons = [];

          for (let i of guildData) {
            let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
            let gget = await client.guilds.cache.get(i.id);
            if (gget) {
              let uget = await gget.members.cache.get(isLogin.id);

              if (
                uget.hasPermission("KICK_MEMBERS") ||
                uget.hasPermission("BAN_MEMBERS")
              ) {
                await counter++;

                if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                mbuttons.push(
                  `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                );
              }

              buttons.push(
                `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
              );
            }
          }
          let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

          return `<script>document.getElementById("logodiv").innerHTML = "${
            isLogin.username
          }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
            isLogin.username
          }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
        } else {
          return `<div class="aBox"><a href="/login">Login</a></div>`;
        }
      }

      ////////////////////////////////////
      //Command tree module
      //Fetches all usable commands
      ////////////////////////////////////
      async function commandTree() {
        let cats = [];
        let counterCom = 0;
        await client.commands.forEach(async (com) => {
          if (!cats[com.category]) cats[com.category] = [];
          let usag = getUsage.get(com.name);
          counterCom++;
          if (counterCom % 2 == 0) {
            await cats[com.category].push(
              `<div class="board">
  <br>Command name: \`!${com.name}\`<br>

    Command used \`${usag.number}\` times<br>
      Permission level: \`${com.permission}\`<br>
        Explanation: \`${com.explain
          .replace(/\(PREFIX\)/g, "!")
          .replace(/\n/g, "<br>")}\`<br><br></div><br>`
            );
          } else {
            await cats[com.category].push(
              `<div class="board2">
  <br>Command name: \`!${com.name}\`<br>

    Command used \`${usag.number}\` times<br>
      Permission level: \`${com.permission}\`<br>
        Explanation: \`${com.explain
          .replace(/\(PREFIX\)/g, "!")
          .replace(/\n/g, "<br>")}\`<br><br></div><br>`
            );
          }
        });
        let doneCats = [];
        let procCats = [];

        await client.commands.forEach(async (cat) => {
          if (!procCats[cat.category]) {
            procCats[cat.category] = "DONE";
            await doneCats.push(
              `<br><h2>Category: ${cat.category}</h2>${await cats[
                cat.category
              ]}`
            );
          }
        });

        return await doneCats.join("").replace(/\,/g, "\n").replace(/\`/g, "");
      }

      ////////////////////////////////////
      //Client function
      //Basically gives us access to raw functions
      ////////////////////////////////////
      const test = {
        client: client,
      };

      ////////////////////////////////////
      //Render the final page
      //All functions gets passed trough
      ////////////////////////////////////
      res.render("commands", {
        page: "commands",
        test: test,
        data: await commandTree(),
        logged: await loggedIn2(loginData),
      });
    });

    ////////////////////////////////////
    //Leaderboards
    //lets hope this works
    ////////////////////////////////////
    app.get("/leaderboard", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      let guildGrab = await client.guilds.cache.get(guildid);

      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch all members in db
        //Need to be in db
        ////////////////////////////////////
        function leaderBoard() {
          let curr = CONFIG.CONFIG("CURRENCY");

          let pull = db
            .prepare(
              'SELECT * FROM scores WHERE guild = ? ORDER BY "points" DESC'
            )
            .all(guildid);

          countMem = 0;
          memList = [];

          for (let i of pull) {
            if (i.points > 4) {
              let memGet = guildGrab.members.cache.get(i.user);
              if (memGet) {
                let bumpGet = getBumpRecord.get(i.user, guildid);

                if (bumpGet) {
                  bumptext = `<h2>Bump record</h2>!bump: ${bumpGet.bump}<br>!d bump: ${bumpGet.dbump}<br>dlm!bump: ${bumpGet.dlmbump}<br>!like: ${bumpGet.like}<br>.bump: ${bumpGet.dotbump}<br>`;
                } else {
                  bumptext = "";
                }

                countMem++;

                if (countMem % 2 == 0) {
                  memList.push(`<div class="board">
   <br>[${countMem}] <a href='https://cdn.discordapp.com/avatars/${memGet.user.id}/${memGet.user.avatar}' target="_blank"><img src='https://cdn.discordapp.com/avatars/${memGet.user.id}/${memGet.user.avatar}' width='25px' height='25px'></a> ${memGet.user.username}#${memGet.user.discriminator}<br>
    <h2>Basic info</h2>Net Worth: ${curr} ${i.points}<br>
      Level: ${i.level}<br>Bonuses received: ${i.bonus}<br>${bumptext}<br></div><br>`);
                } else {
                  memList.push(`<div class="board2">
   <br>[${countMem}] <a href='https://cdn.discordapp.com/avatars/${memGet.user.id}/${memGet.user.avatar}' target="_blank"><img src='https://cdn.discordapp.com/avatars/${memGet.user.id}/${memGet.user.avatar}' width='25px' height='25px'></a> ${memGet.user.username}#${memGet.user.discriminator}<br>
    <h2>Basic info</h2>Net Worth: ${curr} ${i.points}<br>
      Level: ${i.level}<br>Bonuses received: ${i.bonus}<br>${bumptext}<br></div><br>`);
                }
              }
            }
          }

          return memList.join("");
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("leaderboard", {
          page: "leaderboard",
          test: test,
          data: await leaderBoard(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Word Ban List
    //lets hope this works
    ////////////////////////////////////
    app.get("/wordban", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      let guildGrab = await client.guilds.cache.get(guildid);

      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch all members in db
        //Need to be in db
        ////////////////////////////////////
        function wordbanList() {
          let WBList = [];
          const wordSel = db
            .prepare("SELECT badwords FROM badword WHERE gldid = ?;")
            .all(guildid);

          if (wordSel) {
            if (wordSel[0]) {
              for (let i of wordSel) {
                WBList.push(i.badwords);
              }
            }
          }

          return WBList.join("<br>");
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("wordban", {
          page: "wordban",
          test: test,
          data: await wordbanList(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Phrase Ban List
    //lets hope this works
    ////////////////////////////////////
    app.get("/phraseban", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      let guildGrab = await client.guilds.cache.get(guildid);

      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch all members in db
        //Need to be in db
        ////////////////////////////////////
        function phrasebanList() {
          let PBList = [];
          const wordSel = db
            .prepare("SELECT badphrases FROM badphrase WHERE gldid = ?;")
            .all(guildid);

          if (wordSel) {
            if (wordSel[0]) {
              for (let i of wordSel) {
                PBList.push(i.badphrases);
              }
            }
          }

          return PBList.join("<br>");
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("phraseban", {
          page: "phraseban",
          test: test,
          data: await phrasebanList(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Custom Command List
    //lets hope this works
    ////////////////////////////////////
    app.get("/cc", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      let guildGrab = await client.guilds.cache.get(guildid);

      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch all members in db
        //Need to be in db
        ////////////////////////////////////
        function ccList() {
          let commandList = [];
          const wordSel = db
            .prepare("SELECT * FROM cc WHERE gldid = ?;")
            .all(guildid);

          if (wordSel) {
            if (wordSel[0]) {
              for (let i of wordSel) {
                commandList.push(
                  `<h2>Action trigger: ${i.ccname}</h2>${i.ccaction}<br><br><small>Action position: ${i.cclocation}</small>`
                );
              }
            }
          }

          return commandList.join("<br>");
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("cc", {
          page: "cc",
          test: test,
          data: await ccList(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Ignore List
    //lets hope this works
    ////////////////////////////////////
    app.get("/ignore", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      //let guildGrab = await client.guilds.cache.get(guildid);

      //if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch all members in db
        //Need to be in db
        ////////////////////////////////////
        function ignoreList() {
          let iList = [];
          const wordSel = db
            .prepare("SELECT * FROM wordignore WHERE chan = ?;")
            .all(guildid);

          if (wordSel) {
            if (wordSel[0]) {
              for (let i of wordSel) {
                iList.push(`${i.word}`);
              }
            }
          }

          return iList.join("<br>");
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("ignore", {
          page: "ignore",
          test: test,
          data: await ignoreList(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Name Ban List
    //lets hope this works
    ////////////////////////////////////
    app.get("/nameban", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      let guildGrab = await client.guilds.cache.get(guildid);

      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch all members in db
        //Need to be in db
        ////////////////////////////////////
        function nameBanList() {
          let NBList = [];
          const wordSel = db
            .prepare("SELECT badname FROM badnames WHERE gldid = ?;")
            .all(guildid);

          if (wordSel) {
            if (wordSel[0]) {
              for (let i of wordSel) {
                NBList.push(i.badname);
              }
            }
          }

          return NBList.join("<br>");
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("nameban", {
          page: "nameban",
          test: test,
          data: await nameBanList(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Modarate
    //Mod stuff and stuff
    ////////////////////////////////////
    app.get("/moderate", async (req, res) => {
      if (!req) return res.redirect("https://artemis.rest/re.html");
      if (!req.query) return res.redirect("https://artemis.rest/re.html");
      if (!req.query.guildid)
        return res.redirect("https://artemis.rest/re.html");

      const guildid = req.query.guildid;

      let guildGrab = await client.guilds.cache.get(guildid);

      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      if (guildid) {
        ////////////////////////////////////
        //Login Check
        //Checks stuff
        ////////////////////////////////////
        let authCode = req.cookies.auth;

        async function loggedin() {
          const userResult = await oFetch("https://discord.com/api/users/@me", {
            headers: {
              authorization: `Bearer ${authCode}`,
            },
          });

          datalogin = await userResult.json();

          return datalogin;
        }

        async function loggedguild() {
          const guildResult = await oFetch(
            "https://discord.com/api/users/@me/guilds ",
            {
              headers: {
                authorization: `Bearer ${authCode}`,
              },
            }
          );

          dataguild = await guildResult.json();

          return dataguild;
        }

        const guildData = await loggedguild();
        const loginData = await loggedin();

        let memberGet = await guildGrab.members.cache.get(loginData.id);

        if (
          !memberGet.hasPermission("KICK_MEMBERS") ||
          !memberGet.hasPermission("BAN_MEMBERS")
        )
          return res.redirect("https://artemis.rest/re.html");

        async function loggedIn2(isLogin) {
          if (isLogin.username) {
            let counter = 0;
            let buttons = [];
            let mbuttons = [];

            for (let i of guildData) {
              let gIcon = `https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=1024`;
              let gget = await client.guilds.cache.get(i.id);
              if (gget) {
                let uget = await gget.members.cache.get(isLogin.id);

                if (
                  uget.hasPermission("KICK_MEMBERS") ||
                  uget.hasPermission("BAN_MEMBERS")
                ) {
                  await counter++;

                  if (counter == 1) mbuttons.push("<h2>Moderate</h2>");

                  mbuttons.push(
                    `<button onclick="window.location.href='/moderate?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button><br>`
                  );
                }

                buttons.push(
                  `<button onclick="window.location.href='/leaderboard?guildid=${i.id}'" class="aBoxButton" style="background-image: url('${gIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${i.name}</button>`
                );
              }
            }
            let uIcon = `https://cdn.discordapp.com/avatars/${isLogin.id}/${isLogin.avatar}.png?size=1024`;

            return `<script>document.getElementById("logodiv").innerHTML = "${
              isLogin.username
            }";</script>
          <div class="aBox" style="background-image: url('${uIcon}'); background-repeat: no-repeat; background-position: left; background-size: 50px 50px">${
              isLogin.username
            }
            <div class="dc">
            ${mbuttons.join("")}

            <h2>Leaderboards</h2>
             ${buttons.join("<br>")}
            </div>
          </div>`;
          } else {
            return `<div class="aBox"><a href="/login">Login</a></div>`;
          }
        }

        ////////////////////////////////////
        //Fetch guild info
        //And call databases
        ////////////////////////////////////
        function modStuff() {
          let gChanArray = [];

          let guildChannelCol = guildGrab.channels.cache
            .filter((channel) => channel.type === "text")
            .map((channels) =>
              gChanArray.push(`"#${channels.name}:${channels.id}"`)
            );

          ////////////Channel Settings/////////////
          let cSett = getGuild.get(guildGrab.id);

          let welcomeChans = [];

          gChanArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == cSett.generalChannel) {
              welcomeChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              welcomeChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          let logsChans = [];

          gChanArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == cSett.logsChannel) {
              logsChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              logsChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          let verificationChans = [];

          gChanArray.forEach((C) => {
            if (
              C.replace(/\"/g, "").split(":")[1] == cSett.verificationChannel
            ) {
              verificationChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              verificationChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          let muteChans = [];

          gChanArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == cSett.muteChannel) {
              muteChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              muteChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          let highlightChans = [];

          gChanArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == cSett.highlightChannel) {
              highlightChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              highlightChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          let reactionChans = [];

          gChanArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == cSett.reactionChannel) {
              reactionChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              reactionChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          let streamChans = [];

          gChanArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == cSett.streamChannel) {
              streamChans.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              streamChans.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          ////////////Guild Settings/////////////
          let gSett = getSettings.get(guildGrab.id);

          ////////////Default Role/////////////
          let gRoleArray = [];

          let guildRolesCol = guildGrab.roles.cache.map((roles) => {
            gRoleArray.push(`@${roles.name}:${roles.id}`);
          });

          let defaultRoles = [];

          gRoleArray.forEach((C) => {
            if (C.replace(/\"/g, "").split(":")[1] == gSett.defaultrole) {
              defaultRoles.push(
                `<option value="${
                  C.replace(/\"/g, "").split(":")[1]
                }" selected>${C.replace(/\"/g, "").split(":")[0]}</option><br>`
              );
            } else {
              defaultRoles.push(
                `<option value="${C.replace(/\"/g, "").split(":")[1]}">${
                  C.replace(/\"/g, "").split(":")[0]
                }</option><br>`
              );
            }
          });

          var autoModChecked = "";

          if (gSett.autoMod == "ON") {
            var autoModChecked = "checked";
          }

          var levelingChecked = "";

          if (gSett.leveling == "ON") {
            var levelingChecked = "checked";
          }

          var artChecked = "";

          if (gSett.artemisTalks == "ON") {
            var artChecked = "checked";
          }

          var streamChecked = "";

          if (gSett.streamHere == "ON") {
            var streamChecked = "checked";
          }

          ////////////Logs Settings/////////////
          let lSett = getLogs.get(guildGrab.id);

          var LogmsgupdateChecked = "";

          if (lSett.msgupdate == "ON") {
            var LogmsgupdateChecked = "checked";
          }

          var LogmsgdeleteChecked = "";

          if (lSett.msgdelete == "ON") {
            var LogmsgdeleteChecked = "checked";
          }

          var LogchancreateChecked = "";

          if (lSett.chancreate == "ON") {
            var LogchancreateChecked = "checked";
          }

          var LogchandeleteChecked = "";

          if (lSett.chandelete == "ON") {
            var LogchandeleteChecked = "checked";
          }

          var LogchanupdateChecked = "";

          if (lSett.chanupdate == "ON") {
            var LogchanupdateChecked = "checked";
          }

          var LogreactaddChecked = "";

          if (lSett.reactadd == "ON") {
            var LogreactaddChecked = "checked";
          }

          var LogreactdeleteChecked = "";

          if (lSett.reactdelete == "ON") {
            var LogreactdeleteChecked = "checked";
          }

          var LoginvcreateChecked = "";

          if (lSett.invcreate == "ON") {
            var LoginvcreateChecked = "checked";
          }

          var LoginvdeleteChecked = "";

          if (lSett.invdelete == "ON") {
            var LoginvdeleteChecked = "checked";
          }

          var LoggrolecreateChecked = "";

          if (lSett.grolecreate == "ON") {
            var LoggrolecreateChecked = "checked";
          }

          var LoggroledeleteChecked = "";

          if (lSett.groledelete == "ON") {
            var LoggroledeleteChecked = "checked";
          }

          var LoggroleupdateChecked = "";

          if (lSett.groleupdate == "ON") {
            var LoggroleupdateChecked = "checked";
          }

          var LoggmemaddChecked = "";

          if (lSett.gmemadd == "ON") {
            var LoggmemaddChecked = "checked";
          }

          var LoggmemupdateChecked = "";

          if (lSett.gmemupdate == "ON") {
            var LoggmemupdateChecked = "checked";
          }

          var LoggmemdeleteChecked = "";

          if (lSett.gmemdelete == "ON") {
            var LoggmemdeleteChecked = "checked";
          }

          var LoggbanaddChecked = "";

          if (lSett.gbanadd == "ON") {
            var LoggbanaddChecked = "checked";
          }

          var LoggbanremoveChecked = "";

          if (lSett.gbanremove == "ON") {
            var LoggbanremoveChecked = "checked";
          }

          var LogvoiceupdateChecked = "";

          if (lSett.voiceupdate == "ON") {
            var LogvoiceupdateChecked = "checked";
          }

          ////////////////////////////////////
          //Text to appear on site
          //Looks messy, really isn't
          ////////////////////////////////////
          let modText = `
<div style="padding-top: 40px; text-align: right; width: 100%; height: 100px; background-image: url('https://cdn.discordapp.com/icons/${
            guildGrab.id
          }/${
            guildGrab.icon
          }.png?size=128'); background-repeat: no-repeat; background-position: left;">
  <h2>${guildGrab.name}</h2>
</div>

<form method="POST" action="/moderate?guildid=${guildid}">
  <h2>Prefix</h2>
  <input type="text" style="width: 50px;" autocomplete="off" name="prefix" value="${
    gSett.prefix
  }" /><br>

  <h2>Default Role</h2>
  <select name="defaultrole">
  <option value="NONE">NONE</option>
    ${defaultRoles.join("\n")}
  </select><br>

  <h2>Welcome Message</h2>
  <div class="ui-widget">
    <textarea id="tags" name="welcome" style="width: 420px; height: 300px">${
      gSett.wmessage
    }</textarea>
  </div><br>

  <h2>Auto Moderation</h2>
  <label class="switch">
    <input name="automod" type="checkbox" ${autoModChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Level Gathering</h2>
  <label class="switch">
    <input name="level" type="checkbox" ${levelingChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Thank Points</h2>
  <input type="text" style="width: 50px;" autocomplete="off" name="thank" value="${
    gSett.bonuspoints
  }" /><br>

  <h2>Artemis Replies</h2>
  <label class="switch">
    <input name="replies" type="checkbox" ${artChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Stream Notification @here ping</h2>
  <label class="switch">
    <input name="streamping" type="checkbox" ${streamChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Welcoming Channel</h2>
  <select name="welcomechan">
  <option value="NONE">NONE</option>
    ${welcomeChans.join("\n")}
  </select><br>

  <h2>Logs Channel</h2>
  <select name="logschan">
  <option value="NONE">NONE</option>
    ${logsChans.join("\n")}
  </select><br>

  <h2>Verification Channel</h2>
  <select name="verificationchan">
  <option value="NONE">NONE</option>
    ${verificationChans.join("\n")}
  </select><br>

  <h2>Mute Channel</h2>
  <select name="mutechan">
  <option value="NONE">NONE</option>
    ${muteChans.join("\n")}
  </select><br>

  <h2>Highlight Channel</h2>
  <select name="highlightchan">
  <option value="NONE">NONE</option>
    ${highlightChans.join("\n")}
  </select><br>

  <h2>Reaction Role Channel</h2>
  <select name="reactionchan">
  <option value="NONE">NONE</option>
    ${reactionChans.join("\n")}
  </select><br>

  <h2>Stream Notification Channel</h2>
  <select name="streamchan">
  <option value="NONE">NONE</option>
    ${streamChans.join("\n")}
  </select><br>

  <h2>Logs: Message Update</h2>
  <label class="switch">
    <input name="Logmsgupdate" type="checkbox" ${LogmsgupdateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Message Delete</h2>
  <label class="switch">
    <input name="Logmsgdelete" type="checkbox" ${LogmsgdeleteChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Channel Creation</h2>
  <label class="switch">
    <input name="Logchancreate" type="checkbox" ${LogchancreateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Channel Deletion</h2>
  <label class="switch">
    <input name="Logchandelete" type="checkbox" ${LogchandeleteChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Channel Update</h2>
  <label class="switch">
    <input name="Logchanupdate" type="checkbox" ${LogchanupdateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Reaction Add</h2>
  <label class="switch">
    <input name="Logreactadd" type="checkbox" ${LogreactaddChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Reaction Delete</h2>
  <label class="switch">
    <input name="Logreactdelete" type="checkbox" ${LogreactdeleteChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Invite Creation</h2>
  <label class="switch">
    <input name="Loginvcreate" type="checkbox" ${LoginvcreateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Invite Deletion</h2>
  <label class="switch">
    <input name="Loginvdelete" type="checkbox" ${LoginvdeleteChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Role Creation</h2>
  <label class="switch">
    <input name="Loggrolecreate" type="checkbox" ${LoggrolecreateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Role Deletion</h2>
  <label class="switch">
    <input name="Loggroledelete" type="checkbox" ${LoggroledeleteChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Role Update</h2>
  <label class="switch">
    <input name="Loggroleupdate" type="checkbox" ${LoggroleupdateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Member Join</h2>
  <label class="switch">
    <input name="Loggmemadd" type="checkbox" ${LoggmemaddChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Member Update</h2>
  <label class="switch">
    <input name="Loggmemupdate" type="checkbox" ${LoggmemupdateChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Member Leave</h2>
  <label class="switch">
    <input name="Loggmemdelete" type="checkbox" ${LoggmemdeleteChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Member Ban</h2>
  <label class="switch">
    <input name="Loggbanadd" type="checkbox" ${LoggbanaddChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: Member Un-Ban</h2>
  <label class="switch">
    <input name="Loggbanremove" type="checkbox" ${LoggbanremoveChecked}>
    <span class="slider round"></span>
  </label><br>

  <h2>Logs: VoiceChannel Update</h2>
  <label class="switch">
    <input name="Logvoiceupdate" type="checkbox" ${LogvoiceupdateChecked}>
    <span class="slider round"></span>
  </label><br>

  <br><input class="buttonmod" type="submit" value="💾save" />
</form>
<script>var availableTags = [${gChanArray.join(",")}];</script>`;

          return `${modText}`;
        }

        ////////////////////////////////////
        //Client function
        //Basically gives us access to raw functions
        ////////////////////////////////////
        const test = {
          client: client,
        };

        ////////////////////////////////////
        //Render the final page
        //All functions gets passed trough
        ////////////////////////////////////
        res.render("moderate", {
          page: "moderate",
          test: test,
          data: await modStuff(),
          logged: await loggedIn2(loginData),
        });
      }
    });

    ////////////////////////////////////
    //Redirect to /
    //Basically no error pages
    ////////////////////////////////////
    app.get("*", function (req, res) {
      res.redirect("/");
    });

    ////////////////////////////////////
    //Post forms
    //Let's handle this stuff
    ////////////////////////////////////
    app.post("/moderate", async (req, res) => {
      ////////////////////////////////////
      //Verify info taken in
      //also some error handling
      ////////////////////////////////////
      const userToken = req.cookies.auth;
      if (!userToken) return res.redirect("https://artemis.rest/re.html");

      const guildToken = req.query.guildid;
      if (!guildToken) return res.redirect("https://artemis.rest/re.html");

      let guildGrab = await client.guilds.cache.get(guildToken);
      if (!guildGrab) return res.redirect("https://artemis.rest/re.html");

      ////////////////////////////////////
      //Verify the user
      //Verify the guild
      ////////////////////////////////////
      const userResult = await oFetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      datalogin = await userResult.json();

      let memberGet = await guildGrab.members.cache.get(datalogin.id);

      if (!memberGet) return res.redirect("https://artemis.rest/re.html");

      if (
        !memberGet.hasPermission("KICK_MEMBERS") ||
        !memberGet.hasPermission("BAN_MEMBERS")
      )
        return res.redirect("https://artemis.rest/re.html");

      ////////////////////////////////////
      //Verification passed
      //Let's get down to business
      ////////////////////////////////////
      const newForm = req.body;

      if (newForm) {
        ////////////Call Databases/////////////
        let finSet = await getSettings.get(guildGrab.id);
        let finLog = await getLogs.get(guildGrab.id);
        let finCha = await getGuild.get(guildGrab.id);

        ////////////Main Settings/////////////
        if (await newForm.prefix) {
          finSet.prefix = await newForm.prefix;
        }

        if (await newForm.defaultrole) {
          finSet.defaultrole = await newForm.defaultrole;
        }

        if (await newForm.welcome) {
          const WelcomeText = newForm.welcome.replace(/\r/g, "");
          finSet.wmessage = await WelcomeText;
        }

        if (await newForm.automod) {
          finSet.autoMod = "ON";
        } else {
          finSet.autoMod = "OFF";
        }

        if (await newForm.level) {
          finSet.leveling = "ON";
        } else {
          finSet.leveling = "OFF";
        }

        if (await newForm.thank) {
          finSet.bonuspoints = newForm.thank;
        }

        if (await newForm.replies) {
          finSet.artemisTalks = "ON";
        } else {
          finSet.artemisTalks = "OFF";
        }

        if (await newForm.streamping) {
          finSet.streamHere = "ON";
        } else {
          finSet.streamHere = "OFF";
        }

        ////////////Channel Settings/////////////
        if (await newForm.welcomechan) {
          finCha.generalChannel = await newForm.welcomechan;
        }

        if (await newForm.logschan) {
          finCha.logsChannel = await newForm.logschan;
        }

        if (await newForm.verificationchan) {
          finCha.verificationChannel = await newForm.verificationchan;
        }

        if (await newForm.mutechan) {
          finCha.muteChannel = await newForm.mutechan;
        }

        if (await newForm.highlightchan) {
          finCha.highlightChannel = await newForm.highlightchan;
        }

        if (await newForm.reactionchan) {
          finCha.reactionChannel = await newForm.reactionchan;
        }

        if (await newForm.streamchan) {
          finCha.streamChannel = await newForm.streamchan;
        }

        ////////////Logs Settings/////////////
        if (await newForm.Logmsgupdate) {
          finLog.msgupdate = "ON";
        } else {
          finLog.msgupdate = "OFF";
        }

        if (await newForm.Logmsgdelete) {
          finLog.msgdelete = "ON";
        } else {
          finLog.msgdelete = "OFF";
        }

        if (await newForm.Logchancreate) {
          finLog.chancreate = "ON";
        } else {
          finLog.chancreate = "OFF";
        }

        if (await newForm.Logchandelete) {
          finLog.chandelete = "ON";
        } else {
          finLog.chandelete = "OFF";
        }

        if (await newForm.Logchanupdate) {
          finLog.chanupdate = "ON";
        } else {
          finLog.chanupdate = "OFF";
        }

        if (await newForm.Logreactadd) {
          finLog.reactadd = "ON";
        } else {
          finLog.reactadd = "OFF";
        }

        if (await newForm.Logreactdelete) {
          finLog.reactdelete = "ON";
        } else {
          finLog.reactdelete = "OFF";
        }

        if (await newForm.Loginvcreate) {
          finLog.invcreate = "ON";
        } else {
          finLog.invcreate = "OFF";
        }

        if (await newForm.Loginvdelete) {
          finLog.invdelete = "ON";
        } else {
          finLog.invdelete = "OFF";
        }

        if (await newForm.Loggrolecreate) {
          finLog.grolecreate = "ON";
        } else {
          finLog.grolecreate = "OFF";
        }

        if (await newForm.Loggroleupdate) {
          finLog.groleupdate = "ON";
        } else {
          finLog.groleupdate = "OFF";
        }

        if (await newForm.Loggroledelete) {
          finLog.groledelete = "ON";
        } else {
          finLog.groledelete = "OFF";
        }

        if (await newForm.Loggmemadd) {
          finLog.gmemadd = "ON";
        } else {
          finLog.gmemadd = "OFF";
        }

        if (await newForm.Loggmemupdate) {
          finLog.gmemupdate = "ON";
        } else {
          finLog.gmemupdate = "OFF";
        }

        if (await newForm.Loggmemdelete) {
          finLog.gmemdelete = "ON";
        } else {
          finLog.gmemdelete = "OFF";
        }

        if (await newForm.Loggbanadd) {
          finLog.gbanadd = "ON";
        } else {
          finLog.gbanadd = "OFF";
        }

        if (await newForm.Loggbanremove) {
          finLog.gbanremove = "ON";
        } else {
          finLog.gbanremove = "OFF";
        }

        if (await newForm.Logvoiceupdate) {
          finLog.voiceupdate = "ON";
        } else {
          finLog.voiceupdate = "OFF";
        }

        await setSettings.run(finSet);
        await setGuild.run(finCha);
        await setLogs.run(finLog);
        return res.status(204).redirect("back");
      }

      res.status(204).redirect("back");
    });

    ////////////////////////////////////
    //SSL and such
    //needs proper certificates
    ////////////////////////////////////
    const privateKey = fs.readFileSync(await CONFIG.CONFIG("privkey"), "utf8");
    const certificate = fs.readFileSync(await CONFIG.CONFIG("cert"), "utf8");
    const ca = fs.readFileSync(await CONFIG.CONFIG("chain"), "utf8");

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    ////////////////////////////////////
    //Start sites
    //Both port 80 and 443 are in use
    ////////////////////////////////////
    const httpsServer = https.createServer(credentials, app);
    const httpServer = http.createServer(app);

    httpsServer.listen(443, () => {
      console.log(`HTTPS Server running on port ${httpsServer.address().port}`);
    });

    httpServer.listen(80, () => {
      console.log(`HTTP Server running on port ${httpServer.address().port}`);
    });
  },
};
