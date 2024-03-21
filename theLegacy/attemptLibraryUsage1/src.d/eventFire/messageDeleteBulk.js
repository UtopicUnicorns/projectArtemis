module.exports = {
  async execute( eventState, msg, conMan ) {
    // logger fetch
    let logChan;
    
    //Get channel
    async function channelGrab(chanId) {
      return await channel.chanGet({ channel: chanId });
    }
    
    //Connect to database
    let newConn = conMan.sqlConnectOnce();
    let fetchGuildData = await conMan.sqlQueryOnce(newConn, `USE g${msg.guild_id};`);
    if(fetchGuildData === 'err') return newConn.end(function(){});
    
    //Grab leave logger
    let returnedLogChan = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Logs WHERE id = 'messageDeleteEventLog';`);
    if(returnedLogChan[0].value !== 'NONE') logChan = returnedLogChan[0].value;
    
    //if leave log
    if(logChan) {
      let targetChan = await channelGrab(msg.channel_id);
      // \n### Messages deleted: \`${msg.ids.length}\`
      channel.msgSend({ 
        content: `## ♻️Bulk message deletion event:\n### Channel: \`${targetChan.name} (${targetChan.id})\` `,
        channel: logChan
      })
        .catch((err) => console.log(err));
    }
    newConn.end(function(){});
  },
};
