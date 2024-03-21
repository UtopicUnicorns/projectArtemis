module.exports = {
  async execute( eventState, msg, conMan ) {
    //Collect data
    let veriChan, veriMeth, hiMsg, hiChan, logChan;
    
    //Connect to database
    let newConn = conMan.sqlConnectOnce();
    let fetchGuildData = await conMan.sqlQueryOnce(newConn, `USE g${msg.guild_id};`);
    if(fetchGuildData === 'err') return newConn.end(function(){});
    
    //Insert user into joinlog
    await conMan.sqlQueryOnce(newConn, `REPLACE INTO joinLog (id, username, discriminator, avatar, timeStamp) VALUES ('${msg.user.id}', '${msg.user.username}', '${msg.user.discriminator}', '${msg.user.avatar}', '${msg.joined_at}');`);
    
    //Grab verify channel
    let returnedVeriChan = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Settings WHERE id = 'verificationChannelSettings';`);
    if(returnedVeriChan[0].value !== 'NONE') veriChan = returnedVeriChan[0].value;
    
    //Grab verification method
    let returnedVeriMeth = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Settings WHERE id = 'verificationMethodSettings';`);
    if(returnedVeriMeth[0].value !== 'NONE') veriMeth = returnedVeriMeth[0].value;
    
    //Grab join logger
    let returnedLogChan = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Logs WHERE id = 'joinEventLog';`);
    if(returnedLogChan[0].value !== 'NONE') logChan = returnedLogChan[0].value;
    
    //Grab hi chan
    let returnedHiChan = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Settings WHERE id = 'hiChanSettings';`);
    if(returnedHiChan[0].value !== 'NONE') hiChan = returnedHiChan[0].value;
    
    //Grab hi msg
    let returnedHiMsg = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Settings WHERE id = 'hiMsgSettings';`);
    if(returnedHiMsg[0].value !== 'NONE') hiMsg = returnedHiMsg[0].value;
    
    //Close database connection
    await newConn.end(function(){});
    
    //If welcome logger
    if(logChan) {
      channel.msgSend({ 
        content: `## 📥Member join event:\n### \`${msg.user.username} (${msg.user.id})\`\n<https://cdn.discordapp.com/avatars/${msg.user.id}/${msg.user.avatar}.png?size=1024>`,
        channel: logChan
      })
        .catch((err) => console.log(err));
    }
    
    //Welcoming button
    let componentObject = new component()
      .button({
        label: 'Welcome!', 
        custom_id: `welcomedUser:${msg.user.id}`, 
        style: 3, 
        emoji:  {
          name: 'hi',
          id: '1105122572250656918'
        } 
      });
    
    //If hi message, prompt button
    if(hiMsg) {
      componentObject.button({
        label: 'Read-Me!', 
        custom_id: `readmeUser:${msg.user.id}`, 
        style: 1, 
        emoji:  {
          name: '🔍'
        } 
      });
    }
    
    //If hi channel
    if(hiChan) {
      channel.msgSend({ 
        content: `${msg.user.username} (${msg.user.id}) just joined our server, say hello.`,
        components: componentObject.output,
        channel: hiChan
      })
        .catch((err) => console.log(err));
    }
    
    //Process join
    //console.log(msg.user, msg.joined_at,  ' member joined 📥');
  },
};
