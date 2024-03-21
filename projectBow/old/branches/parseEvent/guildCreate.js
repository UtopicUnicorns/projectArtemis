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
      guildInfo: { /* Guild object */
        guildId: data.eventData.id, /* guild ID */
        guildName: data.eventData.name, /* guild name */
        guildDescription: data.eventData.description, /* guild description */
        ownerId: data.eventData.owner_id, /* id of guild owner */
        systemChannel: data.eventData.system_channel_id, /* Where join, boost messages are send */
        rulesChannel: data.eventData.rules_channel_id, /* Where the rules are located */
        safetyAlerts: data.eventData.safety_alerts_channel_id, /* Where are safety alerts send to */
        vanityCode: data.eventData.vanity_url_code, /* Vanity invite */
        memberCount: data.eventData.member_count, /* Estimated user count */
        channelCount: data.eventData.channels.length, /* How many channels */
        threadCount: data.eventData.threads.length, /* how many threads */
        stickerCount: data.eventData.stickers.length, /* How many stickers */
        roleCount: data.eventData.roles.length, /* How many roles */
        emojiCount: data.eventData.emojis.length, /* how many emotes */
        soundBoardCount: data.eventData.soundboard_sounds.length, /* How many soundboard clips */
      } 
    }

    if(data.eventData.icon) { /* parse icon */
      let newIcon = { /* new icon object */
        'png': `${globalsJSON.discordCdn}icons/${data.eventData.id}/${data.eventData.icon}.png`,
        'jpg': `${globalsJSON.discordCdn}icons/${data.eventData.id}/${data.eventData.icon}.jpg`,
        'webp': `${globalsJSON.discordCdn}icons/${data.eventData.id}/${data.eventData.icon}.webp`
      }
      
      if(data.eventData.icon.startsWith('a_')) newIcon.gif = `${globalsJSON.discordCdn}icons/${data.eventData.id}/${data.eventData.icon}.gif`; /* if animated */
      
      toGiveBack.guildInfo.icon = newIcon; /* insert new field */
    }

    if(data.eventData.banner) { /* parse banner */
      let newBanner = { /* new banner object */
        'png': `${globalsJSON.discordCdn}banners/${data.eventData.id}/${data.eventData.banner}.png`,
        'jpg': `${globalsJSON.discordCdn}banners/${data.eventData.id}/${data.eventData.banner}.jpg`,
        'webp': `${globalsJSON.discordCdn}banners/${data.eventData.id}/${data.eventData.banner}.webp`
      }
      
      if(data.eventData.banner.startsWith('a_')) newBanner.gif = `${globalsJSON.discordCdn}banners/${data.eventData.id}/${data.eventData.banner}.gif`; /* if animated */
      
      toGiveBack.guildInfo.banner = newBanner; /* insert new field */
    }

    if(data.eventData.splash) { /* parse splash */
      let newSplash = { /* new splash object */
        'png': `${globalsJSON.discordCdn}splashes/${data.eventData.id}/${data.eventData.splash}.png`,
        'jpg': `${globalsJSON.discordCdn}splashes/${data.eventData.id}/${data.eventData.splash}.jpg`,
        'webp': `${globalsJSON.discordCdn}splashes/${data.eventData.id}/${data.eventData.splash}.webp`
      }
      
      toGiveBack.guildInfo.splash = newSplash; /* insert new field */
    }

    if(data.eventData.discovery_splash) { /* parse discover splash */
      let newDiscoverSplash = { /* new discover splash object */
        'png': `${globalsJSON.discordCdn}discovery-splashes/${data.eventData.id}/${data.eventData.discovery_splash}.png`,
        'jpg': `${globalsJSON.discordCdn}discovery-splashes/${data.eventData.id}/${data.eventData.discovery_splash}.jpg`,
        'webp': `${globalsJSON.discordCdn}discovery-splashes/${data.eventData.id}/${data.eventData.discovery_splash}.webp`
      }
      
      toGiveBack.guildInfo.discoverySpash = newDiscoverSplash; /* insert new field */
    }

    if(data.eventData.roles) { /* incase there are roles */
      toGiveBack.guildRoles = {}; /* guildRoles collector */
      
      for(let i of data.eventData.roles) { /* Loop over roles */
        let roleBuild = { /* role object */
          name: i.name, /* rolename */
          id: i.id, /* roleId */
          position: i.position, /* role position */
          permissions: i.permissions /* role permissions */
        }
        
        if(i.color) roleBuild.colour = i.color; /* role colour nor: i.color.toString(16) rev: parseInt(0xi.color) */
        
        if(i.unicode_emoji) roleBuild.unicodeEmoji = i.unicode_emoji; /* if emoji is unicode */
        
        if(i.icon) { /* if emoji is icon */
          roleBuild.icon = { /* icon field */
            'png': `${globalsJSON.discordCdn}role-icons/${i.id}/${i.icon}.png`,
            'jpg': `${globalsJSON.discordCdn}role-icons/${i.id}/${i.icon}.jpg`,
            'webp': `${globalsJSON.discordCdn}role-icons/${i.id}/${i.icon}.webp`
          };
        }
        
        toGiveBack.guildRoles[i.id] = roleBuild; /* insert roles */
      }
    }

    if(data.eventData.members) { /* incase there are members */
      toGiveBack.guildMembers = {}; /* guildMember collector */
      
      for(let i of data.eventData.members) { /* Loop over every member */
        let userBuild = { /* guildmember object */
          userName: i.user.username, /* username */
          userId: i.user.id, /* user is */
          joinedAt: new Date(i.joined_at).getTime() /* joined guild in unix time */
        };

        if(i.roles) { /* roles user has */
          userBuild.roles = {}; /* role collector */
          
          for(let a of i.roles) { /* loop over roles */
            userBuild.roles[toGiveBack.guildRoles[a].id] = toGiveBack.guildRoles[a]; /* Attach role to user */
          }
        }

        if(i.user.avatar) { /* parse avatar */
          let newAvatar = { /* parse to url */
            'png': `${globalsJSON.discordCdn}avatars/${i.user.id}/${i.user.avatar}.png`,
            'jpg': `${globalsJSON.discordCdn}avatars/${i.user.id}/${i.user.avatar}.jpg`,
            'webp': `${globalsJSON.discordCdn}avatars/${i.user.id}/${i.user.avatar}.webp`
          }
          
          if(i.user.avatar.startsWith('a_')) newAvatar.gif = `${globalsJSON.discordCdn}avatars/${i.user.id}/${i.user.avatar}.gif`; /* if avatar is animated */
          
          userBuild.avatar = newAvatar; /* new avatar field */
        }
        
        toGiveBack.guildMembers[i.user.id] = userBuild; /* Insert guild member */
      }
    }


    console.log(toGiveBack);
    //console.log(data.eventData, toGiveBack); /*  */
  } catch(e) { /* When stuff goes wrong, fire error and unparsed event */
    branch.emit('logger', 'parseError', `Shard ${data.shardNumber} reports: `, e); /* Emit error */
    branch.emit(data.eventName, 'error parsing, refer to data field for unparsed data', data) /* Emit unparsed */
  }
}

