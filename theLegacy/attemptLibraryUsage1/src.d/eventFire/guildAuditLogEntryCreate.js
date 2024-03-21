module.exports = {
  async execute( eventState, msg, conMan ) {
    //fetch chan
    let chanNum;
    
    //Get user
    async function userGrab(userId) {
      return await user.get({ user: userId });
    }
    
    //Get channel
    async function channelGrab(chanId) {
      return await channel.chanGet({ channel: chanId });
    }
    
    //Process/parse
    async function finalizeProcess(msgIn) {
      if(msgIn.action === 'nick') {
        let targetUser = await userGrab(msgIn.msg.target_id);
        let performingUser = await userGrab(msgIn.msg.user_id);
        
        if(msgIn.msg.changes[0].old_value && msgIn.msg.changes[0].new_value) return { head: { t: targetUser, p: performingUser }, event: 'nickNameChangeEventLog', msg: `## 🏷️Nickname event:\n### \`${performingUser.username} (${performingUser.id})\` has changed \`${targetUser.username}'s (${targetUser.id})\` nickname\n- from: \`${msgIn.msg.changes[0].old_value}\`\n- to: \`${msgIn.msg.changes[0].new_value}\`` };
        if(!msgIn.msg.changes[0].old_value && msgIn.msg.changes[0].new_value) return { head: { t: targetUser, p: performingUser }, event: 'nickNameChangeEventLog', msg: `## 🏷️Nickname event:\n### \`${performingUser.username} (${performingUser.id})\` has given \`${targetUser.username} (${targetUser.id})\` a nickname\n- to: \`${msgIn.msg.changes[0].new_value}\`` };
        if(msgIn.msg.changes[0].old_value && !msgIn.msg.changes[0].new_value) return { head: { t: targetUser, p: performingUser }, event: 'nickNameChangeEventLog', msg: `## 🏷️Nickname event:\n### \`${performingUser.username} (${performingUser.id})\` has removed \`${targetUser.username}'s (${targetUser.id})\` nickname\n- was: \`${msgIn.msg.changes[0].old_value}\`` };
      }
      
      if(msgIn.action === 'communication_disabled_until') {
        let targetUser = await userGrab(msgIn.msg.target_id);
        let performingUser = await userGrab(msgIn.msg.user_id);
        
        if(msgIn.msg.changes[0].old_value) return { head: { t: targetUser, p: performingUser }, event: 'timeOutEventLog', msg: `## 🔇Timeout event:\n### \`${performingUser.username} (${performingUser.id})\` has removed \`${targetUser.username}'s' (${targetUser.id})\` time-out` };
        if(msgIn.msg.changes[0].new_value) return { head: { t: targetUser, p: performingUser }, event: 'timeOutEventLog', msg: `## 🔇Timeout event:\n### \`${performingUser.username} (${performingUser.id})\` has given \`${targetUser.username} (${targetUser.id})\` a time-out\n- exires <t:${Math.floor(new Date(msgIn.msg.changes[0].new_value).getTime() / 1000)}:R>` };
      }
     
      if(msgIn.action === 'unId') {
        if(msgIn.msg.action_type === 72) {
          let targetChan = await channelGrab(msgIn.msg.options.channel_id);
          let performingUser = await userGrab(msgIn.msg.user_id);
          
          return { head: { t: targetChan, p: performingUser }, event: 'messageDeleteEventLog', msg: `## ♻️Message deletion event:\n### \`${performingUser.username} (${performingUser.id})\` removed a message (${msgIn.msg.target_id}) in \`${targetChan.name} (${targetChan.id})\`` };
        }
        
        if(msgIn.msg.action_type === 20) {
          let targetUser = await userGrab(msgIn.msg.target_id);
          let performingUser = await userGrab(msgIn.msg.user_id);
          
          return { head: { t: targetUser, p: performingUser }, event: 'kickEventLog', msg: `## 🏌️‍Kick event:\n### \`${performingUser.username} (${performingUser.id})\` kicked out \`${targetUser.username} (${targetUser.id})\`` };
        }
        
        if(msgIn.msg.action_type === 22) {
          let targetUser = await userGrab(msgIn.msg.target_id);
          let performingUser = await userGrab(msgIn.msg.user_id);
          
          return { head: { t: targetUser, p: performingUser }, event: 'banEventLog', msg: `## 🚽Ban event:\n### \`${performingUser.username} (${performingUser.id})\` banned \`${targetUser.username} (${targetUser.id})\`` };
        }
        
        if(msgIn.msg.action_type === 23) {
          let targetUser = await userGrab(msgIn.msg.target_id);
          let performingUser = await userGrab(msgIn.msg.user_id);
          
          return { head: { t: targetUser, p: performingUser }, event: 'banEventLog', msg: `## 🔓Un-Ban event:\n### \`${performingUser.username} (${performingUser.id})\` un-banned \`${targetUser.username} (${targetUser.id})\`` };
        }
      }
    }
    
    //Identify action codes
    let actionCode = 'unId';
    if(msg.changes) actionCode = msg.changes[0].key;
    let sendNudes = await finalizeProcess({ action: actionCode, msg });
    if(!sendNudes) return;
    
    //Connect to database
    let newConn = conMan.sqlConnectOnce();
    let fetchGuildData = await conMan.sqlQueryOnce(newConn, `USE g${msg.guild_id};`);
    if(fetchGuildData === 'err') return newConn.end(function(){});
    
    //Grab join logger
    let returnedLogChan = await conMan.sqlQueryOnce(newConn, `SELECT value FROM Logs WHERE id = '${sendNudes.event}';`);
    if(returnedLogChan[0] && returnedLogChan[0].value !== 'NONE') chanNum = returnedLogChan[0].value;
    newConn.end(function(){});
    
    //If channel
    if(chanNum) {
      channel.msgSend({ 
        content: sendNudes.msg, 
        channel: chanNum 
      })
        .catch((err) => console.log(err));
    }
  },
};

