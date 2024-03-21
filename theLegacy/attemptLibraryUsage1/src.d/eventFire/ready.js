module.exports = {
  async execute( eventState, msg, conMan ) {
    //Small console message
    console.log(`Ready @ ${time.clock().eu} for ${msg.guilds.length} servers.`);
    
    //Connect to baseline sql
    //const connectionSet = conMan.sqlConnect(configData);
    
    //Set presence to load
    presence.set({
        status: 'dnd', 
        activities: {
        name: '⌛ Syncing commands', 
        type: 'watching'
      }}, msg);
  },
};

