/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Arrow, embracing project Bow              */
/*  Main file to call on the project Bow library.
    Library gets called in three steps;
      First we import the library to initiate the first connection.
      Then we add a line at the very end of the file to start the library giving it the filename of the config file.
      And lastly we add the appropriate event emitters(treeBranch.on/treeBranch.once).
    Library will log certain events to the logger emitter.
      ./badExample/configExample.json will hold an example config file.
    
    await import('./libraryRoots/projectBow.js');  
    Main way to activate the library.
    Make sure the path points to the proper startfile of the library folder.
    
    Between the initiation and starting of th library we would add the emitters.
    treeBranch.on('example', async ( data ) => { code here });
      ./badExample/emitterExample.js will hold examples on which treeBranches you can hook into.
    
    On the very end of the file(with or without a whiteline) we will have to activate the library by supplying the config file.
    await artemis.libraryStart('configs.json');  */

await import('./libraryRoots/projectBow.js'); /* Initiate the project Bow library. */

treeBranch.on('logger', async ( level, inc, info ) => { /* Logger events */
  console.log( `[${level}]`, inc, info ); /* Log the event message */
});

treeBranch.on('appReady', async ( msg, data ) => { /* this event is emitted when everything is ready */
  console.log( msg ); /* Log the event message */
});

treeBranch.on('test', async ( data ) => { /* parsed event */
  console.log(data);
});

treeBranch.on('ready', async ( msg, data ) => { /* Ready event */
  //console.log(msg);
});

treeBranch.on('pureEvent', async ( eventName, eventData, shardNumber, socketData ) => { /* non-parsed event */
  //console.log( eventName, eventData, shardNumber ); /* Log the event message */
});

await artemis.libraryStart('configs.json'); /* Activate the library by passing start and the config file. */

