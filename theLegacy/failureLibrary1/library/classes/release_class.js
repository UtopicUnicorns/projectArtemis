class rel_construct {
	rel() {
		const options = {
			hostname: 'api.github.com',
			port: 443,
			path: '/repos/UtopicUnicorns/DJBSF/releases',
			method: 'GET',
			headers: { 'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json' },
		};

		let collect = [];

		const req = https.request(options, (res) => {
			res.on('data', async (data) => {
				collect.push(data);
			});

			res.on('end', async (data) => {
				try {
					collect = JSON.parse(collect);

					const release_file = await require('../REL');
					if (release_file.rel !== collect[0].name) {
						console.log(`NEW VERSION AVAILABLE!\n\nDate: ${collect[0].created_at}\nVersion: ${collect[0].name}\nDownload: ${collect[0].tarball_url}\n\nYOU ARE USING VERSION: ${release_file.rel}`);
					} else {
						console.log(`Your DJBSF library is up to date @ ${release_file.rel}`);
					}
				} catch (err) {
					console.log('Unable to retrieve update data.');
				}
			});
		});

		req.on('error', (err) => console.log(err));

		req.end();

		return 'Why are you trying to read me?';
	}
}

module.exports = rel_construct;
