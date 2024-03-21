module.exports =  {
  appMake:  {
    appName: 'makecommand',
    appDescription: 'Make a custom command',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'trigger',
      commandDescription: 'What word should trigger this command?',
      commandType: 3,
      commandRequired: true
    },    
    {
      commandName: 'position',
      commandDescription: 'In what position does the trigger need to be?',
      commandType: 3,
      commandRequired: true,
      commandChoices: [ 
        {
          name: 'start', 
          value: 'start'
        },
        {
          name: 'end', 
          value: 'end'
        },
        {
          name: 'anywhere', 
          value: 'anywhere'
        }
      ]
    },    
    {
      commandName: 'response',
      commandDescription: 'What will the trigger say in response?',
      commandType: 3,
      commandRequired: true
    },    
    {
      commandName: 'limiter',
      commandDescription: 'What role should be able to use this command? (Max: 1)',
      commandType: 8,
      commandRequired: false
    },    
    {
      commandName: 'action',
      commandDescription: 'What action to take? First mentioned in message with trigger is affected.',
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
        }
      ]
    }
    ]
  },
  name: 'makecommand',
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
