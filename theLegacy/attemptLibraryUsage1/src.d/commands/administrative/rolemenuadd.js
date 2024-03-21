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
    appName: 'rolemenuadd', 
    appDescription: 'Add roles to rolemenu.', 
    type: 'chatInput', 
    permissions: [],
    build: [{
      commandName: 'slot',
      commandDescription: 'Add role to slot.',
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
      commandName: 'roleadd',
      commandDescription: 'Select the role to add to the rolemenu.',
      commandType: 8,
      commandRequired: true 
    },
    {
      commandName: 'namerole',
      commandDescription: 'Input a name for the role.',
      commandType: 3,
      commandRequired: true 
    },
    {
      commandName: 'roleemote',
      commandDescription: 'Input a single emoji for the role.',
      commandType: 3,
      commandRequired: true 
    },
    {
      commandName: 'roledescription',
      commandDescription: 'Add a small description of the role.',
      commandType: 3,
      commandRequired: true 
    }] 
  },
  name: 'rolemenuadd', 
  module: 'administrative',
  async execute(msg, sql) {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    let roleBuild = {};
    for (let i of msg.data.options) roleBuild[i.name] = i.value.replace('<', '').replace('>', '').replace(':', '');
    let awaitQuery = defer();
    let returnedSQLValue;
    const newConn = sql.sqlConnectOnce();
    sql.sqlQueryOnce(newConn, `USE g${msg.guild_id};`).then((returned) => {
      if(returned == 'err') return awaitQuery.resolve(true);
      if(returned !== 'err') {
        sql.sqlQueryOnce(newConn, `INSERT INTO roles (id, rolename, description, emote, slot) VALUES ('${roleBuild['roleadd']}', '${roleBuild['namerole']}', '${roleBuild['roledescription']}', '${roleBuild['roleemote']}', '${roleBuild['slot']}')`)
          .then((val) =>  {
            if(val == 'err') return awaitQuery.resolve(true);
            returnedSQLValue = true;
            return awaitQuery.resolve(true);
          });
      }
    });
    await awaitQuery;
    newConn.end(function(){});
    let contentSend;
    if(returnedSQLValue) contentSend = `Added <@&${roleBuild['roleadd']}> to role slot \`${roleBuild['slot']}\`.\nGiven role name is \`${roleBuild['namerole']}\`\nDescription for the role is \`${roleBuild['roledescription']}\`\nEmote bound is <:${roleBuild['roleemote']}> `;
    if(!returnedSQLValue) contentSend = 'An error occured.';
    return interaction.createFollowupResponse({ 
      token: msg.token,
      content: contentSend 
    })
      .catch((err) => console.log(err));
  },
};
