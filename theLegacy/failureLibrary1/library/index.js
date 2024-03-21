exports.lib = async function (config) {
	im = await require('./call_module');
	await im.summon_modules(config);
};
