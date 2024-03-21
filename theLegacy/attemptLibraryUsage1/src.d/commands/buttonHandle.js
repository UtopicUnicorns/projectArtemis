//Await function
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

module.exports = {
  //Execute ANY function
  async execute(data, sql) {
    try {
      //Safe very safe way of executing
      eval(`this.${data.data.custom_id.split(':')[0]}`)(data, sql); 
    } catch(e)  { 
      //Not an error persee, but rather a function to execute if command not found
      this.suckOnThis(data); 
    } 
  },
  
  //No function found
  async suckOnThis(data)  {
    return interaction.create({
      id: data.id, 
      token: data.token, 
      type: 'channelMessage', 
      data: { 
        content: 'Button has no function(yet).', 
        visibleForAll: true 
      } 
    })
      .catch((err) => console.log(err));
  },
  
  //Support ticket completion
  async ticketComplete(data) {
    //Get channel button was used in
    channel.chanGet({ channel: data.channel_id })
      .then((chanGot) => {
        //Change ticket
        channel.threadEdit({ 
          channel: data.channel_id,
          name: `[solved]${chanGot.name}`,
          archived: true,
          locked: true
        });
      });
    
    //Notify of closure
    return interaction.create({
      id: data.id, 
      token: data.token, 
      type: 'channelMessage', 
      data: { content: 'Post was locked.' } 
    });
  },
  
  //Welcome a new user
  async welcomedUser(data) {
    let pngCollection = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.gif'];
    let selectAPng = pngCollection[~~(Math.random() * pngCollection.length)];
    
    let attachmentObject = [{ 
      file: `./assets/images/${selectAPng}`,
      description: 'welcome',
      filename: `${selectAPng}`
    }];
    
    //Send hello message
    return interaction.create({
      id: data.id,
      token: data.token, 
      type: 'channelMessage', 
      data: { content: `<@${data.member.user.id}> says hello!`, attachments: attachmentObject }
    }).catch((err)=>{console.log('');});
  },
  
  //Add streamer
  async streamerListAdd(data, sql) {
    //Initiate delay
    let awaitQuery = defer();
    
    //Empty var
    let userExists;
    
    //Process name
    const userName = data.data.custom_id.split(':')[1];
    
    //Create connection to sql
    const newConn = sql.sqlConnectOnce();
    
    //Execute query
    sql.sqlQueryOnce(newConn, `USE g${data.guild_id};`).then((returned) => {
      //Return error
      if(returned == 'err') {
        userExists = '!!ERROR!!';
        return awaitQuery.resolve(true);
      }
      
      //Add streamer to database and pass back
      if(returned !== 'err') {
        sql.sqlQueryOnce(newConn, `INSERT INTO Streamers (id, value) VALUES ('${userName}', 'false')`)
          .then((val) =>  {
            if(val[0]) userExists = val;        
            return awaitQuery.resolve(true);
          });
      }
    });
    
    //Wait for query to finish
    await awaitQuery;
    
    //Close connection
    newConn.end(function(){});
    
    //If error
    if(userExists == '!!ERROR!!') {
      //User does not exist, or error.
      return interaction.create({
        id: data.id, 
        token: data.token, 
        type: 'channelMessage', 
        data: { content: 'Something internally went wrong.', 
                visibleForAll: true  } 
      });
    }
    
    //Succesfull query, added streamer
    return interaction.create({
      id: data.id, 
      token: data.token, 
      type: 'channelMessage', 
      data: { content: `Added \`${userName}\` to the streamers list!`,
              visibleForAll: true } 
    });
  },
  
  //User clicked welcome button
  async readmeUser(data, sql) {
    //Collect hi
    let hiMsg;
    
    //Connect to database
    let newConn = sql.sqlConnectOnce();
    let fetchGuildData = await sql.sqlQueryOnce(newConn, `USE g${data.guild_id};`);
    if(fetchGuildData === 'err') return newConn.end(function(){});
    
    //Grab hi msg
    let returnedHiMsg = await sql.sqlQueryOnce(newConn, `SELECT value FROM Settings WHERE id = 'hiMsgSettings';`);
    if(returnedHiMsg[0].value !== 'NONE') hiMsg = returnedHiMsg[0].value;
    
    //Close database connection
    await newConn.end(function(){});
    
    //Return welcome
    if(hiMsg) {
      return interaction.create({
        id: data.id, 
        token: data.token, 
        type: 'channelMessage', 
        data: { content: `${hiMsg.slice(0,2000)}`, 
                visibleForAll: true  } 
      });
    }
  },
  
  //Remove streamer
  async streamerListDel(data, sql) {
    //Add delay
    let awaitQuery = defer();
    
    //Process username
    const userName = data.data.custom_id.split(':')[1];
    
    //Create connection to sql
    const newConn = sql.sqlConnectOnce();
    
    //Execute query
    sql.sqlQueryOnce(newConn, `USE g${data.guild_id};`).then((returned) => {
      //Return error
      if(returned == 'err') {
        userExists = '!!ERROR!!';
        return awaitQuery.resolve(true);
      }
      
      //If no error
      if(returned !== 'err') {
        //Remove streamer
        sql.sqlQueryOnce(newConn, `DELETE FROM Streamers WHERE id = '${userName}';`)
          .then((val) =>  {
            if(val[0]) userExists = val;        
            return awaitQuery.resolve(true);
          });
      }
    });
    
    //Await query
    await awaitQuery;
    
    //Kill connection
    newConn.end(function(){});
    
    //If error
    if(userExists == '!!ERROR!!') {
      //Something went wrong
      return interaction.create({
        id: data.id, 
        token: data.token, 
        type: 'channelMessage', 
        data: { content: 'Something internally went wrong.', 
                visibleForAll: true  } 
      });
    }
    
    //Succeded deleting streamer
    return interaction.create({
      id: data.id, 
      token: data.token, 
      type: 'channelMessage', 
      data: { content: `Removed \`${userName}\` from the streamers list!`,
              visibleForAll: true } 
    });
  },
  
  //Check if streamer exists/online
  async streamerStatus(data) {
    //Get temporary API code
    let code;
    
    //Grab code from API
    function getCode() {
      //Use raw fly function to grab info
      return fly.send(`client_id=${configData.twitchId}&client_secret=${configData.twitchKey}&grant_type=client_credentials`, `/oauth2/token`, 'POST', 'id.twitch.tv', 443, { 'Content-Type': 'application/x-www-form-urlencoded'})
        .then((val) => code = val.access_token)
        .catch((err)=>console.log(err));
    }
    
    //Process the user
    function getUser(userName) {
      //Use raw fly to get user data
      return fly.send(`client_id=${configData.twitchId}&client_secret=${configData.twitchKey}&grant_type=client_credentials`, `/helix/streams?login=${userName}&user_login=${userName}`, 'GET', 'api.twitch.tv', 443, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${code}`, 'Client-Id': `${configData.twitchId}`})
        .catch((err)=>console.log(err));
    }
    
    //If there is a code, validate it
    if(code) await valCode();
    
    //If no code, get one
    if(!code) await getCode();
    
    //Grab user info
    let userGot = await getUser(data.data.custom_id.split(':')[1]);
    
    //If user is online
    if(userGot.data.length !== 0) {
      //Add data about stream to embed
      let embedObject = new embed();
        if(userGot.data[0].title) embedObject.field('Title:', userGot.data[0].title);
        if(userGot.data[0].game_name) embedObject.field('Game:', userGot.data[0].game_name);
        if(userGot.data[0].title) embedObject.field('Viewers:', userGot.data[0].viewer_count);
        embedObject.color('00FF00');
        if(userGot.data[0].title) embedObject.url(`https://twitch.tv/${userGot.data[0].user_login}`);
        embedObject.author(userGot.data[0].user_name, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Twitch_logo_2019.svg/320px-Twitch_logo_2019.svg.png', `https://twitch.tv/${userGot.data[0].user_login}`);
        embedObject.thumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Twitch_logo_2019.svg/320px-Twitch_logo_2019.svg.png');
        embedObject.image(userGot.data[0].thumbnail_url.replace('{width}', '1240').replace('{height}', '720'));
        embedObject.footer(`Went live at`, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Twitch_logo_2019.svg/320px-Twitch_logo_2019.svg.png');
        embedObject.timestamp(userGot.data[0].started_at);
      
      //Send information about stream
      return interaction.create({
        id: data.id, 
        token: data.token, 
        type: 'channelMessage', 
        data: { 
          embeds: embedObject.output,
          visibleForAll: true 
        } 
      });
    
    //If user is not online
    } else {
      //Notify user
      return interaction.create({
        id: data.id, 
        token: data.token, 
        type: 'channelMessage', 
        data: { 
          content: `**${data.data.custom_id.split(':')[1]}** is not online.`, 
          visibleForAll: true 
        } 
      })
        .catch((err) => console.log(err));
    }
  }
};
