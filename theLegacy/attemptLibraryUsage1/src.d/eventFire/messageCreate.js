module.exports = {
  async execute( eventState, msg, conMan ) {
    //Ignore bots
    if(msg.author.bot) return;
    
    //If author, fire sql event
    if(msg.author) conMan.msgHandle(msg);
    
    //Test
    if(msg.content.toLowerCase().startsWith('uptime')) {
      function format(seconds){
        function pad(s){
          return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60*60));
        var minutes = Math.floor(seconds % (60*60) / 60);
        var seconds = Math.floor(seconds % 60);
      
        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
      }
      
      var uptime = process.uptime();
      console.log(format(uptime));
    }
    
    if(msg.content.toLowerCase().startsWith('artemis')) {
      
        let sendInput = 'Hello!';
        if(msg.content.toLowerCase().slice(8)) sendInput = msg.content.toLowerCase().slice(8);
        
        let jsonData = {"inputs": {"text": sendInput}};
        const dataBack = await fly.send(JSON.stringify(jsonData), 
        '/models/EnterNameBros/Senko-san-medium-scl', 
        'POST', 
        'api-inference.huggingface.co', 
        443, 
        { 'Authorization': `Bearer ${configData.keyMe}`,
         }); 
        
        let toChat = 'My brain is corrupting, please hang on.';
        if(dataBack) if(dataBack.generated_text) toChat = dataBack.generated_text.slice(0,2000);
        channel.msgSend({	
          content: toChat,
          channel: msg.channel_id
       });	
     
    }
  },
};

