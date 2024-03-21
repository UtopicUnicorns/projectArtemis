/*	List all scheduled events in specified guildId.
		count if true will make an estimate of how many users subscribed to event.	*/
guildEvent
	.listEvents({ guild: 'guildId',
								count: BOOLEAN });				

/*	Create a scheduled event.
		channel is an optional field if entityType is external.
		privacyLevel decides if the event is for guild only or not.
		entityMetadata is required for events of the external type.
		with the image make sure to use a full or partial path to your image.	*/
guildEvent
	.createEvent({	guild: 'guildId',
									channel: 'channelId',
									entityMetadata: { location: 'locationString' },
									name: 'eventName',
									privacyLevel: privacyLevelOption,
									startTime: 'ISO8601timestamp',
									endTime: 'ISO8601timestamp',
									description: 'eventDescription',
									entityType: entityTypeOption,
									image: 'fileName.ext'	});				

/*	Get a specified guild event.
		count if true will make an estimate of how many users subscribed to event.	*/
guildEvent
	.getEvent({ guild: 'guildId',
							event: 'eventId',
							count: BOOLEAN });				

/*	Edit a scheduled event.
		channel is an optional field if entityType is external.
		privacyLevel decides if the event is for guild only or not.
		entityMetadata is required for events of the external type.
		with the image make sure to use a full or partial path to your image.	
		with the status entry you can manually change the status of the event.	*/
guildEvent
	.editEvent({	guild: 'guildId',
								event: 'eventId',
								channel: 'channelId',
								entityMetadata: { location: 'locationString' },
								name: 'eventName',
								privacyLevel: privacyLevelOption,
								startTime: 'ISO8601timestamp',
								endTime: 'ISO8601timestamp',
								description: 'eventDescription',
								entityType: entityTypeOption,
								image: 'fileName.ext',
								status: statusOption	});				

/*	Delete a specified event.	*/
guildEvent
	.deleteEvent({	guild: 'guildId',
									event: 'eventId'	});				

/*	Get a list of users who are subscribed to the event.
		limit is a number between 1 and 100.
		if withMember is true, will return extra available member data.
		before and after are both fields that decide from where the information continues.	*/
guildEvent
	.getEventUsers({	guild: 'guildId',
										event: 'eventId',
										limit: INTEGER,
										withMember: BOOLEAN,
										before: 'userId',
										after: 'userId'	});	

/*	Additional info.	*/

let entityTypeOption = ['stageInstance', 'voice', 'external'];

let privacyLevelOption = ['guildOnly'];

let statusOption = ['scheduled', 'active', 'completed', 'canceled'];
