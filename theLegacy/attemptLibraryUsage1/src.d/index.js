//Initiate Library
const projectBow = await import('project_bow');

//Native Path
const path = await import ('path');

//Load Library
await projectBow.lib('/configs.json');

//Load SQL connection maker
import sqlMe from './commands/sqlMe.js';

//Initiate first connection
const conMan = new sqlMe();

//Initiate Commands maker
import exec from './commands/commandHandle.js';

//Import passing events
import handleEvent from './eventFire/passFire.js';
const passFire = new handleEvent();

//Global fetchers
let comHandle;
let passClient;

//Await function
function defer() { var res, rej; var promise = new Promise((resolve, reject) => { res = resolve; rej = reject; }); promise.resolve = res; promise.reject = rej; return promise; }

//Error Handle
process.on( 'unhandledRejection' ,(reason, promise) => { console.log(util.inspect(reason.stack || reason, {maxArrayLength: null, depth:null })); });
process.on( 'unhandledError' ,(reason, promise) => { console.log(util.inspect(reason.stack || reason, {maxArrayLength: null, depth:null })); });

//Main event emitter
mailMan
  //Ready event fire
  .once( 'ready' , async ( msg ) => { passFire.handleEvent('ready', msg, conMan, comHandle); comHandle = new exec(msg.guilds, msg); })
  
  //When guild fires audit logs
  .on( 'guildAuditLogEntryCreate' , async ( msg ) => { passFire.handleEvent('guildAuditLogEntryCreate', msg, conMan, comHandle); })
  
  //API guild create fire (Also old guilds)
  .on( 'guildCreate' , async ( msg ) => { passFire.handleEvent('guildCreate', msg, conMan, comHandle); })
  
  //API guild remove fire
  .on( 'guildDelete' , async ( msg ) => { passFire.handleEvent('guildDelete', msg, conMan, comHandle); })
  
  //Handle completion of commands
  .on( 'resolveCommands' , async ( msg ) => { passFire.handleEvent('resolveCommands', passClient, conMan, comHandle); })

  //Resumed event fire
  .on( 'resumed' , async ( msg ) => { passFire.handleEvent('resumed', msg, conMan, comHandle); })
  
  //Player Event start
  .on( 'playerPlay' , async ( msg ) => { passFire.handleEvent('playerPlay', msg, conMan, comHandle); })
  
  //Player event stop
  .on( 'playerEnd' , async ( msg ) => { passFire.handleEvent('playerEnd', msg, conMan); })
  
  //API interaction fire
  .on( 'interactionCreate' , async ( msg ) => { passClient = msg; mailMan.emit('resolveCommands', msg); passFire.handleEvent('interactionCreate', msg, conMan, comHandle); })
  
  //API message create fire
  .on( 'messageCreate' , async ( msg ) => { passFire.handleEvent('messageCreate', msg, conMan, comHandle); })
  
  //API guild update fire
  .on( 'guildUpdate' , async ( msg ) => { passFire.handleEvent('guildUpdate', msg, conMan, comHandle); })
  
  .on( 'guildJoinRequestUpdate' , async ( msg ) => { passFire.handleEvent('guildJoinRequestUpdate', msg, conMan, comHandle); })
  
  .on( 'guildJoinRequestDelete' , async ( msg ) => { passFire.handleEvent('guildJoinRequestDelete', msg, conMan, comHandle); })
  
  //API fire when user leaves guild
  .on( 'guildMemberRemove' , async ( msg ) => { passFire.handleEvent('guildMemberRemove', msg, conMan, comHandle); })
  
  //API fire when user joins guild
  .on( 'guildMemberAdd' , async ( msg ) => { passFire.handleEvent('guildMemberAdd', msg, conMan, comHandle); })
  
  //API fire when more than one message at once gets deleted
  .on( 'messageDeleteBulk' , async ( msg ) => { passFire.handleEvent('messageDeleteBulk', msg, conMan, comHandle); })
  
  //API fire when message gets edited
  .on( 'messageUpdate' , async ( msg ) => { passFire.handleEvent('messageUpdate', msg, conMan, comHandle); });
  
