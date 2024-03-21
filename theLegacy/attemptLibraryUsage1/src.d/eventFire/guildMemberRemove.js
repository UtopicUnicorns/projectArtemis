module.exports = {
  async execute( eventState, msg, conMan ) {
    // logger fetch
    let logChan;
    
    //Connect to database
    let newConn = conMan.sqlConnectOnce();
    let fetchGuildData = await conMan.sqlQueryOnce(newConn, `USE g${msg.guild_id};`);
    if(fetchGuildData === 'err') return newConn.end(function(){});
    
    //Grab leave logger
    let returnedLogChan = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Logs WHERE id = 'leaveEventLog';`);
    if(returnedLogChan[0].value !== 'NONE') logChan = returnedLogChan[0].value;
    
    //if leave log
    if(logChan) {
      channel.msgSend({ 
        content: `## 📤Member leave event:\n### \`${msg.user.username} (${msg.user.id})\`\n<https://cdn.discordapp.com/avatars/${msg.user.id}/${msg.user.avatar}.png?size=1024>`,
        channel: logChan
      })
        .catch((err) => console.log(err));
    }
  },
};
