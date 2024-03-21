module.exports =  {
  appMake:  {
    appName: 'flip',
    appDescription: 'Flip a coin',
    type: 'chatInput',
    permissions: [],
    build: [{ 
      commandName: 'pick',
      commandDescription: 'Heads or Tails?',
      commandType: 3,
      commandRequired: true,
      commandChoices: [ 
        {
          name: 'heads', 
          value: 'heads'
        },
        {
          name: 'tails', 
          value: 'tails'
        }
      ] 
    }]
  },
  name: 'flip',
  module: 'fun',
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
