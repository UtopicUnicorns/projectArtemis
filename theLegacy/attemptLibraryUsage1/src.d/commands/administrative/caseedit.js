module.exports =  {
  appMake:  {
    appName: 'caseedit',
    appDescription: 'Edit a user case.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'num',
      commandDescription: 'What case to edit?',
      commandType: 4,
      commandRequired: true
    },    
    {
      commandName: 'reason',
      commandDescription: 'Change the specified reason for this case',
      commandType: 3,
      commandRequired: false 
    },    
    {
      commandName: 'flag',
      commandDescription: 'Edit flag for this case',
      commandType: 3,
      commandRequired: false,
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
          name: 'invalidate', 
          value: 'invalidate'
        },
        {
          name: 'note', 
          value: 'note'
        }
      ]
    }]
  },
  name: 'caseedit',
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
