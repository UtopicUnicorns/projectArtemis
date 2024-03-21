module.exports =  {
  appMake:  {
    appName: 'chance',
    appDescription: '1/6 chance to get a swift timeout.',
    type: 'chatInput',
    permissions: []
  },
  name: 'chance',
  module: 'fun',
  async execute(msg)  {
    if(!msg || !msg.member || !msg.member.user || !msg.member.user.id) return;
    let attachmentObject = [{ 
      file: './assets/images/revolverBarrel.gif',
      description: 'load',
      filename: 'revolverBarrel.gif' 
    }];
    
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'channelMessage', 
      data: { attachments: attachmentObject }
    })
      .catch((err) => { console.log(err) });
    
    let selNum = Math.floor(Math.random() * 6) + 1;
    let messageSender = 'You survived this round.';
    
    setTimeout(() => {
      if(selNum == 6) {
        let timeObject = new Date(); 
        timeObject = new Date(timeObject.getTime() + 1000 * 30);
        
        messageSender = 'Oh no, that minion is dead.';
        
        guild.editMember({ 
          guild: msg.guild_id,
          user: msg.member.user.id,
          timeOut: timeObject.toISOString() 
        }).catch((err) => {});
        
        interaction.createFollowupResponse({ 
          token: msg.token,
          content: `<@${msg.member.user.id}>, ${messageSender}`
        })
          .catch((err) => console.log(err));
			}
			
      interaction.deleteOriginalResponse({ token: msg.token }); 
    }, 5000);
  },
};
