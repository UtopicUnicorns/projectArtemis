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
    appName: 'supportinitiate', 
    appDescription: 'Initiate help module.', 
    type: 'chatInput', 
    permissions: [], 
    build: [{
      commandName: 'create',
      commandDescription: 'Create a new forum for help tickets with name you provide.',
      commandType: 3,
      commandRequired: false 
    },
    {
      commandName: 'bind',
      commandDescription: 'Bind an existing forum channel as ticket channel.',
      commandType: 7,
      commandRequired: false 
    },
    {
      commandName: 'supportrole',
      commandDescription: 'Select a role that gets pinged when users create tickets.',
      commandType: 8,
      commandRequired: false 
    }] 
  },
  name: 'supportinitiate', 
  module: 'administrative',
  async execute(msg, sql)  {
      interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    
    let awaitQuery = defer();
    const newConn = sql.sqlConnectOnce();
    
    sql.sqlQueryOnce(newConn, `USE g${msg.guild_id};`)
      .then((qBack) => {
        if(qBack == 'err') {
          return;
        } else {
          awaitQuery.resolve(true);
        }
      });
    
    await awaitQuery;
        
    let placeHold = {};
    if(!msg.data.options) {
      newConn.end(function(){});
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: `Feel free to select options.` 
      })
        .catch((err) => { 
          newConn.end(function(){});
          console.log(err) 
        });
    }
    
    if(msg.data.options[0]) {
      if(msg.data.options[0].name == 'create') placeHold['create'] = msg.data.options[0].value;
      if(msg.data.options[0].name == 'bind') placeHold['bind'] = msg.data.options[0].value;
      if(msg.data.options[0].name == 'supportrole') placeHold['supportrole'] = msg.data.options[0].value;
    }
    
    if(msg.data.options[1]) {
      if(msg.data.options[1].name == 'create') placeHold['create'] = msg.data.options[1].value;
      if(msg.data.options[1].name == 'bind') placeHold['bind'] = msg.data.options[1].value;
      if(msg.data.options[1].name == 'supportrole') placeHold['supportrole'] = msg.data.options[1].value;
    }
    
    if(placeHold.create)  {
      return guild.createChannel({
        guild: msg.guild_id,
        name: placeHold.create,
        type: 'guildForum'
      })
        .then((val) => {
          interaction.createFollowupResponse({
            token: msg.token,
            content: `Created and bound <#${val.id}>` 
          })
            .then((val9) => {
              const selQuery3 =  {
                checkIfExist: `SELECT * FROM Support;`,
                checkIfRoleExist: `SELECT * FROM Support WHERE value = 'role';`,
                createNewTable: `CREATE TABLE Support (id VARCHAR(100), value TEXT, PRIMARY KEY (id));`,
                addToTable: `INSERT INTO Support (id, value) VALUES ('${val.id}', 'chan');`
              };
              sql.sqlQueryOnce(newConn, selQuery3.checkIfExist)
                .then((val99) => {
                  if(val99 == 'err') return sql.sqlQueryOnce(newConn, selQuery3.createNewTable)
                    .then((val3) => {
                      sql.sqlQueryOnce(newConn, selQuery3.addToTable);
                      newConn.end(function(){});
                    });
                  sql.sqlQueryOnce(newConn, selQuery3.addToTable);
                  newConn.end(function(){});
                });
            })
          .catch((err) => {
            newConn.end(function(){});
            console.log(err)
          });
        })
        .catch((err) => {
          newConn.end(function(){});
          console.log(err)
        });
    }
    
    if(placeHold.bind) {
      if(msg.data.resolved.channels[placeHold.bind].type === 15)  {
      interaction.createFollowupResponse({ 
        token: msg.token,
        content: `Binding to <#${placeHold.bind}>`
      })
        .then((val6) => {
          const selQuery2 =  {
            checkIfExist: `SELECT * FROM Support;`,
            checkIfRoleExist: `SELECT * FROM Support WHERE value = 'role';`,
            createNewTable: `CREATE TABLE Support (id VARCHAR(100), value TEXT, PRIMARY KEY (id));`,
            addToTable: `INSERT INTO Support (id, value) VALUES ('${placeHold.bind}', 'chan');`
          };
          sql.sqlQueryOnce(newConn, selQuery2.checkIfExist)
            .then((val7) => {
              if(val7 == 'err') return sql.sqlQueryOnce(newConn, selQuery2.createNewTable)
                .then((val3) => {
                  sql.sqlQueryOnce(newConn, selQuery2.addToTable);
                  newConn.end(function(){});
                });
              sql.sqlQueryOnce(newConn, selQuery2.addToTable);
              newConn.end(function(){});
            });
        })
        .catch((err) => {
          newConn.end(function(){});
          console.log(err)
        });
      } else  {
        newConn.end(function(){});
        return interaction.createFollowupResponse({ 
          token: msg.token,
          content: `Wrong channel type, select a forum` 
        })
          .catch((err) => {
            newConn.end(function(){});
            console.log(err)
          });
      }
    }
    
    if(placeHold.supportrole) {
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: `Binding <@&${placeHold.supportrole}> as support role.` 
      })
        .then((val) =>  {
          const selQuery =  {
            checkIfExist: `SELECT * FROM Support;`,
            checkIfRoleExist: `SELECT * FROM Support WHERE value = 'role';`,
            createNewTable: `CREATE TABLE Support (id VARCHAR(100), value TEXT, PRIMARY KEY (id));`,
            addToTable: `INSERT INTO Support (id, value) VALUES ('${placeHold.supportrole}', 'role');`
          };
          sql.sqlQueryOnce(newConn, selQuery.checkIfExist)
            .then((val2) => {
              if(val2 == 'err') return sql.sqlQueryOnce(newConn, selQuery.createNewTable)
                .then((val3) => {
                  sql.sqlQueryOnce(newConn, selQuery.addToTable);
                  newConn.end(function(){});
                });
              sql.sqlQueryOnce(newConn, selQuery.checkIfRoleExist)
                .then((val4) => {
                  if(val4[0]) sql.sqlQueryOnce(newConn, `DELETE FROM Support WHERE id = '${val4[0].id}';`);
                  sql.sqlQueryOnce(newConn, selQuery.addToTable);
                  newConn.end(function(){});
                });
            });
        })
        .catch((err) => {
          newConn.end(function(){});
          console.log(err)
        });
    }
  },
};
