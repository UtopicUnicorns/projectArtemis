/*  Get information about your own bot user.  */
user
  .getMe();

/*  Get information about specified user.  */
user
  .get({  user: 'userId'  });
  
/*  Get information about specified user.  */
user
  .editMe({ username: 'newUsername',
            avatar: 'fileName.ext' });

/*  Get list of guilds your bot user is in.
    before and after is placement of where the list should output data.
    limit can be between 1 and 200.  */
user
  .getMyGuilds({  before: 'guildId',
                  after: 'guildId',
                  limit: INTEGER  });

/*  Get information about your bot user in specified guild.  */
user
  .getMeInGuild({  guild: 'guildId'  });

/*  Guess what this does.  */
user
  .leaveGuild({  guild: 'guildId'  });

/*  Creates a new DM channel object with target userId.  */
user
  .initDM({  user: 'userId'  });

/*  Creates a new group DM channel object with target(s) access tokens in the accessTokens array.  */
user
  .initDM({  accessTokens: []  });

/*  Get all connections about your bot user.  */
user
  .getMyConnections();
  
