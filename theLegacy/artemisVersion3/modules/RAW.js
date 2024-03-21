////////////////////////////////////
//Raw event requires
//Saves space in main file to put it here
////////////////////////////////////
exports.raw = function() {
  onReady = require("../events/READY");
  onMessage = require("../events/MESSAGE_CREATE");
  onMessageU = require("../events/MESSAGE_UPDATE");
  onMessageD = require("../events/MESSAGE_DELETE");
  onMessageDB = require("../events/MESSAGE_DELETE_BULK");
  onMessageRA = require("../events/MESSAGE_REACTION_ADD");
  onMessageRR = require("../events/MESSAGE_REACTION_REMOVE");
  onMessageRRA = require("../events/MESSAGE_REACTION_REMOVE_ALL");
  onMessageRRE = require("../events/MESSAGE_REACTION_REMOVE_EMOJI");
  onInviteC = require("../events/INVITE_CREATE");
  onInviteD = require("../events/INVITE_DELETE");
  onWebhookU = require("../events/WEBHOOKS_UPDATE");
  onGuildC = require("../events/GUILD_CREATE");
  onGuildU = require("../events/GUILD_UPDATE");
  onGuildD = require("../events/GUILD_DELETE");
  onGuildRC = require("../events/GUILD_ROLE_CREATE");
  onGuildRU = require("../events/GUILD_ROLE_UPDATE");
  onGuildRD = require("../events/GUILD_ROLE_DELETE");
  onChannelC = require("../events/CHANNEL_CREATE");
  onChannelU = require("../events/CHANNEL_UPDATE");
  onChannelD = require("../events/CHANNEL_DELETE");
  onChannelPU = require("../events/CHANNEL_PINS_UPDATE");
  onGuildmemberA = require("../events/GUILD_MEMBER_ADD");
  onGuildmemberU = require("../events/GUILD_MEMBER_UPDATE");
  onGuildmemberR = require("../events/GUILD_MEMBER_REMOVE");
  onGuildbanA = require("../events/GUILD_BAN_ADD");
  onGuildbanR = require("../events/GUILD_BAN_REMOVE");
  onGuildemojiU = require("../events/GUILD_EMOJIS_UPDATE");
  onGuildintegrationsU = require("../events/GUILD_INTEGRATIONS_UPDATE");
  onVoicestateU = require("../events/VOICE_STATE_UPDATE");
  onPresenceU = require("../events/PRESENCE_UPDATE");
  onTypingS = require("../events/TYPING_START");
  onInteraction = require("../events/INTERACTION_CREATE");
};
