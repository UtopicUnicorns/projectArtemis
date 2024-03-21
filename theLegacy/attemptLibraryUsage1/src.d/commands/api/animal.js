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
    appName: 'animal', 
    appDescription: 'Get a animal picture.', 
    type: 'chatInput', 
    permissions: [],
    build: [{
      commandName: 'type',
      commandDescription: 'Pick an animal.',
      commandType: 3,
      commandRequired: true,
      commandChoices: [ 
        {
          name: 'dog', 
          value: 'dog'
        },
        {
          name: 'honk', 
          value: 'honk'
        },
        {
          name: 'cat', 
          value: 'cat'
        }
      ] 
    }] 
  },
  name: 'animal', 
  module: 'api',
  async execute(msg)  {
    function output(out) {
      let embedObject = new embed()
        .color('00FF00')
        .image(out)
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
    function getAnimal()  {
      if(msg.data.options[0].value == 'dog') {
        return fly.send(``, `/api/breeds/image/random`, 'GET', 'dog.ceo', 443, { 'Content-Type': 'application/json'})
          .then((val) => output(val.message))
          .catch((err)=>console.log(err));
      }
      if(msg.data.options[0].value == 'cat')  {
        return fly.send(``, `/meow`, 'GET', 'aws.random.cat', 443, { 'Content-Type': 'application/json'})
          .then((val) => output(val.file))
          .catch((err)=>console.log(err));
      }
      if(msg.data.options[0].value == 'honk')  {
        return fly.send(``, `/api/v2/img/lizard`, 'GET', 'nekos.life', 443, { 'Content-Type': 'application/json'})
          .then((val) => output(val.url))
          .catch((err)=>console.log(err));
      }
    }
    getAnimal(); 
  },
};
