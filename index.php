<?php include './panel.d/homeCall.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<!--Meta Data -->
		<meta charset="utf-8" />
		<!-- Primary Meta Tags -->
    <title>Project Artemis, Fuck you kindly.</title>
    <meta name="title" content="Project Artemis, Fuck you kindly.">
    <meta name="description" content="Project Artemis is a collection of sub-projects, mainly known for the Discord bot called Artemis.">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://artemis.rest/">
    <meta property="og:title" content="Project Artemis, Fuck you kindly.">
    <meta property="og:description" content="Project Artemis is a collection of sub-projects, mainly known for the Discord bot called Artemis.">
    <meta property="og:image" content="https://artemis.rest/images/assets/project_artemis_background2.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Fuck you kindly.">
    <meta property="twitter:description" content="Project Artemis is a collection of sub-projects, mainly known for the Discord bot called Artemis.">
    <meta property="twitter:image" content="https://artemis.rest/images/assets/project_artemis_background2.png">

		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Discord, Bot, Artemis, Javascript" />
		<meta name="author" content="Richard Dorrestijn" />
		<meta name="copyright" content="Richard Dorrestijn" />
		<meta name="robots" content="index, follow" />

		<!--Favicon, icons-->
		<link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
		<link rel="manifest" href="./favicon/site.webmanifest" />
		<link rel="mask-icon" href="./favicon/safari-pinned-tab.svg" color="#5bbad5" />
		<meta name="msapplication-TileColor" content="#da532c" />
		<meta name="theme-color" content="#ffffff" />

		<!--Preloads-->
		<link rel="prefetch" href="./images/backgrounds/1.png" />
		<link rel="prefetch" href="./images/backgrounds/2.png" />
		<link rel="prefetch" href="./images/backgrounds/3.png" />
		<link rel="prefetch" href="./images/backgrounds/4.png" />
		<link rel="prefetch" href="./images/backgrounds/5.png" />
		<link rel="prefetch" href="./images/backgrounds/prism.svg" />
		<link rel="prefetch" href="./images/assets/wave_top.svg" />
		<link rel="prefetch" href="./images/assets/wave_mid.svg" />
		<link rel="prefetch" href="./images/assets/wave_bot.svg" />
		<link rel="prefetch" href="./images/logo/logo.svg" />

		<!--Title-->
		<title>Project Artemis, Fuck you kindly.</title>

		<!--Stylesheet-->
		<link rel="stylesheet" href="./styles/sheet.css" />
	</head>

	<body>
		<div id="float_menu" class="float_menu">
			<button class="menu_button pulse" onclick="document.getElementById('home').scrollIntoView();">HOMEPAGE</button>
			<button class="menu_button pulse" onclick="document.getElementById('invite').scrollIntoView();">INVITE</button>
			<button class="menu_button pulse" onclick="document.getElementById('github').scrollIntoView();">GITHUB</button>
			<button class="menu_button pulse" onclick="document.getElementById('donate').scrollIntoView();">DONATE</button>
			<button class="menu_button pulse" onclick="document.getElementById('contact').scrollIntoView();">CONTACT</button>
			<button class="menu_button pulse" onclick="document.getElementById('stats').scrollIntoView();">STATS</button>
		</div>

		<div class="bg_box waveAnimation">
			<div class="i_box bgTop">
				<div class="wave waveTop" style="background-image: url('./images/assets/wave_top.svg');"></div>
			</div>
			<div class="i_box bgMiddle">
				<div class="wave waveMiddle" style="background-image: url('./images/assets/wave_mid.svg');"></div>
			</div>
			<div class="i_box bgBottom">
				<div class="wave waveBottom" style="background-image: url('./images/assets/wave_bot.svg');"></div>
			</div>
		</div>

		<div class="a_box" id="home">
      <?php print $personalizedContent; ?>
		</div>

		<div class="b_box" id="invite">
			<table style="width: 100%; height: 30%; overflow: hidden; background-color: rgba(255, 255, 255, 0.8); border-radius: 5px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);">
				<tbody>
					<tr>
						<td style="height: 80px;text-align: center;">
							<h1>Invite Artemis</h1>
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							To invite Artemis or the test/beta bot you need the following permissions:<br />
							<ul style="text-align: left; padding-left: 35%;">
								<li>Administrator</li>
								<li>Create application commands</li>
							</ul>
							Both bots need/want administrative rights and the ability to create slash commands, which is a seperate permission in the invite URL.<br />
							Always make sure to study the links you open, make sure the URL is from Discord, and always make sure the connection is secure(https).<br />
							<br />
							The test bot is not to be used as a main bot, this bot serves a beta/alpha testing purpose, in this case she uses a custom API library.<br />
							Artemis is the main bot and can be used as your main bot in your server(s)<br /><br />
						</td>
					</tr>

				</tbody>
			</table>
			<div class="menu_box">
				<button class="menu_button pulse" onclick="window.open('https://discord.com/api/oauth2/authorize?client_id=440892659264126997&permissions=8&scope=applications.commands%20bot', '_blank')" target="_blank">Invite Artemis</button>
				<button class="menu_button pulse" onclick="window.open('https://discord.com/api/oauth2/authorize?client_id=654361253413781537&permissions=8&scope=applications.commands%20bot', '_blank')" target="_blank">Invite Test Bot</button>
			</div>
		</div>

		<div class="c_box" id="github">

		</div>

		<div class="d_box" id="donate">
			<table style="width: 100%; height: 30%; overflow: hidden; background-color: rgba(255, 255, 255, 0.8); border-radius: 5px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);">
				<tbody>
					<tr>
						<td style="height: 80px;text-align: center;">
							<h1>Make a donation</h1>
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							While any of the Projects are free to use, donations are needed to keep the servers up and running, as well as feeling rewarded for my work.<br />
							Currently only Patreon and PayPal are supported.<br />
							Donating gives you no additional benefits as the Project is full and complete as is, but you do get priority when requesting features.<br />
						</td>
					</tr>
				</tbody>
			</table>
			<div class="menu_box">
				<button class="menu_button pulse" onclick="window.open('https://www.paypal.com/donate/?hosted_button_id=ULQ8N32CLXK4L', '_blank')" target="_blank">Donate with PayPal</button>
				<button class="menu_button pulse" onclick="window.open('https://www.patreon.com/projectartemis', '_blank')" target="_blank">Become a Patron</button>
			</div>
		</div>

		<div class="e_box" id="contact">
			<table style="width: 100%; height: 30%; overflow: hidden; background-color: rgba(255, 255, 255, 0.8); border-radius: 5px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);">
				<tbody>
					<tr>
						<td style="height: 80px;text-align: center;">
							<h1>Contact</h1>
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							Contacting me is not too hard, you can find me on GitHub, Email and Discord.<br />
							<ul style="text-align: left; padding-left: 35%;">
								<li>.initrd#0383</li>
								<li>dorrestijn.r@gmail.com</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="menu_box">
				<button class="menu_button pulse" onclick="window.open('https://discord.com/invite/Y6f3XQyuTQ', '_blank')" target="_blank">Join Project Artemis Discord</button>
				<button class="menu_button pulse" onclick="window.open('mailto:dorrestijn.r@gmail.com', '_blank')" target="_blank">Email me</button>
				<button class="menu_button pulse" onclick="window.open('https://github.com/UtopicUnicorns/', '_blank')" target="_blank">Visit my GitHub</button>
			</div>
		</div>

		<div class="f_box" id="stats">
			<table style="width: 100%; height: 30%; overflow: hidden; background-color: rgba(255, 255, 255, 0.8); border-radius: 5px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);">
				<tbody>
					<tr>
						<td style="height: 80px;text-align: center;">
							<h1>stats</h1>
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							<table style="width: 60%; margin-left: auto;  margin-right: auto;">
								<tbody>
									<tr id="ref">
										<td><canvas id="stat_hold" width="250" height="250"></canvas></td>
										<td id="cpu" style="text-align: left;">&nbsp;</td>
										<td><canvas id="stat_hold2" width="250" height="250"></canvas></td>
										<td id="bot" style="text-align: left;"></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>



		<!--Scripts-->
		<script src="./scripts/floatMenu.js"></script>
		<script src="./scripts/gitHub.js"></script>
		<script src="./scripts/statsCalc.js"></script>
		<script src="./data.js"></script>
		<script>
			let script = document.getElementById('bot');
			let info = `${os_data.guild_count} Servers<br />
									${os_data.time}<br />
									${os_data.date}<br />
									${os_data.uptime.hour}:${os_data.uptime.minute}:${os_data.uptime.second} Uptime<br /><br />`;

			script.innerHTML = info;

			let script2 = document.getElementById('cpu');
			let info2 = `${os_data.os_cpu}<br />
									${os_data.os_plat}<br />
									${os_data.os_rel}<br />
									${os_data.os_up.hour}:${os_data.os_up.minute}:${os_data.os_up.second} Uptime<br /><br />`;

			script2.innerHTML = info2;
		</script>

		<script>
			var canvas = document.getElementById('stat_hold');
			var percentage = Math.floor(os_data.os_meminuse * 100 / os_data.os_memtotal);
			var radius;
			var total = os_data.os_memtotal;
			var now = os_data.os_meminuse;
			var func = 'Server';

			if (stat_hold.height < stat_hold.width) {
				radius = stat_hold.height / 3;
			} else {
				radius = stat_hold.width / 3;
			}

			if (percentage < 1) var percentage = 1;

			drawPercentageCircle(percentage, radius, canvas, total, now, func);

			var canvas = document.getElementById('stat_hold2');
			var percentage = Math.floor(os_data.bot_mem * 100 / os_data.os_memtotal);
			var radius;
			var total = os_data.os_memtotal;
			var now = os_data.bot_mem;
			var func = 'Bot';

			if (stat_hold.height < stat_hold.width) {
				radius = stat_hold.height / 3;
			} else {
				radius = stat_hold.width / 3;
			}
			if (percentage < 1) var percentage = 1;

			drawPercentageCircle(percentage, radius, canvas, total, now, func);
		</script>
	</body>

</html>
