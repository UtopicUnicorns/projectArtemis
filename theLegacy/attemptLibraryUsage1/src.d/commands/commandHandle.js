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

//First of many delays
let getComs = defer();

//Create class comExec
class comExec {
  //First boot construct
  constructor(initMsg, msg) {
    //Empty command list
    this.commandList = {};
    
    //Self execute first run  
    this.firstRun(initMsg, msg);
    
    //Resolver
    this.resolveCom = 'Hi';
  }
  
  //First run fire
  async firstRun(initMsg, msg) {
    //Read all files on its way trough folders
    const readdirSync = (p, a = []) => {
      if (fs.statSync(p).isDirectory()) fs.readdirSync(p).map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a));
      return a;
    };
    
    //Make an array of the files that are JS and are commands
    const loopList = await readdirSync(__dirname).filter(fName => fName.endsWith('.js') && require(fName).module);
    
    //Loop trough command array
    for(let i of loopList) {
      //Open file for examination
      const command = require(i);
      
      //If no name, assume no command
      if(!command.name) return;
      
      //Update global command list
      this.commandList[command.name] = {
        name: command.name,
        execute: command.execute,
        path: i,
        app: command.appMake,
        module: command.module
      };
      
      //If done looping, pass resolve
      if(Object.keys(this.commandList).length === loopList.length) getComs.resolve(true);
    }
    
    //Await commandslist to be loaded
    await getComs;
    
    //Call appBuild script
    let comCheckOrBuild = require('./appBuilder');
    
    //This number gonna get big yo
    let timeSetAdd = 0;
    
    //Loop trough finalized command list
    for(let i of Object.keys(this.commandList)) {
      //ACK the timer
      timeSetAdd++;
      
      //Create new timer with updated ACK
      let timerMakeAdd = timeSetAdd * 5000;
      
      //Initiate timeout, check command after timer runs out
      setTimeout(() => {
        //Pass command to app maker
        comCheckOrBuild.makeMe(this.commandList[i]);
        
        //If last command, set presence
        if(this.commandList[i].name == Object.keys(this.commandList)[Object.keys(this.commandList).length - 1]) console.log('Commands loaded. ', time.clock().eu);
      
      //Timer set
      }, timerMakeAdd);
    }
    
    //Call API to pass command list
    application
      .getGlobalCommands({ })
      .then((g) => g.forEach((g2) => {
        //If command exists in API, but not in files, remove it
        if(!this.commandList[g2.name]) comCheckOrBuild.blowMe(g2.id); 
      }))
      .catch((err) => console.log(err));
  }
  
  //Process incoming command request
  async exec(name, data, sql) {
    //Expect Both fail and succeed
    try {
      //Delete command from cache
      await delete require.cache[require.resolve(this.commandList[name].path)];
      
      //Load command anew
      const newCommand = await require(this.commandList[name].path);
      
      //Update command entry
      this.commandList[this.commandList[name]] = {
        name: this.commandList[name].name,
        execute: require.execute,
        path: this.commandList[name].path,
        app: this.commandList[name].appMake,
        module: this.commandList[name].module
      };
      
      //Pass back executed command
      return newCommand.execute(data, sql);
    
    //We expect it to fail if button or else 
    } catch(e) {
      //If failed with data
      if(data && data.data) {
        if(data.data.component_type && data.data.component_type === 2) {
          //Delete buttons from cache
          await delete require.cache[require.resolve(`${__dirname}/buttonHandle.js`)];
          
          //Load button anew
          const newButton = await require(`${__dirname}/buttonHandle.js`);
          
          //Pass back executed button
          return newButton.execute(data, sql); 
        }
      }
      
      //If nothing expected, assume no command loaded and pass a fail
      return interaction.create({ id: data.id, token: data.token, type: 'channelMessage', data: { content: 'Command not found.', visibleForAll: true } }).catch((err) => console.log(err)); 
    }
  }
}

//Export comExec
module.exports = comExec;
