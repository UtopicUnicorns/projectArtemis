module.exports =  {
  appMake:  {
    appName: 'caseview',
    appDescription: 'View a user case.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'num',
      commandDescription: 'What case to view?',
      commandType: 4,
      commandRequired: true
    }]
  },
  name: 'caseview',
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
