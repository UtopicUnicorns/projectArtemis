module.exports =  {
  appMake:  {
    appName: 'steal',
    appDescription: 'Create a new emoji based on an URL or emoji you provide.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'emote',
      commandDescription: 'URL or Emoji',
      commandType: 3,
      commandRequired: true
    },    
    {
      commandName: 'name',
      commandDescription: 'Name for emoji',
      commandType: 3,
      commandRequired: true 
    }]
  },
  name: 'steal',
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
