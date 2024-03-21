/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
export async function toParseMe( data ) { /* Parser function to export */
  try { /* Use try..catch to ensure flow */
    let toGiveBack = { /* Parsed data */
      eventName: data.eventName, /* Received event name */
      eventTime: Date.now(), /* in unixtime */
      onShard: data.shardNumber, /* On which shard */
      botUser: data.eventData.user, /* user field */
      guildCount: data.eventData.guilds.length /* guild count */
    }

    if(toGiveBack.botUser.avatar) { /* parse avatar */
      let newAvatar = { /* parse to url */
      'png': `${globalsJSON.discordCdn}avatars/${toGiveBack.botUser.id}/${toGiveBack.botUser.avatar}.png`,
      'jpg': `${globalsJSON.discordCdn}avatars/${toGiveBack.botUser.id}/${toGiveBack.botUser.avatar}.jpg`,
      'webp': `${globalsJSON.discordCdn}avatars/${toGiveBack.botUser.id}/${toGiveBack.botUser.avatar}.webp`
      }
    
    if(toGiveBack.botUser.avatar.startsWith('a_')) newAvatar.gif = `${globalsJSON.discordCdn}avatars/${toGiveBack.botUser.id}/${toGiveBack.botUser.avatar}.gif`; /* if avatar is animated */
      toGiveBack.botUser.avatar = newAvatar; /* new avatar field */
    }

    cache.insertUser(toGiveBack.botUser); /* send user to cache */
    
    treeBranch.emit(data.eventName, toGiveBack, data); /* send event */
  } catch(e) { /* When stuff goes wrong, fire error and unparsed event */
    treeBranch.emit('logger', 'parseError', `Shard ${data.shardNumber} reports: `, e); /* Emit error */
    treeBranch.emit(data.eventName, 'error parsing, refer to data field for unparsed data', data) /* Emit unparsed */
  }
}

