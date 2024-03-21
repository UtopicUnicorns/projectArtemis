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

module.exports = {
  async execute( eventState, msg, conMan ) {
    let counterGuilds;
    let awaitQuery = defer();
    const newConn = conMan.sqlConnectOnce();
      conMan.sqlQueryOnce(newConn, `USE artemis;`)
        .then((qBack) => {
          if(qBack == 'err') {
            newConn.end(function(){}); 
            return;
          } else {
            conMan.sqlQueryOnce(newConn, `SELECT COUNT(*) FROM guildStatus;`)
              .then((val) =>  {
                counterGuilds = val[0]['COUNT(*)'];
                newConn.end(function(){}); 
                return awaitQuery.resolve(true);
              });
            
          }
        });
    await awaitQuery;
    
    //Apply status
    presence.set({
      status: 'dnd', 
      activities: {
      name: `🔭 ${counterGuilds} servers`, 
      type: 'watching'
    }}, msg);
  },
};

