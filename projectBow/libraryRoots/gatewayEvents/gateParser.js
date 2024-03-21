/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
export async function gateEvent( data ) { /* Parser function to export */
  try{ /* Try when event exists */
    let parseToFile = await import(`./incomingEvents/${data.eventName}.js`); /* Load file */
    //parseToFile.toParseMe(data); /* use function to parse */
  } catch(e) { /* Spit out unparsed event */
    treeBranch.emit('logger', 'parseError', `Event parser '${data.eventName}' reports: `, e); /* Emit error */
    treeBranch.emit(data.eventName, 'error parsing, refer to data field for unparsed data', data) /* Emit unparsed */
  }
}

