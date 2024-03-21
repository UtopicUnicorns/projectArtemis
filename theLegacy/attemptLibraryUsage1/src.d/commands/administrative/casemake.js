module.exports =  {
  appMake:  {
    appName: 'casemake',
    appDescription: 'Make a user case.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'user',
      commandDescription: 'For who is this case?',
      commandType: 6,
      commandRequired: true
    },    
    {
      commandName: 'reason',
      commandDescription: 'Input your reason for this action',
      commandType: 3,
      commandRequired: true 
    },    
    {
      commandName: 'flag',
      commandDescription: 'Select case category',
      commandType: 3,
      commandRequired: true,
      commandChoices: [ 
        {
          name: 'kick', 
          value: 'kick'
        },
        {
          name: 'timeout', 
          value: 'timeout'
        },
        {
          name: 'ban', 
          value: 'ban'
        },
        {
          name: 'note', 
          value: 'note'
        }
      ]
    }]
  },
  name: 'casemake',
  module: 'administrative',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
   
   return interaction.createFollowupResponse({ 
      token: msg.token,
      content: 'yes?' 
    })
      .catch((err) => console.log(err));
  },
};
