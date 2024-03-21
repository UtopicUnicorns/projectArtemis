exports.summon_modules = async function (config) {
	https = await require('https');
	fs = await require('fs');
	ws = await require('./web_socket');
	fd = await require('./form_data');
	path = await require('path');

	configuration_data = await require(config);
	token = await configuration_data.bot_token;
	application_id = configuration_data.application_id;
	intents_num = configuration_data.intents_num;

	https_construct = await require('./classes/https_class');
	fly = new https_construct();

	message_construct = await require('./classes/message_class');
	message = new message_construct();
	channel_construct = await require('./classes/channel_class');
	channel = new channel_construct();
	app_construct = await require('./classes/app_class');
	app = new app_construct();
	embed = await require('./classes/embed_class');
	component = await require('./classes/component_class');

	bot_construct = await require('./classes/bot_class');
	bot = new bot_construct();
	cache_construct = await require('./classes/cache_class');
	cache = new cache_construct();
	time_construct = await require('./classes/time_class');
	time = new time_construct();

	rel_construct = await require('./classes/release_class');
	rel = new rel_construct();
	rel.rel();

	post_man = await require('events');
	class Emitter extends post_man {}
	mail_man = new Emitter();

	heart_construct = await require('./classes/heart_class');
	heart = new heart_construct();
	heart.run(this);
};
