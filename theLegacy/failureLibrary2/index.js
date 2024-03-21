/*We want to start the bot in async
So we use a special function that does that for us.*/
async function start() {
	try {
		await require('./djbsf_library/index').lib("../configs.json"); //Import library

		/*When requested, commands get output trough here*/
		mail_man.on('view_slash', async (client) => {});

		/*On any interaction this gets triggered*/
		mail_man.on('INTERACTION_CREATE', async (client) => {
			action.user_cache('127708549118689280', client);

			action.receive_interaction({ content: 'test', type: 4 }, client);
		});

		mail_man.on('MESSAGE_CREATE', async (client) => {});

		/*When a ready event is emitted we will handle it here, you can decide to change .on() to .once()*/
		mail_man.once('READY', async (client) => {
			setInterval(async () => {
				action.presence_update(
					{
						since: action.tell_time(),
						activities: [
							{
								name: `${action.tell_time('full')} || ${client.message.d.guilds.length} Servers || ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)} MB ram`,
								type: 0,
							},
						],
						status: 'dnd',
						afk: false,
					},
					client
				);
			}, 10000);
		});
	} catch (error) {
		console.log(error);
	}
}

start(); //Start async
