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
    appName: 'proton',
    appDescription: 'View compability dat from protonDB.',
    type: 'chatInput',
    permissions: [],
    build:  [{ 
      commandName: 'game',
      commandDescription: 'Input game name.',
      commandType: 3,
      commandRequired: true
    }]
  },
  name: 'proton',
  module: 'tools',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request` }
    })
      .catch((err) => { console.log(err) });
    let waitForSteam = defer();
    let gameGrab;
    let protonGrab;
    fly.send('', `/api/storesearch/?term=${encodeURI(msg.data.options[0].value)}&l=english&cc=US&currency=1`, 'POST', 'store.steampowered.com', 443, { 'Content-Type': 'application/json' })
      .then((val) =>  {
        if(!val) return waitForSteam.resolve(true);
        if(val.total === 0) return waitForSteam.resolve(true);
        gameGrab = val.items[0];
        return waitForSteam.resolve(true)
      });
    await waitForSteam;
    const gotGame = gameGrab;
    if(!gotGame) return interaction.createFollowupResponse({ 
      token: msg.token,
      content: 'No Game Found.' 
    })
      .catch((err) => console.log(err));  
    let waitForProton = defer();
    let protonUrl = `https://www.protondb.com/api/v1/reports/summaries/${gameGrab.id}.json`;
    https.get(protonUrl, (res) => {
      if(res.statusCode !== 200) return waitForProton.resolve(true);
      res.on('data', (d) => {
        protonGrab = JSON.parse(d);
        return waitForProton.resolve(true)
      });
    })
      .on('error', (e) => { console.error(e); });
    await waitForProton;
    const gotProton = protonGrab;
    if(!gotProton) return interaction.createFollowupResponse({ 
      token: msg.token,
      content: 'No Game Found.' 
    })
      .catch((err) => console.log(err));
    let embedObject = new embed()
      .title(gotGame.name)
      .color('FF00FF')
      .field('ProtonDB:', `[${gotGame.name} ProtonDB](https://www.protondb.com/app/${gotGame.id})`, true)
      .field('Steam:', `[${gotGame.name} Steam](https://store.steampowered.com/app/${gotGame.id})`, true)
      .field('Rating:', `${gotGame.metascore}.`, true)
      .field('Tier Confidence:', gotProton.confidence,true)
      .field('Tier:', gotProton.tier,true)
      .field('Trending Tier:', gotProton.trendingTier,true)
      .thumbnail(gotGame.tiny_image)
      .image(gotGame.tiny_image);
    if(gotGame.price) {
      if(gotGame.price.final) {
        let price = gotGame.price.final.toString();
        let len = price.length;
        let x = "$" + price.slice(0, len - 2) + "," + price.slice(len - 2);
        embedObject.footer(`Price: ${x}`);
      }
    }
    return interaction.createFollowupResponse({ 
      token: msg.token,
      embeds: embedObject.output 
    })
      .catch((err) => console.log(err));
  },
};
