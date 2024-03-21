class passFire { 
  constructor() {
    this.firePassing;
  }
  
  async handleEvent( eventState, msg, conMan, comHandle ) {
    try {
      const eventNameFile = `${__dirname}/${eventState}.js`;
      await delete require.cache[require.resolve(eventNameFile)];
      const passTroughEvent = await require(eventNameFile);
      passTroughEvent.execute(eventState, msg, conMan, comHandle);
    } catch (err) {
      //Event not found
      if (!fs.existsSync(`${__dirname}/${eventState}.js`)) {
        fs.writeFile(`${__dirname}/${eventState}.js`, 'module.exports = {\n  async execute( eventState, msg, conMan ) {\n    \n  },\n};\n', function (err) { if (err) throw err; });
      } else {
        console.log(`${err.stack.split('\n')[0]} reports:\n${err.message}\n`);
      }
    }
    return this;
  }
}

//Export fireHandle
module.exports = passFire;

