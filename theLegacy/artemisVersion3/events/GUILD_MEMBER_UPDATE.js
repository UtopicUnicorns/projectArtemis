////////////////////////////////////
//When a member change occurs
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    const gld = await client.guilds.cache.get(c.d.guild_id);
    if (!gld) return;

    const msg = c.d;

    const mmbr = await gld.members.cache.get(msg.user.id);
    if (!mmbr) return;

    USERINFO = require("../modules/USERINFO");
    USERINFO.eventTrigger(c, client, CONFIG, npm, mmbr);
  },
};
