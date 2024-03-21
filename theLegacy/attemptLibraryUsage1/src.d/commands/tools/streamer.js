function defer() {
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;  
  return promise;
}
let code;
module.exports =  {
  appMake:  {
    appName: 'streamer',
    appDescription: 'Check if streamer is online.',
    type: 'chatInput',
    permissions: [],
    build:  [{ 
      commandName: 'streamername',
      commandDescription: 'Input streamer name.',
      commandType: 3,
      commandRequired: true
    }]
  },
  name: 'streamer',
  module: 'tools',
  async execute(msg, sql)  {
    let awaitQuery = defer();
    const newConn = sql.sqlConnectOnce();
      sql.sqlQueryOnce(newConn, `USE g${msg.guild_id};`)
        .then((qBack) => {
          if(qBack == 'err') {
            return;
          } else {
            awaitQuery.resolve(true);
          }
        });
    
    await awaitQuery;
    let waitForSql = defer();
    let userExists = false;
    sql.sqlQueryOnce(newConn, `SELECT * FROM Streamers WHERE id = '${msg.data.options[0].value}';`)
      .then((val) =>  {
        if(val[0]) userExists = val;        
        return waitForSql.resolve(true);
      });
    await waitForSql;
    
    let userPerms = msg.member.permissions;
    let guildPerms = 1 << 5;
    let permsGot = userPerms & guildPerms;
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    try {
      const userName = msg.data.options[0].value.toLowerCase();
      function valCode()  {
        return fly.send(``, `/oauth2/validate`, 'GET', 'id.twitch.tv', 443, { 'Content-Type': 'application/json', 'Authorization': `OAuth ${code}`})
          .then((val) => { if(val.status === 401) this.getCode(); })
          .catch((err)=>console.log(err));
      }
      function getCode()  {
        return fly.send(`client_id=${configData.twitchId}&client_secret=${configData.twitchKey}&grant_type=client_credentials`, `/oauth2/token`, 'POST', 'id.twitch.tv', 443, { 'Content-Type': 'application/x-www-form-urlencoded'})
          .then((val) => code = val.access_token)
          .catch((err)=>console.log(err));
      }
      function getUser(userName)  {
        return fly.send(`client_id=${configData.twitchId}&client_secret=${configData.twitchKey}&grant_type=client_credentials`, `/helix/users?login=${userName}`, 'GET', 'api.twitch.tv', 443, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${code}`, 'Client-Id': `${configData.twitchId}`})
          .catch((err)=>console.log(err));
      }
      if(code) await valCode();
      if(!code) await getCode();
      let userGot = await getUser(userName);
      if(!userGot.data[0]) {
        newConn.end(function(){});
        return interaction.createFollowupResponse({  
          token: msg.token,
          content: 'User does not exist.' 
        })
          .catch((err) => console.log(err));
      }
      let embedObject = new embed()
        .field('Total Views:', userGot.data[0].view_count.toLocaleString(), true)
        .description(`${userGot.data[0].description.slice(0,4090)}`)
        .color('00FF00')
        .url(`https://twitch.tv/${userGot.data[0].login}`)
        .author(userGot.data[0].display_name, userGot.data[0].profile_image_url, `https://twitch.tv/${userGot.data[0].login}`)
        .thumbnail(userGot.data[0].profile_image_url)
        .image(userGot.data[0].offline_image_url)
        .footer(`On Twitch since`, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Twitch_logo_2019.svg/320px-Twitch_logo_2019.svg.png')
        .timestamp(userGot.data[0].created_at)
        .output;
      let componentObject2 = new component()
        .button({
          label: 'Check if streaming', 
          custom_id: `streamerStatus:${userGot.data[0].login}`, 
          style: 3,
          emoji:  { 
            name: '🔎' 
          } 
        });
      if(permsGot) {
        if(!userExists) {
          componentObject2.button({
            label: 'Add to streamer list', 
            custom_id: `streamerListAdd:${userGot.data[0].login}`, 
            emoji:  { 
              name: '➕' 
            },
            style: 1 
          });
        }
        
        if(userExists) {
          componentObject2.button({
            label: 'Remove from streamer list', 
            custom_id: `streamerListDel:${userGot.data[0].login}`, 
            emoji:  { 
              name: '➖' 
            },
            style: 4 
          });
        }
      }
      newConn.end(function(){});
      return interaction.createFollowupResponse({ 
        token: msg.token,
        embeds: embedObject,
        components: componentObject2.output, 
      })
        .catch((err) => console.log(err));         
    } catch(err) {
      newConn.end(function(){});
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: 'Something went wrong.' 
      })
        .catch((err) => console.log(err));
    }
  },
};
