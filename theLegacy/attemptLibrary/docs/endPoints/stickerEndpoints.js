/*   Get sticker information by providing the stickerId.   */
sticker
  .get({  sticker: 'stickerId'  });
  
/*   List nitro sticker packs.   */
sticker
  .listNitroPacks();

/*   List stickers from specified guild.   */
sticker
  .getGuildsticker({  guild: 'guildId'  });

/*  Get information about specified stickerId.   */
sticker
  .getGuildstickers({  guild: 'guildId',
                       sticker: 'stickerId'  });

/*   Create a sticker in provided guildId.
     name needs to be unique and needs to be between 2 and 30 characters.
     description may be empty or between 2 and 100 characters.
     tags I don't fucking know what this is.
     for the file make sure to use a proper full or partial path to your image. 
     accepted image types are png, apng and lottie.   */
sticker
  .create({ guild: 'guildId',
            name: 'stickerName',
            description: 'stickerDescription',
            tags: 'autoCompleteSuggestions',
            file: 'fileName.ext' });

/*   Edit a sticker in provided guildId.
     name needs to be unique and needs to be between 2 and 30 characters.
     description may be empty or between 2 and 100 characters.
     tags I don't fucking know what this is.  */
sticker
  .edit({ guild: 'guildId',
          sticker: 'stickerId',
          name: 'stickerName',
          description: 'stickerDescription',
          tags: 'autoCompleteSuggestions' });

/*  Delete specified sticker.   */
sticker
  .delete({  guild: 'guildId',
             sticker: 'stickerId'  });
             
