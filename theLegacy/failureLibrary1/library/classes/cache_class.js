class cache_construct {
	user(u_id, client) {
		let user = client.client.users.find(({ id }) => id === u_id);

		return user;
	}

	guild(g_id, client) {
		let guild = client.client.guilds.find(({ id }) => id === g_id);

		return guild;
	}
}

module.exports = cache_construct;
