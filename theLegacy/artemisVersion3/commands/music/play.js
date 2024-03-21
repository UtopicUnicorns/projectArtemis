////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "play",
  description: "Play a song.",
  permission: "0",
  explain: `Play a song.
You need to be in a voice channel to use this command.

Example usage: (PREFIX)play Never gonna give you up
Example usage: (PREFIX)play https://www.youtube.com/watch?v=dQw4w9WgXcQ`,

  ////////////////////////////////////
  //We pass trough some predefined things
  //Within this command we can work with Client, raw content and a config file
  ////////////////////////////////////
  async execute(msg, client, CONFIG, npm, mmbr) {
    ////////////////////////////////////
    //We fetch the channel here
    //We can easely send with this const
    ////////////////////////////////////
    const snd = await client.channels.cache.get(msg.channel_id);

    ////////////////////////////////////
    //Defining the arguments here
    //Splits can happen later if needed
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);
    const comName = module.exports.name;
    const arguments = await msg.content.slice(
      prefix.length + comName.length + 1
    );

    ////////////////////////////////////
    //Main command starts here
    //Comments might get smaller here
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    const voiceChannel = mmbr.voice.channel;
    if (!voiceChannel)
      return snd.send("You need to be in a voice channel to play music!");
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return snd.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    async function song_get(url, dest, song) {
        const queue = client.queue;

        const serverQueue = client.queue.get(gld.id);

        if (!serverQueue) {
          const queueContruct = {
            textChannel: snd,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 30,
            playing: true,
          };

          queue.set(gld.id, queueContruct);

          queueContruct.songs.push(song);

          try {
            var connection = await voiceChannel.join();

            queueContruct.connection = connection;

            PLAYER.eventTrigger(client, gld, queueContruct.songs[0]);
          } catch (err) {
            queue.delete(gld.id);
            console.log(err);
            return snd.send("Something went wrong!");
          }
        } else {
          serverQueue.songs.push(song);

          let addSong = new Discord.MessageEmbed()
            .setThumbnail(song.thumb)
            .setColor("DARK_VIVID_PINK")
            .setAuthor(
              "Artemis Music Player",
              "https://artemis.rest/images/art_play.png"
            )
            .setTitle(`${song.title}`)
            .setDescription(
              `Views: ${song.view}\nLikes: ${song.like} / Dislikes: ${song.dislike}\nDuration: ${song.dur} seconds\n\nRequested by: ${song.req}`
            )
            .setFooter("Song added to queue");

          return snd.send({ embed: addSong });
        }
    }
      
    async function url_grab(url) {
      youtubedl(url, {
        format: "bestaudio[ext=webm]",
        dumpSingleJson: true,
      }).then(async (output) => {
        //console.log(output.original_url);
        let num = Math.random() * 1000;

        song = {
          url: output.original_url,
          view: output.view_count.toLocaleString(),
          dur: output.duration.toLocaleString(),
          title: output.title,
          like: output.like_count.toLocaleString(),
          dislike: "GONE",
          thumb: output.thumbnail,
          desc: output.description,
          req: `${mmbr.user.username}#${mmbr.user.discriminator}`,
        };
        try {
          snd.send(`Found song: \`${song.title}\``);
        } catch (err) {
          console.log('');
        }
        song_get(output.original_url, song.url, song);
      });
    }

    if (!arguments) {
      return snd.send(`Play a song.
You need to be in a voice channel to use this command.

Example usage: ${prefix}play Never gonna give you up
Example usage: ${prefix}play <https://www.youtube.com/watch?v=dQw4w9WgXcQ>`);
    }

    if (arguments.toLowerCase().startsWith("http")) {
      url_grab(arguments);
    } else {
      var opts = {
        maxResults: 1,
        key: await CONFIG.CONFIG("ytkey"),
      };

      search(arguments, opts, async function (err, results) {
        if (err) return snd.send("Something went wrong!");

        url_grab(results[0].link);
      });
    }
  },
};
