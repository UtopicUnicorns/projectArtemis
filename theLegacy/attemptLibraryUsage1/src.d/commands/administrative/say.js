module.exports =  {
  appMake:  {
    appName: 'say',
    appDescription: 'Make the bot say something in selected channel.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'message',
      commandDescription: 'The message you want to send.',
      commandType: 3,
      commandRequired: true
    },    
    {
      commandName: 'channel',
      commandDescription: 'Channel to send to.',
      commandType: 7,
      commandRequired: true 
    },
    {
      commandName: 'file',
      commandDescription: 'Attach a file.',
      commandType: 11,
      commandRequired: false 
    }]
  },
  name: 'say',
  module: 'administrative',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
      
    let sendMsg = '', sendChan, sendFile;
    
    if(msg.data.options.find(item => item.name === 'message')) sendMsg = msg.data.options.find(item => item.name === 'message').value;
    if(msg.data.options.find(item => item.name === 'channel')) sendChan = msg.data.options.find(item => item.name === 'channel').value;
    if(msg.data.options.find(item => item.name === 'file')) sendFile = msg.data.options.find(item => item.name === 'file').value;
   
    if(sendFile) {
      sendFile = msg.data.resolved.attachments[sendFile].url;
      sendMsg = `${sendMsg}\n${sendFile}`;
    }
   
    channel.msgSend({
      content: sendMsg,
      channel: sendChan
    });	
  
    return interaction.createFollowupResponse({ 
      token: msg.token,
      content: 'sending' 
    })
      .catch((err) => console.log(err));
  },
};
