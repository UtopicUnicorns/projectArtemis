/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
/*  projectBow.js manages the loading of all modules.
    Before loading the class we import the globals from treeRoots.
      await import('./treeRoots/globals.js');
      
    Class bow is divided into few steps, at first we have a few variables set up in the constructor.
      configContent will hold the config file contents after load.
      gateWay will hold the active/inactive gateway build.
      bootCore is simply a promise waiting to get resolved.
      
    Class bow gets exported as a global so that it can be called upon from an external file.
      global.artemis = new bow() gets defined as a global.
      export const artemis = global.artemis will be exported.
    
    After export libraryStart() can be called from the external file to start the process.
    This function relies on getting some data from the external file, mainly the configFile path.
    When the variable is passed the function starts;
      We use the try .. catch method to ensure a failure results in exiting the app.
      Before failure the app will throw back a final log which can be caught in the logger emitter.
      At first we import the modules we need to run the app.
      After loading the modules we load the configFile and globalise it.
      When all other parts are loaded we 'boot up' the gateWay.
      After loading the gateWay we pass back a start event. */
      
await import('./treeRoots/globals.js'); /* Importing all needed globals. */

class bow { /* Main class to export for the app. */
  constructor() { /* This constructor holds a few variables that need to be defined. */
    this.configContent; /* Empty variable waiting for config. */
    this.gateWay; /* Empty variable waiting for the gateWay. */
    this.bootCore = snapString(); /* Unresolved promise. */
  }

  async libraryStart( inc ) { /* Function to start the application, needs path to main config file. */
    try { /* Using try .. catch method because in case any part fails it needs to exit the app. */      
      this.bootCore.resolve(); /* After loading needed modules resolve the promise. */
      this.configContent = await fs.promises.readFile(`${process.cwd()}/${inc}`, 'utf8'); /* Loading the configFile supplied. */
      global.configContent = JSON.parse(this.configContent); /* Parsing the configFile. */
      
      await import('../tests.js'); /* TESTING FILE. */
      
      this.gateWay = new gateWay(); /* Starting the connection to the gateWay. */
      await this.gateWay.setUp(); /* Load function wait for finish */
      await this.bootCore; /* Waiting for promise to be resolved before proceeding. */
      
      return treeBranch.emit('logger', 'appStart', 'App finished loading', readClock()); /* Emit that app has finished loading. */
    } catch( e ) { /* Exit the application, but not before spitting out a last log. */
      treeBranch.emit('logger', 'appError', 'Closed the application: ', e); /* Emitting closing log. */
      process.exit(); /* Exiting the process. */
    }
  }
}

global.artemis = new bow(); /* Globalising a 'new bow()' ready to be exported. */
export const artemis = global.artemis; /* Exporting as global 'artemis' to be used externally. */

