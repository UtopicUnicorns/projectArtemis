exports.summon_modules = async function (config) {
	https = await require('https'); //Sending over https

	ws = await require('./web_socket'); //Web socket stuff

	configuration_data = await require(config); //Load config file

	token = await configuration_data.bot_token; //Bot token

	application_id = configuration_data.application_id; //Application ID

	intents_num = configuration_data.intents_num; //intents number

	heart_beat = await require('./heart_beat'); //Module to initiate and continue a link

	action = await require('./client_do'); //Client Actions

	post_man = await require('events'); //Event handler, nodejs native

	class Emitter extends post_man {}

	mail_man = new Emitter(); //Shoot out information beams
};
