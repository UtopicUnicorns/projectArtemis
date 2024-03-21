function defer() { var res, rej; var promise = new Promise((resolve, reject) => { res = resolve; rej = reject; }); promise.resolve = res; promise.reject = rej; return promise; }

module.exports =  {
  appMake:  {
    appName: 'purge',
    appDescription: 'Remove messages from channel.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'amount',
      commandDescription: 'How many messages need to get purged?',
      commandType: 4,
      commandRequired: true
    },
    {
      commandName: 'text',
      commandDescription: 'Target specific text, sentence.',
      commandType: 3,
      commandRequired: false 
    },
    { 
      commandName: 'user',
      commandDescription: 'Target user?',
      commandType: 6,
      commandRequired: false
    }]
  },
  name: 'purge',
  module: 'administrative',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request` }
    })
      .catch((err) => { console.log(err) });
    
    let amount, text, user, waitForStuff = defer(), waitForMoreStuff = defer(), fetchMessages = [], messagesToPurge = [];
    
    if(msg.data.options.find(item => item.name === 'amount')) amount = msg.data.options.find(item => item.name === 'amount').value; 
    if(msg.data.options.find(item => item.name === 'text')) text = msg.data.options.find(item => item.name === 'text').value;
    if(msg.data.options.find(item => item.name === 'user')) user = msg.data.options.find(item => item.name === 'user').value;;
    
    if(amount < 2) amount = 2;
    if(amount > 500) amount = 500;
    
    async function getMessages(numMsg, msgId) {
      let waitForMessages = defer();
      let totalMessages = numMsg;
      let limit = totalMessages;
      if(totalMessages >= 100) {
        limit = 100;
        totalMessages = totalMessages - 100;
      } else {
        totalMessages = 0;
      }
      
      if(msgId) {
        await channel.chanGetMessages({ channel: msg.channel_id, limit: limit, before: msgId })
          .then(async (mes) => {
            await mes.forEach((m) => fetchMessages.push(m));
            setTimeout(function() {
              waitForMessages.resolve(true);
            }, 1000);
        });
      } else {
        await channel.chanGetMessages({ channel: msg.channel_id, limit: limit })
          .then(async (mes) => {
            await mes.forEach((m) => fetchMessages.push(m));
            setTimeout(function() {
              waitForMessages.resolve(true);
            }, 1000);
        });
      }
      
      await waitForMessages;
      
      if(totalMessages) getMessages(totalMessages, fetchMessages[fetchMessages.length - 1].id);
      if(!totalMessages) waitForStuff.resolve(true);
    };
    getMessages(amount, false);
    
    await waitForStuff;
    
    let dateButTwoWeeksAgo = Date.parse(new Date(+new Date - 12096e5));
    await fetchMessages.forEach((m) => {
      if(Date.parse(m.timestamp) > dateButTwoWeeksAgo) {
        if(user && text) {
          if(m.author.id == user) {
            if(m.content.toLowerCase().includes(text.toLowerCase())) {
              messagesToPurge.push(m.id);
            }
          }
        }
        if(user && !text) {
          if(m.author.id == user) {
            messagesToPurge.push(m.id);
          }
        }
        if(!user && text) {
          if(m.content.toLowerCase().includes(text.toLowerCase())) {
            messagesToPurge.push(m.id);
          }
        }
        if(!user && !text) {
          messagesToPurge.push(m.id);
        }        
      }
    });
    
    let qualifiedMessages = messagesToPurge.length;
    
    function preparePurgeTheShit(array, size) {
      let results = [];
      while (array.length) { results.push(array.splice(0, size)); }
      return results;
    }
    
    let finalizedPurgeArrays = await preparePurgeTheShit(messagesToPurge, 100);
    let purgePlus = 0;
    await finalizedPurgeArrays.forEach((purgeArr) => {
      purgePlus++;
      setTimeout(function() {
        channel.msgBulkDelete({ channel: msg.channel_id, messages: purgeArr });	
      }, 1000 * purgePlus);  
    });
    
    waitForMoreStuff.resolve(true)
    await waitForMoreStuff;
 
    return interaction.createFollowupResponse({ 
      token: msg.token,
      content: `🧹 Removed \`${qualifiedMessages}\` messages.\n🔎 Scanned \`${amount}\` messages.` 
    })
      .catch((err) => console.log(err));
  },
};
