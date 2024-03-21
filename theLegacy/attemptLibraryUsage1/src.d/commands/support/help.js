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
    appName: 'help', 
    appDescription: 'Request support.', 
    type: 'chatInput', 
    permissions: [], 
    build: [{
      commandName: 'request',
      commandDescription: 'Type your support question.',
      commandType: 3,
      commandRequired: true 
    },
    {
      commandName: 'channel',
      commandDescription: 'Select a valid support forum channel.',
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
  name: 'help', 
  module: 'support',
  async execute(msg, sql)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    let promiseThis = defer();
    let waitForSql = defer();
    let waitForRole = defer();
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
    
    let chanValid;
    let placeHold = {};
    let regUrl = /^(([^:\/\s]+):\/?\/?([^\/\s@]*@)?([^\/@:]*)?:?(\d+)?)?(\/[^?]*)?(\?([^#]*))?(#[\s\S]*)?$/;
    if(msg.data.options[0]) {
      if(msg.data.options[0].name == 'request') placeHold['request'] = msg.data.options[0].value;
      if(msg.data.options[0].name == 'channel') placeHold['channel'] = msg.data.options[0].value;
      if(msg.data.options[0].name == 'file') placeHold['file'] = msg.data.options[0].value;
    }
    if(msg.data.options[1]) {
      if(msg.data.options[1].name == 'request') placeHold['request'] = msg.data.options[1].value;
      if(msg.data.options[1].name == 'channel') placeHold['channel'] = msg.data.options[1].value;
      if(msg.data.options[1].name == 'file') placeHold['file'] = msg.data.options[1].value;
    }
    if(msg.data.options[2]) {
      if(msg.data.options[2].name == 'request') placeHold['request'] = msg.data.options[2].value;
      if(msg.data.options[2].name == 'channel') placeHold['channel'] = msg.data.options[2].value;
      if(msg.data.options[2].name == 'file') placeHold['file'] = msg.data.options[2].value;
    }
    if(placeHold.channel) {
      const selQuery = {
        checkIfExist: `SELECT * FROM Support WHERE id = '${placeHold.channel}';`,
        checkIfRoleExist: `SELECT * FROM Support WHERE value = 'role';`
      };
      sql.sqlQueryOnce(newConn, selQuery.checkIfExist)
        .then((val) =>  {
          if(!val[0]) {
            chanValid = false;
            return waitForSql.resolve(true);
          }
          chanValid = true;
          waitForSql.resolve(true);
        });
    }
    const selQuery2 = {
      checkIfRoleExist: `SELECT * FROM Support WHERE value = 'role';`
    };
    sql.sqlQueryOnce(newConn, selQuery2.checkIfRoleExist)
      .then((val2) =>  {
        if(!val2[0]) return waitForRole.resolve(true);
        placeHold['role'] = val2[0].id;
        waitForRole.resolve(true);
      });
    await waitForRole;
    await waitForSql;
    if(!chanValid) {
      newConn.end(function(){});
      return interaction.createFollowupResponse({ 
        token: msg.token,
        content: `Not a valid help forum. <#${placeHold.channel}>` 
      })
        .catch((err) => { 
          newConn.end(function(){});
          console.log(err) 
        });
    }
    if(placeHold.file) {
      let fileToGet = { 
        url: msg.data.resolved.attachments[placeHold.file].url,
        name: placeHold.file 
      };
      const testArr = regUrl.exec(fileToGet.url);
      const arrayToParse =  {
        host: testArr[4],
        path: testArr[6],
        url: fileToGet.url,
        file: placeHold.file,
        ext: path.extname(testArr[6])
      };
      placeHold['fileData'] = {
        host: testArr[4],
        path: testArr[6],
        url: fileToGet.url,
        file: placeHold.file,
        ext: path.extname(testArr[6])
      };
      https.get(arrayToParse.url,(res) => {
        const path = `./assets/files/${arrayToParse.file}${arrayToParse.ext}`; 
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish',() =>  { filePath.close(); promiseThis.resolve(true); })
      })
    }
    if(!placeHold.file) promiseThis.resolve(true);
    await promiseThis;
    let userInfo =  {
      name: `${msg.member.user.username}#${msg.member.user.discriminator}`,
      avatar: `https://cdn.discordapp.com/avatars/${msg.member.user.id}/${msg.member.user.avatar}.png`,
    };
    const fruits = [
      "Apple", "Apricot", "Avocado", "Banana", "Bilberry",
      "Blackberry", "Blackcurrant", "Blueberry", "Boysenberry", "Currant",
      "Cherry", "Cherimoya", "Chicofruit", "Cloudberry", "Coconut",
      "Cranberry", "Cucumber", "Custardapple", "Damson", "Dragonfruit",
      "Durian", "Elderberry", "Feijoa", "Fig", "Gojiberry",
      "Gooseberry", "Grape", "Raisin", "Grapefruit", "Guava",
      "Honeyberry", "Huckleberry", "Jabuticaba", "Jackfruit", "Jambul",
      "Jujube", "Juniperberry", "Kiwano", "Kiwifruit", "Kumquat",
      "Lemon", "Lime", "Loquat", "Longan", "Lychee",
      "Mango", "Mangosteen", "Marionberry", "Melon", "Cantaloupe",
      "Honeydew", "Watermelon", "Miracle fruit", "Mulberry", "Nectarine",
      "Nance", "Olive", "Orange", "Bloodorange", "Clementine",
      "Mandarine", "Tangerine", "Papaya", "Passionfruit", "Peach",
      "Pear", "Persimmon", "Physalis", "Plantain", "Plum",
      "Prune", "Pineapple", "Plumcot", "Pomegranate", "Pomelo",
      "Quince", "Raspberry", "Salmonberry", "Rambutan", "Redcurrant",
      "Salal berry", "Salak", "Satsuma", "Soursop", "Star fruit",
      "Strawberry", "Tamarillo", "Tamarind", "Yuzu",
    ];
    const select = await fruits[~~(Math.random() * fruits.length)];
    let attachmentObject = [];
    
    let componentObject2 = new component()
      .button({
        label: 'Complete Ticket', 
        custom_id: 'ticketComplete', 
        style: 3, 
        emoji:  {
          name: '✔️' 
        } 
      })
      .button({
        label: 'Bot website', 
        style: 5, 
        emoji:  {
          name: '🗺️' 
        },
        url: 'https://artemis.rest' 
      })
      .output;
    
    let pingMsg = `<@${msg.member.user.id}>,\n${placeHold.request.slice(0, 1500)}`;
    if(placeHold.role) pingMsg = `<@${msg.member.user.id}>, <@&${placeHold.role}>,\n${placeHold.request.slice(0, 1500)}`;
    let messageObject = {
      content: pingMsg,
      components: componentObject2
    };
    if(placeHold.file) {
      attachmentObject.push({	
        file: `./assets/files/${placeHold['fileData'].file}${placeHold['fileData'].ext}`,
        description: `${placeHold['fileData'].file}${placeHold['fileData'].ext}`,
        filename: `${placeHold['fileData'].file}${placeHold['fileData'].ext}`	
      });
      messageObject['attachments'] = attachmentObject;
    }
    channel.createForumThread({
      channel: placeHold.channel,
      name: `🔔${select} #${Math.floor(Date.now() / 1000).toString().slice(-5)}`,
      auto_archive_duration: 10080,
      rate_limit_per_user: 10,
      message: messageObject 
    })
      .then((val) =>{
        newConn.end(function(){});
        if(placeHold['fileData']) fs.unlinkSync(`./assets/files/${placeHold['fileData'].file}${placeHold['fileData'].ext}`);
        interaction.createFollowupResponse({ 
          token: msg.token,
          content: `<#${val.id}>` 
        })
          .catch((err) => { 
            console.log(err);
            newConn.end(function(){}); 
          });
      })
      .catch(async (err) => { 
        newConn.end(function(){});
        console.log(err); 
      });
  },
};
