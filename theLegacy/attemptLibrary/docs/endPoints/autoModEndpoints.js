/*  List all automoderation rules from specified guild.  */
autoMod
  .listRules({  guild: 'guildId'  });

/*  Show specific rule.  */
autoMod
  .getRule({  guild: 'guildId',
              rule: 'autoModerationRuleId'  });

/*  Create a new automoderation rule.
    if triggerType is spam or harmfulLink then omit triggerMetadata.
    triggerMetadata refer to triggerMetadataObject.
    actions refer to actionsObject.
    enabled is a boolean if set to true will enable the rule.
    excludeRoles is an array of roleIds that should not be affected by the rule.
    excludeChannels is an array of channelIds that should not be affected by the rule.  */
autoMod
  .createRule({ guild: 'guildId',
                name: 'ruleName',
                eventType: eventTypeOption,
                triggerType: triggerTypeOption,
                triggerMetadata: triggerMetadataObject,
                actions: actionsObject,
                enabled: BOOLEAN,
                excludeRoles: [],
                excludeChannels: [] });

/*  Edit an automoderation rule.
    if triggerType is spam or harmfulLink then omit triggerMetadata.
    triggerMetadata refer to triggerMetadataObject.
    actions refer to actionsObject.
    enabled is a boolean if set to true will enable the rule.
    excludeRoles is an array of roleIds that should not be affected by the rule.
    excludeChannels is an array of channelIds that should not be affected by the rule.  */
autoMod
  .editRule({   guild: 'guildId',
                rule: 'ruleId',
                name: 'ruleName',
                eventType: eventTypeOption,
                triggerType: triggerTypeOption,
                triggerMetadata: triggerMetadataObject,
                actions: actionsObject,
                enabled: BOOLEAN,
                excludeRoles: [],
                excludeChannels: [] });

/*  Delete an automoderation rule.  */
automod
  .removeRule({ guild: 'guildId',
                rule: 'ruleId' });

/*  Additional info  */
/*  pick one  */
let eventTypeOption = ['messageSend'];

/*  pick one  */
let triggerTypeOption = ['keyWord', 'harmfulLink', 'spam', 'keyWordPreset'];

/*  if triggerType is keyWord.
    
    wordFilter guide:
      Prefix - word must start with the keyword
      Keyword	       Matches
      cat*	          catch, Catapult, CAttLE
      tra*	          train, trade, TRAditional
      the mat*	      the matrix
      
      Suffix - word must end with the keyword
      Keyword	       Matches
      *cat	          wildcat, copyCat
      *tra          	extra, ultra, orchesTRA
      *the            mat	breathe mat
      
      Anywhere - keyword can appear anywhere in the content
      Keyword	       Matches
      *cat*	         location, eduCation
      *tra*	         abstracted, outrage
      *the mat*	     breathe matter
      
      Whole Word - keyword is a full word or phrase and must be surrounded by whitespace
      Keyword	       Matches
      cat           	cat
      train         	train
      the mat       	the mat  
      
      if the triggerType is keyWordPreset refer to triggerMetadataObject2  */
let triggerMetadataObject = { keyword_filter: ['ban', '*the', 'wrong*', '*words*'] };

/*  From the presets you can pick one or more refer to presetsChoices.
    the allowList does not allow the use of the wildcard symbols  */
let triggerMetadataObject2 = { presets: presetsChoices,
                               allow_list: ['words', 'to', 'allow']};

/*  pick one  */
let presetsChoices = ['profanity', 'sexualContent', 'slurs'];

/*  The action object
    Needs to be put in an array as shown.
    You can pick ONE action type from actionTypeOption.
    If actionType is blockMessage then you can leave the metadata field empty like {}.
    if the actionType is sendAlert then metadata needs the entry channel_id.
    if the actionType is timeOut then the metadata needs the entry duration_seconds where max seconds can be 2419200.
    in actionsObject2 I will give a small example.  */
let actionsObject = [{ type: actionTypeOption,
                       metadata: { channel_id: 'channelId',
                                   duration_seconds: INTEGER }}];

let actionsObject2 = [{ type: 'blockMessage',
                       metadata: {}},
                     { type: 'sendAlert',
                       metadata: { channel_id: '1234567890' }},
                     { type: 'timeOut',
                       metadata: { duration_seconds: '1337' }}];

/*  pick one  */
let actionTypeOption = ['blockMessage', 'sendAlert', 'timeOut'];
