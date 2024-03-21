//Await function
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

//Load mysql module
const mysql = require('mysql');

//Create class sqlMe
class sqlMe {
  //Base (this.) construct
  constructor() {
    //Empty connection, to be filled with socket
    this.connection;
    
    //Cedentials get stored once
    this.cred;
    
    //On sql error
    /* mailMan.on('sqlErr', ( dataPool ) => {
      //Reconnect to baseline
      this.sqlConnect(dataPool);
    }); */
  }
  
  //Global sql connect
  /* sqlConnect(data) {
    //Store data
    const dataPool = data;
    
    //Create credentials
    this.cred = {
      host: configData.sqlh,
      user: configData.sqlu,
      password: configData.sqlp
    };
    
    //Create connection
    this.connection = mysql.createConnection({ 
      host: data.sqlh,
      user: data.sqlu,
      password: data.sqlp
    });
    
    //Establish connection
    this.connection.connect(function(err) {
      if(err) {
        //console.log(err.code);
        //console.log(err.fatal);
      }
    });
    
    //If error occurs
    this.connection.on('error', function() {
      //Loop back to connect
      mailMan.emit('sqlErr', dataPool);
    });
  } */
  
  //Temporary connections
  sqlConnectOnce() {
    //Form temp connection 
    const tempConn = mysql.createConnection({ 
      host: configData.sqlh,
      user: configData.sqlu,
      password: configData.sqlp
    });
    
    //Establish temp connection
    tempConn.connect(function(err) {
      if(err) {
        //console.log(err.code);
        //console.log(err.fatal);
      }
    });
    
    tempConn.on('error', function() {
      //Loop back to connect
      tempConn.end(function(){});
    });
    
    //Pass back formed connection
    return tempConn;
  }
  
  //Kill global connection
  sqlKill() { 
    this.connection.end(function(){}); 
  }
  
  //Global SQL input
  async sqlQuery(input) {
    //Initiate delay
    let finishInput = defer();
    
    //Pass SQL stuff
    this.connection.query(input, function(err, rows, fields) {
      if(err) {
        return finishInput.resolve('err');
      } else {
        return finishInput.resolve(rows);
      }
    });
    
    //Needs to be processed
    await finishInput;
    
    //Pass back info
    return finishInput;
  }
  
  //Temp connection SQL input
  async sqlQueryOnce(con, input) {
    //Initiate delay
    let finishInput = defer();
    
    //Pass SQL text
    con.query(input, function(err, rows, fields) {
      if(err) {
        return finishInput.resolve('err');
      } else {
        return finishInput.resolve(rows);
      }
    });
    
    //Await finish
    await finishInput;
    
    //Pass back info
    return finishInput;
  }
  
  //When API message create fired
  async msgHandle(msg) {
    //Collect details from event
    const information = {
      id: msg.author.id,
      username: msg.author.username,
      discriminator: msg.author.discriminator,
      avatar: msg.author.avatar,
      channelId: msg.channel_id,
      guildId: msg.guild_id,
    };
    
    //If not in a guild, do nothing
    if(!information.guildId) return;
    
    //Form temporary connection
    const newConn = this.sqlConnectOnce();
    
    //SQL gore
    //Tell connection to use guild
    this.sqlQueryOnce(newConn, `USE g${information['guildId']};`)
      .then((valBack) => {
        //If error (no database, no connection etc), do nothing
        if(valBack == 'err') return;
        
        //Attempt to create a table for selected channel
        this.sqlQueryOnce(newConn, `CREATE TABLE IF NOT EXISTS c${information.channelId} (id varchar(100) NOT NULL, value int, PRIMARY KEY (id))`)
          .then(() => {
            //Select user from channel
            this.sqlQueryOnce(newConn, `SELECT 1 FROM c${information.channelId} WHERE id = ${information.id};`)
              .then((valueBack) => {
                //If user does not exist, make it
                if(valueBack.length == 0) {
                  //Create user in channel table
                  this.sqlQueryOnce(newConn, `INSERT INTO c${information.channelId} (id, value) VALUES ('${information.id}', '1')`)
                    .then(() => {
                      //Select user in global table
                      this.sqlQueryOnce(newConn, `SELECT 1 FROM User WHERE id = ${information.id};`)
                        .then((valUser) => {
                          //If no user in global table, create it
                          if(valUser.length == 0) {
                            //Create user in global table
                            this.sqlQueryOnce(newConn, `INSERT INTO User (id, username, discriminator, avatar, points) VALUES ('${information.id}', '${information.username}', '${information.discriminator}', '${information.avatar}', '1')`)
                              .then(() => {
                                //Kill connection
                                newConn.end(function(){});
                              });
                          //If user is in the global table
                          } else {
                            //Update global table
                            this.sqlQueryOnce(newConn, `UPDATE User SET username = '${information.username}', discriminator = '${information.discriminator}', avatar = '${information.avatar}', points = points + 1 WHERE id = ${information.id};`)
                              .then((datava) => {
                                //Kill connection
                                newConn.end(function(){});
                              });
                          }
                        });
                    });
                //If user exists, update entry
                } else {
                  //Update user in channel
                  this.sqlQueryOnce(newConn, `UPDATE c${information.channelId} SET value = value + 1 WHERE id = ${information.id};`)
                    .then(() => {
                      //Select user from global
                      this.sqlQueryOnce(newConn, `SELECT 1 FROM User WHERE id = ${information.id};`)
                        .then((valUser) => {
                          //If no user in global
                          if(valUser.length == 0) {
                            //Create user in global
                            this.sqlQueryOnce(newConn, `INSERT INTO User (id, username, discriminator, points) VALUES ('${information.id}', '${information.username}', '${information.discriminator}', '${information.avatar}', '1')`)
                              .then(() => {
                                //Kill connection
                                newConn.end(function(){});
                              });
                          //If user in in global
                          } else {
                            //Update user in global
                            this.sqlQueryOnce(newConn, `UPDATE User SET username = '${information.username}', discriminator = '${information.discriminator}', avatar = '${information.avatar}', points = points + 1 WHERE id = ${information.id};`)
                              .then((datava) => {
                                //Kill connection
                                newConn.end(function(){});
                              });
                          }
                        });
                    });
                }
              });
            
          });
      });
  }
}

//Export sqlMe
module.exports = sqlMe;
