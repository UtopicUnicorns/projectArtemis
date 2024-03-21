////////////////////////////////////
//This is the config file, we will set all
//Important stuff here!
////////////////////////////////////
module.exports = {
  CONFIG: function (TOKEN) {
    switch (TOKEN) {
      case "LOGIN": //Bot login token
        return (TOKEN = "BOT_TOKEN_HERE");
        break;
      case "OWNER": //Bot Owner user ID
        return (TOKEN = "OWNER_ID_HERE");
        break;
      case "CURRENCY": //Currency for virtual points kek
        return (TOKEN = "CURRENCY SYMBOL HERE");
        break;
      case "MAIN_LOG": //Main bot log channel
        return (TOKEN = "DISCORD_BOT_LOG_CHANNEL");
        break;
      case "TWITCH_ID": //Twitch first id
        return (TOKEN = "TWITCH_ID");
        break;
      case "TWITCH_SECRET": //Twitch first secret
        return (TOKEN = "TWITCH_SECRET");
        break;
      case "TRANSLATE_TOKEN": //Translation token
        return (TOKEN = "TRANSLATION_API_CODE");
        break;
      case "privkey": //privkey token
        return (TOKEN = "privkey.pem");
        break;
      case "cert": //cert token
        return (TOKEN = "cert.pem");
        break;
      case "chain": //chain token
        return (TOKEN = "chain.pem");
        break;
      case "ytkey":
        return (TOKEN = "YOUTUBE_KEY");
        break;
      case "oauthport":
        return (TOKEN = "PORT");
        break;
      case "oauthclientid":
        return (TOKEN = "ID");
        break;
      case "oauthclientsecret":
        return (TOKEN = "SECRET");
        break;
    }
  },
  PREFIX: async function (TOKEN, ID) {
    switch (TOKEN) {
      case "PREFIX": //Prefix loading
        try {
          let DBS = require("better-sqlite3")("./modules/DATABASE.sqlite");
          let GG = DBS.prepare("SELECT * FROM settings WHERE guildid = ?");
          let prefix = await GG.get(ID);
          return (TOKEN = prefix.prefix);
        } catch (err) {
          return (TOKEN = "a!");
        }
        break;
    }
  },
};
