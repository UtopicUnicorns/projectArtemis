class heart_construct {
	constructor() {
		this.puppet;

		this.client_struct = {
			client: null,
			guilds: [],
			users: [],
			beat_interval: 5000,
			beating_heart: null,
			seq_num: null,
			ses_num: null,
		};

		this.identify_info = {
			op: 2,
			d: {
				token: token,
				intents: intents_num,
				properties: {
					$os: process.platform,
					$browser: 'DJBSF',
					$device: 'DJBSF',
				},
			},
		};

		mail_man.on('socket_beat', async () => {
			this.client_struct.beating_heart++;
			this.puppet.send(JSON.stringify({ op: 1, d: this.client_struct.seq_num }));
		});

		mail_man.on('socket_ready', async (info) => {
			this.client_struct.ses_num = info.d.session_id;
			this.client_struct.client = info.d;
			mail_man.emit('socket_pulse', true);
		});

		mail_man.on('socket_message', async (message) => {
			this.client_struct.seq_num = message.s;
			mail_man.emit(message.t, { message: message, client: this.client_struct, socket: this.puppet });
		});

		mail_man.on('socket_10', async (info) => {
			if (this.client_struct.ses_num && this.client_struct.seq_num) {
				this.client_resume = {
					op: 6,
					d: {
						token: token,
						session_id: this.client_struct.ses_num,
						seq: this.client_struct.seq_num,
					},
				};

				this.puppet.send(JSON.stringify(this.client_resume));
			} else {
				mail_man.emit('socket_identify');
				mail_man.emit('socket_interval', info.heartbeat_interval);
			}
		});

		mail_man.on('socket_resume', async (info) => mail_man.emit('socket_pulse', true));
		mail_man.on('socket_interval', async (info) => (this.client_struct.beat_interval = info));
		mail_man.on('socket_close', async (code) => this.restart());
		mail_man.on('socket_pulse', async (order) => this.pulse(order));
		mail_man.on('socket_identify', async () => this.puppet.send(JSON.stringify(this.identify_info)));
		mail_man.on('socket_ping', async () => this.puppet.send(JSON.stringify({ op: 1 })));
		mail_man.on('socket_error', async (error) => console.log(error));
		mail_man.on('socket_gmu', async (member) => {});
		mail_man.on('socket_gc', async (guild) => {});
	}

	run() {
		this.puppet = new ws.WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
		this.socket();

		return this;
	}

	restart() {
		this.puppet = '';
		setTimeout(() => this.run(), 5000);

		return this;
	}

	pulse(order) {
		if (order) {
			this.beat = setInterval(function () {
				mail_man.emit('socket_beat');
			}, this.client_struct.beat_interval);
		} else clearInterval(this.beat);

		return this;
	}

	socket() {
		this.puppet.on('message', async function incoming(message) {
			try {
				const msg = JSON.parse(message);

				if (msg.op == 10 && msg.d) mail_man.emit('socket_10', msg.d);
				if (msg.op == 1) mail_man.emit('socket_ping');
				if (msg.t == 'GUILD_CREATE') mail_man.emit('socket_gc', msg.d);
				if (msg.t == 'GUILD_MEMBER_UPDATE') mail_man.emit('socket_gmu', msg.d);
				if (msg.t == 'READY') mail_man.emit('socket_ready', msg);
				if (msg.t == 'RESUMED') mail_man.emit('socket_resume', msg);

				mail_man.emit('socket_message', msg);
			} catch (err) {
				mail_man.emit('socket_error', error);
			}
		});

		this.puppet.on('error', (error) => mail_man.emit('socket_error', error));
		this.puppet.on('close', (code) => {
			mail_man.emit('socket_close', code);
			mail_man.emit('socket_pulse', false);
		});

		return this;
	}
}

module.exports = heart_construct;
