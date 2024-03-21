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
    appName: 'leaderboard',
    appDescription: 'Show a top 10 leaderboard of your guild',
    type: 'chatInput',
    permissions: []
  },
  name: 'leaderboard',
  module: 'tools',
  async execute(msg, sql)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request` }
    })
      .catch((err) => { console.log(err) });
    
    let board, collectMem = [], countU = 0;
    let awaitQuery = defer();
    const newConn = sql.sqlConnectOnce();
      sql.sqlQueryOnce(newConn, `USE g${msg.guild_id};`)
        .then((qBack) => {
          if(qBack == 'err') {
            newConn.end(function(){});
            return;
          } else {
            sql.sqlQueryOnce(newConn, `SELECT * FROM User ORDER BY points DESC;`)
              .then((qBack) => {
                if(qBack == 'err') {
                  newConn.end(function(){});
                  return;
                } else {
                  board = qBack;
                  awaitQuery.resolve(true);
                }
              });
          }
        });
    await awaitQuery;
    
    for (let i of board) {
      let awaitLoop = defer();
      countU++;
      if(countU <= 10) {
        setTimeout(async function(){ 
          try {
            let userValid = await guild.getMember({ guild: msg.guild_id,	member: i.id });
            collectMem.push({ id: userValid.user.id, username: userValid.user.username, avatar: userValid.user.avatar, points: i.points });
            awaitLoop.resolve(true);
          } catch(e) {
            countU--;
            awaitLoop.resolve(true);
          }
        }, countU * 100);
      } else {
        awaitLoop.resolve(true);
      }
      await awaitLoop;
    }
    
    newConn.end(function(){});
    countU = 0;
    
    let embedObject = new embed().footer('Each message equals one point.').color('00FF00');
    
    for (let i of collectMem) {
      countU++;
      if(countU === 1) {
        embedObject.author(`Board leader: ${i.username}`, `https://cdn.discordapp.com/avatars/${i.id}/${i.avatar}.png?size=4096`);
        embedObject.description(`${i.username} has \`${i.points}\` points.\nBeat that suckers!\n\nFull leaderboard on [Artemis.rest](https://artemis.rest/board.php?guild=${msg.guild_id})\n-`);
        embedObject.thumbnail(`https://cdn.discordapp.com/avatars/${i.id}/${i.avatar}.png?size=4096`);
      } else {
        embedObject.field(`(${countU}) ${i.username}`, `\`${i.points}\` points`);
      }
    }
    
    return interaction.createFollowupResponse({ 
      token: msg.token,
      embeds: embedObject.output
    })
      .catch((err) => console.log(err));
  },
};
