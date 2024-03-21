function defer() {
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;  
  return promise;
}
module.exports =  {
  appMake:  {
    appName: 'rolemenu', 
    appDescription: 'Spawn rolemenu.', 
    type: 'chatInput', 
    permissions: [],
    build: [{
      commandName: 'slot',
      commandDescription: 'Select role slot to spawn.',
      commandType: 3,
      commandRequired: true,
      commandChoices: [ 
        {
          name: 'first', 
          value: '1'
        },
        {
          name: 'second', 
          value: '2'
        },
        {
          name: 'third', 
          value: '3'
        },
        {
          name: 'fourth', 
          value: '4'
        },
        {
          name: 'fifth', 
          value: '5'
        }
      ] 
    },
    {
      commandName: 'rolemenutext',
      commandDescription: 'Give a small text for the rolemenu.',
      commandType: 3,
      commandRequired: true 
    }] 
  },
  name: 'rolemenu', 
  module: 'administrative',
  async execute(msg, sql) {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: false }
    })
      .catch((err) => { console.log(err) });
    
    let slotNum;
    let menuText;
    for (let i of msg.data.options) {
      if(i.name == 'slot') slotNum = i.value;
      if(i.name == 'rolemenutext') menuText = i.value;
    }
    
    let awaitQuery = defer();
    let returnedSQLValue;
    const newConn = sql.sqlConnectOnce();
    sql.sqlQueryOnce(newConn, `USE g${msg.guild_id};`).then((returned) => {
      if(returned == 'err') return awaitQuery.resolve(true);
      if(returned !== 'err') {
        sql.sqlQueryOnce(newConn, `SELECT * FROM roles WHERE slot = '${slotNum}';`)
          .then((val) =>  {
            if(val == 'err') return awaitQuery.resolve(true);
            returnedSQLValue = val;
            return awaitQuery.resolve(true);
          });
      }
    });
    await awaitQuery;
    newConn.end(function(){});
    
    if(!returnedSQLValue) {
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: 'Error occured!' 
      })
        .catch((err) => console.log(err));
    }
    
    if(returnedSQLValue.length === 0) {
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: 'This slot has no entries.' 
      })
        .catch((err) => console.log(err));
    }
    
    let componentObject = new component()
      .menu({ custom_id: `${msg.guild_id}:roleMenu:${slotNum}`, 
              place_holder: menuText, 
              min_val: 1, 
              max_val: 1 });
    
    for (let i of returnedSQLValue) {
      let emoteSelect;
      if(!i.emote.split(':')[1]) emoteSelect = { name: i.emote };
      if(i.emote.split(':')[1]) emoteSelect = { id: i.emote.split(':')[1] } 
      componentObject.entry({ 
        label: i.rolename, 
        value: i.id, 
        description: i.description,
        emoji: emoteSelect 
      });
    }
    
    return interaction.createFollowupResponse({ 
      token: msg.token,
      components: componentObject.output
    })
      .catch((err) => console.log(err));
  },
};
