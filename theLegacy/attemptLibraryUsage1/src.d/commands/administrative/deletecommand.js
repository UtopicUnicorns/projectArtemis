module.exports =  {
  appMake:  {
    appName: 'deletecommand',
    appDescription: 'Delete a custom command',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'trigger',
      commandDescription: 'What command do you want to remove? use the trigger word.',
      commandType: 3,
      commandRequired: true
    }]
  },
  name: 'deletecommand',
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
