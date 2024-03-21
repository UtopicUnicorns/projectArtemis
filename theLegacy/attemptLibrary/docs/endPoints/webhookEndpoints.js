/*  Creates a new webhook.
    make sure to provide a proper full or partial path to the avatar image.  */
webhook
  .create({ name: 'webhookName',
            avatar: 'fileName.ext' });

/*  Get specified channels existing webhooks. */
webhook
  .getChannelHooks({  channel: 'channelId'  });
  
/*  Get specified guild existing webhooks. */
webhook
  .getGuildHooks({  guild: 'guildId'  });

/*  Get specified webhook. */
webhook
  .getHook({  webhook: 'webhookId'  });

/*  Get specified webhook with id and token. */
webhook
  .getHookWithToken({ webhook: 'webhookId',
                      token: 'webhookToken' });

/*  Edit an existing webhook.
    channel just refers to a new channel if you want to move the hook.
    make sure to have a proper full or partial path for the avatar image.  */
webhook
  .editHook({ name: 'webhookName',
              avatar: 'fileName.ext',
              channel: 'newChannelId',
              webhook: 'webhookId' });

/*  Edit an existing webhook.... but with a token..
    make sure to have a proper full or partial path for the avatar image.  */
webhook
  .editHookWithToken({  name: 'webhookName',
                        avatar: 'fileName.ext',
                        token: 'webhookToken',
                        webhook: 'webhookId' });

/*  Delete a webhook by id.  */
webhook
  .deleteHook({  webhook: 'webhookId'  });

/*  Delete a webhook by id and token.  */
webhook
  .deleteHookWithToken({  webhook: 'webhookId',
                          token: 'webhookToken'  });

/*	Send a message trough a webhook.
    if thread(threadId) is provided, do not provide threadName and vice versa.
    avatar may only be an URL to an image.
		components refer to componentObject and componentObject2.
		embeds refer to embedObject.
		attachments refer to attachmentObject.  */
webhook
	.execHook({ webhook: 'webhookId',
              token: 'webhookToken',
              thread: 'threadId',
              threadName: 'threadName',
              content: 'Message Content',
              username: 'overwriteHookusername',
              avatar: 'provideImageUrl',
							tts: BOOLEAN,
							components: componentObject,
							embeds: embedObject,
							attachments: attachmentObject });

/*  Send a slack message, can provide threadId if needed.  */
webhook
  .execSlackHook({  webhook: 'webhookId',
                    token: 'webhookToken', 
                    thread: 'threadId' });

/*  Send a gitHub message, can provide threadId if needed.  */
webhook
  .execGitHook({  webhook: 'webhookId',
                  token: 'webhookToken', 
                  thread: 'threadId' });

/*  Get a message send by a webHook.  */
webhook
  .getHookMessage({ webhook: 'webhookId',
                    token: 'webhookToken',
                    message: 'messageId',
                    thread: 'threadId' });

/*	Edit a message send trough a webhook.
    thread is for threadId if message is in there.
		components refer to componentObject and componentObject2.
		embeds refer to embedObject.
		attachments refer to attachmentObject.  */
webhook
	.editHookMessage({  webhook: 'webhookId',
                      token: 'webhookToken',
                      message: 'messageId',
                      thread: 'threadId',
                      content: 'Message Content',
                      components: componentObject,
                      embeds: embedObject,
                      attachments: attachmentObject });

/*  Delete a message send by a webhook.  */
webhook
  .deleteHookMessage({  webhook: 'webhookId',
                        token: 'webhookToken',
                        message: 'messageId',
                        thread: 'threadId' });
  
/*  Additional info  */
/*	the attachment object is an array and in the array each entry is a JSON structure.
		file is the file you want to send, make sure to specify the path properly, accepts full as wel as partial paths.
		description is somewhat like an alt for images.
		filename is what Discord will display as its filename, use the same extention as your file though.	
		using something like attachment://filename in an embed image/icon field will display the uploaded image.	*/
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
													.entry({	label: 'Unique Label', 
																		value: 'UniqueVAL', 
																		description: 'Unique Description', 
																		default: true, 
																		emoji: { id: "EmojiID" } })
													.entry({	label: 'Unique Label', 
																		value: 'UniqueVAL', 
																		description: 'Unique Description', 
																		default: false })
													.entry({	label: 'Unique Label', 
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
