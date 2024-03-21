////////////////////////////////////
//The client gets defined here
//We pass this trough to nearly everything we can.
////////////////////////////////////
async function Initiate() {
  const Client = require("./modules/CLIENT");
  const client = new Client();
  // const client = new Client({
  //   intents: [
  //     Intents.FLAGS.GUILDS,
  //     Intents.FLAGS.GUILD_MEMBERS,
  //     Intents.FLAGS.GUILD_BANS,
  //     Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  //     Intents.FLAGS.GUILD_INTEGRATIONS,
  //     Intents.FLAGS.GUILD_WEBHOOKS,
  //     Intents.FLAGS.GUILD_INVITES,
  //     Intents.FLAGS.GUILD_VOICE_STATES,
  //     Intents.FLAGS.GUILD_PRESENCES,
  //     Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  //     Intents.FLAGS.GUILD_MESSAGE_TYPING,
  //     Intents.FLAGS.DIRECT_MESSAGES,
  //     Intents.FLAGS.GUILD_MESSAGES,
  //     Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  //     Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  //     Intents.FLAGS.GUILD_MESSAGE_TYPING
  //   ]
  // });
  require("discord-buttons")(client);

  ////////////////////////////////////
  //These are node modules
  //We call them here with a special function.
  ////////////////////////////////////
  npm = await require("./modules/NODE_CALL");
  npm.nodes();

  ////////////////////////////////////
  //Our config file is here
  //All important stuff is in it.
  ////////////////////////////////////
  const CONFIG = require("./modules/CONFIG");

  ////////////////////////////////////
  //We are requiring all the EVENTS
  //These can be called later in the RAW events.
  ////////////////////////////////////
  raw = require("./modules/RAW");
  raw.raw();

  ////////////////////////////////////
  //This is the READY trigger
  //We call an EVENTS function to handle this.
  ////////////////////////////////////
  client.once("ready", async c => {
    onReady.eventTrigger(c, client, CONFIG, npm);
  });

  ////////////////////////////////////
  //Twitch emmiter
  //We handle all twitch calls
  ////////////////////////////////////
  twitchEmitter.on("event", async dat => {
    //load module
    const twitchEmit = require("./modules/twitch.js");
    twitchEmit.twitchEmit(dat, client, CONFIG, npm);

    //next
  });

  ////////////////////////////////////
  //Button handler
  //We collect and receive all button events here.
  ////////////////////////////////////
  client.on("clickButton", async button => {
    await button.reply.defer();
  });

  ////////////////////////////////////
  //The magic of Artemis V3
  //RAW events get processed here
  ////////////////////////////////////
  client.on("raw", async c => {
    switch (c.t) {
      ////////////////////////////////////
      //This handles the messages
      //Anything related to it comes in here
      ////////////////////////////////////
      case "MESSAGE_CREATE":
        onMessage.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_UPDATE":
        onMessageU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_DELETE":
        onMessageD.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_DELETE_BULK":
        onMessageDB.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_REACTION_ADD":
        onMessageRA.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_REACTION_REMOVE":
        onMessageRR.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        onMessageRRA.eventTrigger(c, client, CONFIG, npm);
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        onMessageRRE.eventTrigger(c, client, CONFIG, npm);
        break;

      ////////////////////////////////////
      //Guild changes are handled here
      //Anything related to it comes in here
      ////////////////////////////////////
      case "INVITE_CREATE":
        onInviteC.eventTrigger(c, client, CONFIG, npm);
        break;
      case "INVITE_DELETE":
        onInviteD.eventTrigger(c, client, CONFIG, npm);
        break;
      case "WEBHOOKS_UPDATE":
        onWebhookU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_CREATE":
        onGuildC.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_UPDATE":
        onGuildU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_DELETE":
        onGuildD.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_ROLE_CREATE":
        onGuildRC.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_ROLE_UPDATE":
        onGuildRU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_ROLE_DELETE":
        onGuildRD.eventTrigger(c, client, CONFIG, npm);
        break;
      case "CHANNEL_CREATE":
        onChannelC.eventTrigger(c, client, CONFIG, npm);
        break;
      case "CHANNEL_UPDATE":
        onChannelU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "CHANNEL_DELETE":
        onChannelD.eventTrigger(c, client, CONFIG, npm);
        break;
      case "CHANNEL_PINS_UPDATE":
        onChannelPU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_MEMBER_ADD":
        onGuildmemberA.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_MEMBER_UPDATE":
        onGuildmemberU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_MEMBER_REMOVE":
        onGuildmemberR.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_BAN_ADD":
        onGuildbanA.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_BAN_REMOVE":
        onGuildbanR.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_EMOJIS_UPDATE":
        onGuildemojiU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        onGuildintegrationsU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "VOICE_STATE_UPDATE":
        onVoicestateU.eventTrigger(c, client, CONFIG, npm);
        break;
      case "PRESENCE_UPDATE":
        onPresenceU.eventTrigger(c, client, CONFIG, npm);
        break;

      ////////////////////////////////////
      //Misc events
      //Anything related to it comes in here
      ////////////////////////////////////
      case "TYPING_START":
        onTypingS.eventTrigger(c, client, CONFIG, npm);
        break;

      case "INTERACTION_CREATE":
        onInteraction.eventTrigger(c, client, CONFIG, npm);
        break;
    }
  });

  ////////////////////////////////////
  //Here we login to get verified
  //We call this code from a seperate file.
  ////////////////////////////////////
  client.login(CONFIG.CONFIG("LOGIN"));
}
Initiate();
