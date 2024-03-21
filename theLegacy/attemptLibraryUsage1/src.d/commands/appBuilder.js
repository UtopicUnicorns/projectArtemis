//Hopefully a small number
let failTimes = 0;

module.exports = {
  //Process datga from command to make *app*
  makeApp(data, g) {
    //Shorten data
    const d = data.app;
    
    //Initiate app build
    let buildTheApp = new appBuild();
    
    //If there is a build to process
    if(d['build']) {
      //Loop trough all the information
      for(let i of d['build']) {
        //Main command name
        if(i.commandName) buildTheApp.commandName(i.commandName);
        
        //Main description
        if(i.commandDescription) buildTheApp.commandDescription(i.commandDescription);
        
        //Main app type
        if(i.commandType) buildTheApp.commandType(i.commandType);
        
        //Main if choices
        if(i.commandRequired) buildTheApp.commandRequired(i.commandRequired);
        
        //If main choices
        if(i.commandChoices) {
          //Loop
          for(let f of i.commandChoices) {
            //Build main command choices
            buildTheApp.commandChoices(f.name, f.value);
          }
        }
        
        //If sub command
        if(i.sub) {
          //Loop trough subs
          for(let a of i.sub) {
            //Sub command name
            if(a.subCommandName) buildTheApp.subCommandName(a.subCommandName);
            
            //Sub command description
            if(a.subCommandDescription) buildTheApp.subCommandDescription(a.subCommandDescription);
            
            //Sub command type
            if(a.subCommandType) buildTheApp.subCommandType(a.subCommandType);
            
            //Pass a required sub
            if(a.subCommandRequired) buildTheApp.subCommandRequired(a.subCommandRequired);
            
            //If sub choices
            if(a.subCommandChoices) {
              //Loop
              for(let b of a.subCommandChoices) {
                //Pass sub command choices
                buildTheApp.subCommandChoices(b.name, b.value);
              }
            }
            
            //If sub of sub command name
            if(a.deepCommandName) buildTheApp.deepCommandName(a.deepCommandName);
            
            //If sub of sub command description
            if(a.deepCommandDescription) buildTheApp.deepCommandDescription(a.deepCommandDescription);
            
            //If sub of sub command type
            if(a.deepCommandType) buildTheApp.deepCommandType(a.deepCommandType);
            
            //If sub of sub command required check
            if(a.deepCommandRequired) buildTheApp.deepCommandRequired(a.deepCommandRequired);
            
            //If sub of sub command command choices
            if(a.deepCommandChoices) {
              //loop
              for(let c of a.deepCommandChoices) {
                //Sub of sub command choice add
                buildTheApp.deepCommandChoices(c.name, c.value);
              }
            }
          }
        }
      }
    }
    
    //Grab all information and send data to API
    application.createGlobalApp({ 
      name: data.app.appName,
      description: data.app.appDescription,
      options: buildTheApp.build(),
      defaultPermissions: data.app.permissions,
      type: data.app.type  
    })
      .then((dat) =>  {
        //If API hates me
        if(dat.message) {
          //Add a failtime
          failTimes++;
          
          //Notify of ratelimit
          console.log(`load: ${data.name} =!= ? Ratelimit: ${dat.retry_after}: `, time.clock().eu);
          
          //Create timer to redo
          setTimeout(() => {  this.makeApp(data, g);  }, Math.ceil(dat.retry_after * 1000) + Math.floor(failTimes * 1000));  
        }
        
        //If API does not hate me, notify of load
        //if(dat.id) console.log(`loaded: ${dat.name}: `, time.clock().eu);
      })
      .catch((err) => console.error(util.inspect(err, {showHidden: false, depth: null, colors: true}), 'error'));
  },
  
  //Remove app/command
  removeApp(data, g, n) {
    //Pass info to API
    application.deleteGlobalCommand({ command: data })
      .then((t)=> {
        //If API hates me
        if(t.message) {
          //Extra failtime
          failTimes++;
          
          //Notify of ratelimit
          console.log(`unload: ${n} =!= ? Ratelimit: ${t.retry_after}: `, time.clock().eu);
          
          //Redo remove after some time
          setTimeout(() => {  this.removeApp(data, g, n);  }, Math.ceil(t.retry_after * 1000) + Math.floor(failTimes * 1000)); 
        }
        
        //Notify of deletion
        console.log(`unloaded: ${data}: `, time.clock().eu);
      })
      .catch((err) => console.error(err, 'error: ', time.clock().eu));
  },
  
  //Main removal
  async blowMe(data, g, n)  {
    this.removeApp(data, g, n);
  },
  
  //Main maker
  async makeMe(data, g) {
    this.makeApp(data, g);
  },
};
