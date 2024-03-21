module.exports =  {
  appMake:  {
    appName: 'raidban',
    appDescription: 'Ban X amount of users from the joinlog.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'amount',
      commandDescription: 'Specify how many users from the joinlog have to get banned.',
      commandType: 4,
      commandRequired: true
    }]
  },
  name: 'raidban',
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
