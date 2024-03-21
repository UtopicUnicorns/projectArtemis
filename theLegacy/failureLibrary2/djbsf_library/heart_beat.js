module.exports = {
	rhythm: async function () {
		/*Collection of info*/
		let discord_intel = {
			dead: true, //Connection dead or alive?

			client: null, //Client cache

			guilds: [], //Client guilds

			users: [], //Client users

			beat_interval: null, //API given interval

			beating_heart: null, //How many heartbeats are send

			seq_num: null, //API sequence number

			ses_num: null, //API session number
		};

		function startWebsocket() {
			var socket = new ws.WebSocket('wss://gateway.discord.gg/?v=9&encoding=json'); //Connect to discord gateway

			/*We animate the bot by sending pulses trough the gateway*/
			async function pulse(shock, data) {
				switch (shock) {
					case 1: //First pulse, we shoot a hello trough the gateway
						shock_1 = {
							op: 1, //OP 1 code is for the heartbeat

							d: null, //At this stage we do not have a sequence number yet
						};

						socket.send(JSON.stringify(shock_1)); //Send the first shock for info

						discord_intel.beat_interval = data; //We have our heartbeat interval so we store it

						heartbeat(); //We initiate the regular heartbeat

						pulse(2, data); //We move on to phase 2

						break;

					case 2: //Second pulse, we indentify ourselves to the gateway
						shock_2 = {
							op: 2, //OP 2 code wants us to send relevant data

							d: {
								token: token, //Bot token

								intents: intents_num, //Basically what we want to receive, this is no guarantee to get it if the intents are not met

								properties: {
									$os: 'linux', //Identifying what OS we use

									$browser: 'DJBSF', //For some reason they need to know our browser?

									$device: 'DJBSF', //And they also want to know how we use Discord
								},
							},
						};

						socket.send(JSON.stringify(shock_2)); //send a message to tell the gateway who we are and what we want

						break;

					case 3: //Third pulse, we gather relevant data to use
						discord_intel.client = data; //We define the client_user after receiving the data

						discord_intel.seq_num = data.s; //With our fresh sequence number we save it for use

						discord_intel.ses_num = data.d.session_id; //session ID is used for resuming, we will store it for now

						break;
				}
			}

			/*Basically the heart, we try to keep the connection alive by sending variable pulses*/
			function heartbeat() {
				setInterval(function () {
					discord_intel.beating_heart++; //We count up the amount of beats

					send_beat = {
						op: 1, //OP code has to be 1

						d: discord_intel.seq_num, //sequence number given by the last event of the socket
					};

					socket.send(JSON.stringify(send_beat)); //send out the beat
				}, discord_intel.beat_interval); //Randomized interval
			}

			/*Messages received trough socket end in here*/
			socket.on('message', function incoming(message) {
				const rec_data = JSON.parse(message); //Convert message to JSON

				if (rec_data.s && rec_data.s !== null) discord_intel.seq_num = rec_data.s; //Record sequence number

				if (rec_data.t) var event_name = rec_data.t;
				else var event_name = 'NONE'; //Short hand raw event name

				if (rec_data.d && rec_data.d.type) var event_type = rec_data.d.type;
				else var event_type = 'NONE'; //Short hand interaction type

				if (rec_data.op) var event_code = rec_data.op;
				else var event_code = 'NONE'; //Short hand OP code

				mail_man.emit(event_name, { client: discord_intel, message: rec_data, socket: socket }); //Send data to emitter

				/*If event name is ready we shoot info into our cache and start the heartbeat*/
				if (event_name == 'READY') {
					discord_intel.client = rec_data.d; //Pushing client

					pulse(3, rec_data); //READY needs the third shock
				}

				/*We cache guild and user introductions*/
				if (event_name == 'GUILD_CREATE') {
					const guild_id = discord_intel.guilds.findIndex(({ id }) => id === rec_data.d.id);

					if (guild_id === -1) {
						discord_intel.guilds.push({ id: rec_data.d.id, guild: rec_data.d });
					} else {
						discord_intel.guilds.splice(guild_id, 1);

						discord_intel.guilds.push({ id: rec_data.d.id, guild: rec_data.d });
					}
				}

				if (rec_data.d && rec_data.d.author) {
					const user_id = discord_intel.users.findIndex(({ id }) => id === rec_data.d.author.id);

					if (user_id === -1) {
						discord_intel.users.push({ id: rec_data.d.author.id, user: rec_data.d.author });
					} else {
						discord_intel.users.splice(user_id, 1);

						discord_intel.users.push({ id: rec_data.d.author.id, user: rec_data.d.author });
					}
				}

				/*When code is 10 Discord send a hello*/
				if (event_code === 10 && discord_intel.dead == true) {
					if (discord_intel.ses_num && discord_intel.seq_num) {
						resume = {
							op: 6, //OP code 6 RESUME

							d: {
								token: `${token}`, //Bot token

								session_id: discord_intel.ses_num, //stored session number

								seq: discord_intel.seq_num, //last known sequence number
							},
						};

						socket.send(JSON.stringify(resume)); //Send message to the gateway to resume a session

						discord_intel.dead = false;
					} else {
						if (rec_data.d) {
							pulse(1, rec_data.d.heartbeat_interval); //op 10 code needs the first shock

							discord_intel.dead = false;
						}
					}
				}
			});

			/*If an error occurs we handle it here*/
			socket.on('error', (error) => console.log(action.tell_time('full'), error));

			/*When the connection gets broken we handle it here*/
			socket.on('close', (code) => {
				discord_intel.dead = true;

				console.log(action.tell_time('full'), `Closed with code: ${code}`);

				setTimeout(startWebsocket, 5000);
			});
		}

		startWebsocket();
	},
};
