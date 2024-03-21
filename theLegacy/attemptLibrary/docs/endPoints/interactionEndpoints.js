/*  interaction response create.
    data field can be ommited when type is pong.  
    you can use type channelMessage without data field to trigger an error catch on purpose to have a completely
      silent interaction. Not intented I suppose, but it works.  */
interaction
  .create({ id: 'interactionId',
            token: 'interactionToken',
            type: typeSelect,
            data: dataObject });

/*   Returns the original response.
     provide threadId if in thread.   */
interaction
   .getOriginalResponse({ token: 'interactionToken',
                          thread: 'threadId' }); 

/*  Edit a previously send interaction message.
    threadId is a must when message is in thread.  */
interaction
   .editOriginalResponse({ token: 'interactionToken',
                           thread: 'threadId',
                           content: 'message content',
                           embeds: embedObject,
                           attachments: attachmentObject,
                           components: componentObject }); 

/*   Remove a previously send original interaction.   */
interaction
   .deleteOriginalResponse({ token: 'interactionToken' }); 

/*  Create a followup message for previously interaction send.
    threadId is a must when message is in thread.  */
interaction
   .createFollowupResponse({ token: 'interactionToken',
                             thread: 'threadId',
                             content: 'message content',
                             embeds: embedObject,
                             attachments: attachmentObject,
                             components: componentObject }); 

/*   Returns the followup response.
     provide threadId if in thread.   */
interaction
   .getFollowupResponse({ token: 'interactionToken',
                          message: 'messageId',
                          thread: 'threadId' }); 

/*  Edit a previously send followup message.
    threadId is a must when message is in thread.  */
interaction
   .editFollowupResponse({ token: 'interactionToken',
                           message: 'messageId',
                           thread: 'threadId',
                           content: 'message content',
                           embeds: embedObject,
                           attachments: attachmentObject,
                           components: componentObject }); 

/*   Remove a previously send followup.   */
interaction
   .deleteFollowupResponse({ token: 'interactionToken' }); 
          
/*  additional info  */
let typeSelect = [ 'pong', 'channelMessage', 'deferedChannelMessage', 'deferedUpdateMessage', 
                   'updateMessage', 'appCommandAutocompleteResult', 'modal'];

/*   visibleForAll is a omitable field, if it's there and true will only show message to message caster.   */
let dataObject = { content: 'Message Content',
                   visibleForAll: BOOLEAN,
                   tts: BOOLEAN,
                   components: componentObject,
                   embeds: embedObject,
                   attachments: attachmentObject };
                   
let attachmentObject = [
                        { file: 'fileName.ext',
                          description: 'first attachment',
                          filename: 'fileName.ext' },
                        { file: 'fileName.ext',
                          description: 'second attachment',
                          filename: 'fileName.ext' }
                       ];

let componentObject = new component()
                      .menu({ custom_id: 'UniqueID', 
                              place_holder: 'Unique', 
                              min_val: 1, 
                              max_val: 3 })
                      .entry({ label: 'Unique Label', 
                               value: 'UniqueVAL', 
                               description: 'Unique Description', 
                               default: true, 
                               emoji: { id: "EmojiID" } })
                      .entry({ label: 'Unique Label', 
                               value: 'UniqueVAL', 
                               description: 'Unique Description', 
                               default: false })
                      .entry({ label: 'Unique Label', 
                               value: 'UniqueVAL', 
                               description: 'Unique Description', 
                               default: false })
                   .output;

let componentObject2 = new component()
                            .button({ label: 'Unique Label', 
                                      custom_id: 'UniqueID', 
                                      style: 1, 
                                      disabled: true })
                            .button({ label: 'Unique Label', 
                                      custom_id: 'UniqueID', 
                                      style: 2 })
                            .button({ label: 'Unique Label', 
                                      custom_id: 'UniqueID', 
                                      style: 3 })
                            .button({ label: 'Unique Label', 
                                      custom_id: 'UniqueID', 
                                      style: 4, 
                                      emoji: { id: 'EmojiID' } })
                            .button({ label: 'Unique Label', 
                                      style: 5, 
                                      url: 'https://artemis.rest' })
                             .output;

let embedObject = new embed()
                       .field('Field Title', 'Field Content', true)
                       .description('Description')
                       .color('FF0000')
                       .title('Title')
                       .url('Website Entry')
                       .author('Name Entry', 'Icon Entry', 'Website Entry')
                       .thumbnail('Image Entry')
                       .image('Image Entry')
                       .footer('Footer Content', 'Icon Entry')
                       .timestamp()
                       .output;  

let modalCreate = new component()
                  .modal({ title: 'Title name',
                           customId: 'custom_id',
                           label: 'labelName',
                           style: styleSelect,
                           minLength: INTEGER,
                           maxLength: INTEGER,
                           placeHolder: 'Placeholder text',
                           required: BOOLEAN });

let styleSelect = ['short', 'multi'];
