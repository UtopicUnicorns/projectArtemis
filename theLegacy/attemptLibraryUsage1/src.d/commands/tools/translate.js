module.exports =  {
  appMake:  {
    appName: 'translate',
    type: 'message',
    permissions: []  
  },
  name: 'translate',
  module: 'tools',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    try {
      let messageCurrent = msg.data.resolved.messages[msg.data.target_id].content;
      let sendThis = JSON.stringify({
        q: messageCurrent,
        source: "auto",
        target: "en",
      });
      fly.send(sendThis, `/translate`, 'POST', 'libretranslate.de', 443, { 'Content-Type': 'application/json' })
        .then((val) =>  {
          return interaction.createFollowupResponse({ 
            token: msg.token,
            content: val.translatedText.slice(0, 2000) 
          })
            .catch((err) => console.log(err));
        });
    } catch(err)  {
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: 'Error occured.' 
      })
        .catch((err) => console.log(err));
    }
  },
};
