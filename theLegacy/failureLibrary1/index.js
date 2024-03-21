/*Start in async to check for errors*/
async function start() {
	try {
		await require('./library/index').lib('./configs.json'); //Import library + path to your config
	} catch (err) {
		console.log(err);
	}
}


start(); //Start async
