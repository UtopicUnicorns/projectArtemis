/*  Create a stage instance in the channelId provided.
    topic may be between 1 and 120 characters.
    privacyLevel refer to privacyLevelOption pick one.
    sendNotification if true will notify everyone that stage started.  */
stage
  .create({ channel: 'channelId',
            topic: 'topicText',
            privacyLevel: privacyLevelOption,
            sendNotification: BOOLEAN });

/*  Get info about the stage instance.  */  
stage
  .get({  channel: 'channelId'  });

/*  Edit the stage instance you provided with channelId.  
    topic may be between 1 and 120 characters.
    privacyLevel refer to privacyLevelOption pick one.  */
stage
  .edit({ channel: 'channelId',
          topic: 'topicText',
          privacyLevel: privacyLevelOption });

/*  Delete stage instance provided by channelId.  */  
stage
  .delete({  channel: 'channelId'  });
         
/*  Additional info  */
let privacyLevelOption = ['public', 'guildOnly'];


