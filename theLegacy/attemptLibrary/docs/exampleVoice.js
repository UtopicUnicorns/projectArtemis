/*  When a song starting or next song starts playing the music player fires off an event.  */
mailMan.on('playerPlay', async (msg) => {  console.log(msg);  });

/*  When player is done it  will fire off an event.  */
mailMan.on('playerEnd', async (msg) => {  console.log(msg);  });

/*  Connecting to a voice channel.
    NOTE: command for this is the channelId you want the bot to connect to!
    It is not necesarely the same as the channel's channelId.  */
voice.connect({ command: 'channelId',
                channel: 'channelId', 
                guild: 'guildId',
                user: memberObject });

/*  Playing a song or/and adding to queue.  */
voice.play({  command: { query: 'searchTerm or http(s) link' },
              channel: 'channelId', 
              guild: 'guildId',
              user: memberObject  });

/*  return a queue.  */
voice.queue({ channel: 'channelId', 
              guild: 'guildId',
              user: memberObject });

/*  Skip current playing song.  */
voice.skip({  channel: 'channelId', 
              guild: 'guildId',
              user: memberObject  });

/*  Pause the music player.  */
voice.pause({ channel: 'channelId', 
              guild: 'guildId',
              user: memberObject });

/*  Resume the music player.  */
voice.resume({  channel: 'channelId', 
                guild: 'guildId',
                user: memberObject  });

/*  Change the player volume.
    integer needs to be between 1 and 100.  */
voice.volume({  command: INTEGER,
                channel: 'channelId', 
                guild: 'guildId',
                user: memberObject  });

/*  Stop the player.  */
voice.stop({  channel: 'channelId', 
              guild: 'guildId',
              user: memberObject  });

/*  Control song pitch(experimental).
    available pitched are: off, down, up.  */
voice.pitch({ command: 'pitch',
              channel: 'channelId', 
              guild: 'guildId',
              user: memberObject });

/*  Example memberObject
{
  user: {
    username: '.initrd',
    public_flags: 131138,
    id: '127708549118689280',
    discriminator: '0383',
    avatar_decoration: null,
    avatar: '186c71c09830e8139f1d457aa4611a39'
  },
  roles: [ '665332374627942400', '881457478246752276', '680119489634762845' ],
  premium_since: null,
  permissions: '4398046511103',
  pending: false,
  nick: null,
  mute: false,
  joined_at: '2019-12-29T23:31:19.248000+00:00',
  is_pending: false,
  flags: 0,
  deaf: false,
  communication_disabled_until: null,
  avatar: null
}
*/
