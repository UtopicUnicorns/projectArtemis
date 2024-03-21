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
  appName: 'wallpaper', 
  appDescription: 'Get a random wallpaper.', 
  type: 'chatInput', 
  permissions: [],
  build: [{
  commandName: 'size',
  commandDescription: 'Pick a wallpaper size.',
  commandType: 3,
  commandRequired: true,
  commandChoices: [ 
  {
  name: 'normal', 
  value: 'normal'
  },
  {
  name: 'mobile', 
  value: 'mobile'
  }
  ] 
  }] 
  },
  name: 'wallpaper', 
  module: 'api',
  async execute(msg) {
    const conf = await require('../../configs.json');
    function output(out) {
      let embedObject = new embed()
        .description(out.links.html)
        .color('00FF00')
        .author(out.user.name, out.user.profile_image.small, out.user.links.html)
        .image(out.urls.full)
        .output;
      interaction.create({
        id: msg.id, 
        token: msg.token, 
        type: 'channelMessage', 
        data: {
          embeds: embedObject
        }
      })
        .catch((err) => console.log(err));
    }
    function getWallPaper(confK)  {
      if(msg.data.options[0].value == 'normal') {
        return fly.send(``, `/photos/random/?orientation=landscape&topics=wallpaper`, 'GET', 'api.unsplash.com', 443, { 'Content-Type': 'application/json', 'Authorization': `Client-ID ${confK}`})
          .then((val) => output(val))
          .catch((err)=>console.log(err));
      } else {
        return fly.send(``, `/photos/random/?orientation=portrait&topics=wallpaper`, 'GET', 'api.unsplash.com', 443, { 'Content-Type': 'application/json', 'Authorization': `Client-ID ${confK}`})
          .then((val) => output(val))
          .catch((err)=>console.log(err));
      }
    }
    getWallPaper(conf.unsplashAccess); 
  },
};
