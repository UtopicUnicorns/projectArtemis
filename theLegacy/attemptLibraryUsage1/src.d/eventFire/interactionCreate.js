module.exports = {
  async execute( eventState, msg, conMan, comHandle ) {
    //Load command handler, fire file as new
    comHandle.exec(msg.data.name, msg, conMan); 
  },
};

