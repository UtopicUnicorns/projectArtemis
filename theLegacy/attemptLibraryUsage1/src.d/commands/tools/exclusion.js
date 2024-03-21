module.exports =  {
  appMake:  {
    appName: 'exclusion',
    appDescription: 'Exclude yourself from the current server',
    type: 'chatInput',
    permissions: [],
    build: [{
        commandName: 'timeout',
        commandDescription: 'How long do you need to get excluded?',
        commandType: 3,
        commandRequired: true,
        commandChoices: [ 
          {
            name: '1 hour', 
            value: '1hour'
          },
          {
            name: '6 hours', 
            value: '6hours'
          },
          {
            name: '1 day', 
            value: '1day'
          },
          {
            name: '1 week', 
            value: '1week'
          }
        ]
      },
      {
        commandName: 'check',
        commandDescription: 'Are you sure?',
        commandType: 5,
        commandRequired: true 
      },
      {
        commandName: 'really',
        commandDescription: 'Are you ABSOLUTELY sure?',
        commandType: 5,
        commandRequired: true 
      }]
  },
  name: 'exclusion',
  module: 'tools',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request` }
    })
      .catch((err) => { console.log(err) });
    let timeoutMe, checkMe, reallyMe, timerFinal;
    if(msg.data.options.find(item => item.name === 'timeout')) timeoutMe = msg.data.options.find(item => item.name === 'timeout').value;
    if(msg.data.options.find(item => item.name === 'check')) checkMe = msg.data.options.find(item => item.name === 'check').value;
    if(msg.data.options.find(item => item.name === 'really')) reallyMe = msg.data.options.find(item => item.name === 'really').value;
  
    if(!checkMe) {
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: 'You were not sure about the exclusion, this action is now canceled.' 
      })
        .catch((err) => console.log(err));
    }
    if(!reallyMe) {
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: 'You were not sure about the exclusion, this action is now canceled.' 
      })
        .catch((err) => console.log(err));
    }
    
    if(timeoutMe == '1hour') timerFinal = 3600000;
    if(timeoutMe == '6hours') timerFinal = 21600000;
    if(timeoutMe == '1day') timerFinal = 86400000;
    if(timeoutMe == '1week') timerFinal = 604800000;
    let timeObject = new Date(); 
    timeObject = new Date(timeObject.getTime() + timerFinal);
    
    guild.editMember({ 
      guild: msg.guild_id,
      user: msg.member.user.id,
      timeOut: timeObject.toISOString() 
    }).catch((err) => {});
    
    return interaction.createFollowupResponse({ 
      token: msg.token,
      content: `Your exclusion has been started and expires: <t:${Math.floor(timeObject / 1000)}:R>` 
    })
      .catch((err) => console.log(err));
  },
};
