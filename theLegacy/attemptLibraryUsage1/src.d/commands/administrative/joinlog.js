module.exports =  {
  appMake:  {
    appName: 'joinlog',
    appDescription: 'View your guild\s joinlog, reference sheet for raidban',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'amount',
      commandDescription: 'How many pulls from the joinlog?',
      commandType: 4,
      commandRequired: true
    },    
    {
      commandName: 'id',
      commandDescription: 'Just list of ID\'s?',
      commandType: 5,
      commandRequired: false 
    }]
  },
  name: 'joinlog',
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
