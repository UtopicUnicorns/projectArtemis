exports.lib = async function (config) {
	//CORE DO NOT TOUCH
	im = await require('./call_module'); //Import Functions and modules
	await im.summon_modules(config); //Initiate imports
	heart_beat.rhythm(im); //start the process
	//END CORE GO AHEAD AND TOUCH
};
