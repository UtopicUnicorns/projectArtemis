<?php include './login.d/watch.d.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<!--Meta Data -->
		<meta charset="utf-8" />
		<!-- Primary Meta Tags -->
    <meta name="title" content="Project Artemis, Your World Depends On It.">
    <meta name="description" content="Home of the most clever Discord bot.">
    <meta name="keywords" content="Discord, Bot, Artemis, Javascript">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta name="revisit-after" content="1 days">
    <meta name="author" content="Richard Dorrestijn">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://artemis.rest/">
    <meta property="og:title" content="Project Artemis, Your World Depends On It.">
    <meta property="og:description" content="Home of the most clever Discord bot.">
    <meta property="og:image" content="https://artemis.rest/images/assets/pBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
    <meta property="twitter:description" content="Home of the most clever Discord bot.">
    <meta property="twitter:image" content="https://artemis.rest/images/assets/pBack.png">

		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Discord, Bot, Artemis, Javascript" />
		<meta name="author" content="Richard Dorrestijn" />
		<meta name="copyright" content="Richard Dorrestijn" />
		<meta name="robots" content="index, follow" />

		<!--Favicon, icons-->
		<link rel="apple-touch-icon" sizes="180x180" href="./images/favicon/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="./images/favicon/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="./images/favicon/favicon-16x16.png" />
		<link rel="manifest" href="./images/favicon/site.webmanifest" />
		<link rel="mask-icon" href="./images/favicon/safari-pinned-tab.svg" color="#000" />
		<meta name="msapplication-TileColor" content="#000" />
		<meta name="theme-color" content="#000" />

		<!--Title-->
		<title>Project Artemis, Your World Depends On It.</title>

		<!--Stylesheet-->
		<link rel="stylesheet" href="./style.css" />
		<link rel="stylesheet" href="./styleCell.css" />
	</head>

	<body>
    <!--Wave animation-->
		<div class="backgroundBox waveAnimation">
			<div class="waveBox bgTop">
				<div class="wave waveTop" style="background-image: url('./images/assets/waveTop.svg');"></div>
			</div>
			<div class="waveBox bgMiddle">
				<div class="wave waveMiddle" style="background-image: url('./images/assets/waveMiddle.svg');"></div>
			</div>
			<div class="waveBox bgBottom">
				<div class="wave waveBottom" style="background-image: url('./images/assets/waveBottom.svg');"></div>
			</div>
		</div>
    
    <!--Intro page-->
		<div class="boxFirstBg"></div>
		<?php print $gatherData; ?>
		
		<!--Invite bot page-->
		<div class="boxSecondBg"></div>
		<div class="boxSecond" id="invite">
      <div class="boxContent">
        <div class="buttonHoldInvite">
          <button class="inviteButton" onclick="versionSelect('beta');">
            <img src='../images/assets/artemisAlternateProfilePictureSmall.png' style="border-radius: 25px 0px 25px 0px; width: 90%;" />
          </button>
          <button class="inviteButton" onclick="versionSelect('main');">
            <img src='../images/assets/artemisProfilePictureSmall.png' style="border-radius: 25px 0px 25px 0px; width: 90%;" />
          </button>
        </div>
        <div id="artemisVersion">
          <h1>Artemis Main Branch</h1>
          <pre>The main version of this bot.
          It has custom commands, action logs, anti raid functions and more.
          The bot still uses prefixes, but will be changed in near future.
          Hop by in the discord server if you want.</pre>
          <br />
          <button class="secondaryMenuButton" onclick="goToSite('mainBotInvite', true);">Invite Bot</button>
        </div>
        <div id="artemisVersionBeta" style="display: none;">
          <div class="danger" onclick="this.style.display='none';">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>DANGER!</strong> Highly experimental version.
          </div>
          <h1>Artemis Beta Branch</h1>
          <pre>No warranty for issues, this version is being worked on constantly.
          It has some support for slash commands.
          This entire website will also be the playground for this version.
          This version will eventually take over from the main branch.</pre>
          <br />
          <button class="secondaryMenuButton" onclick="goToSite('betaBotInvite', true);">Invite Bot</button>
        </div>
        <div id="artemisVersionMain" style="display: none;">
          <h1>Artemis Main Branch</h1>
          <pre class="preSel">The main version of this bot.
          It has custom commands, action logs, anti raid functions and more.
          The bot still uses prefixes, but will be changed in near future.
          Hop by in the discord server if you want.</pre>
          <br />
          <button class="secondaryMenuButton" onclick="goToSite('mainBotInvite', true);">Invite Bot</button>
        </div>
      </div>
		</div>
		
		<!--Status page-->
		<div class="boxThirdBg"></div>
		<div class="boxThird" id="project">
      <div class="boxContent" style="background-color: transparent;">
      
        <table style="margin-bottom: 1vh; width: 100%; height: 20vh; border: none; border-collapse: collapse; background: linear-gradient( to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100% ); box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);">
          <tbody>
            <tr>
              <td style="padding: 0px; width: 20vh; background-image: url('../images/assets/projectArtemisBack.png'); background-position: center; background-repeat: no-repeat; background-size: cover; box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);"></td>
              <td style="padding: 0px;">
                <table style="width: 100%; height: 100%; border: none; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); font-size: 1.5em; color: black; padding: 0px; height: 10%; text-align: right; padding-right: 5vw;">
                        Project Artemis
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); color: black; padding: 0px; height: 70%; text-align: right; padding-right: 5vw;">
                        The website you are on is also written in code.<br />
                        And this project is just that.
                      </td>
                    </tr>
                    <tr>
                      <td style="color: black; padding: 0px; height: 20%;">
                        <button class="projectsButton" onclick="goToSite('gitArtemis', true);">
                          Visit Project Artemis GitHub
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="margin-bottom: 1vh; width: 100%; height: 20vh; border: none; border-collapse: collapse; background: linear-gradient( to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100% ); box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);">
          <tbody>
            <tr>
              <td style="padding: 0px;">
                <table style="width: 100%; height: 100%; border: none; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); font-size: 1.5em; color: black; padding: 0px; height: 10%; text-align: right; padding-right: 5vw;">
                        Project Bow
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); color: black; padding: 0px; height: 70%; text-align: right; padding-right: 5vw;">
                        Custom API wrapper/handler written in JavaScript.<br />
                        This library is written to be lightweight and fast.
                      </td>
                    </tr>
                    <tr>
                      <td style="color: black; padding: 0px; height: 20%;">
                        <button class="projectsButton" onclick="goToSite('gitBow', true);">
                          Visit Project Bow GitHub
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="padding: 0px; width: 20vh; background-image: url('../images/assets/projectBowBack.png'); background-position: center; background-repeat: no-repeat; background-size: cover; box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);"></td>
            </tr>
          </tbody>
        </table>
        <table style="width: 100%; height: 20vh; border: none; border-collapse: collapse; background: linear-gradient( to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100% ); box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);">
          <tbody>
            <tr>
              <td style="padding: 0px; width: 20vh; background-image: url('../images/assets/projectArrowBack.png'); background-position: center; background-repeat: no-repeat; background-size: cover; box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);"></td>
              <td style="padding: 0px;">
                <table style="width: 100%; height: 100%; border: none; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); font-size: 1.5em; color: black; padding: 0px; height: 10%; text-align: right; padding-right: 5vw;">
                        Project Arrow
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); color: black; padding: 0px; height: 70%; text-align: right; padding-right: 5vw;">
                        Discord bot being built on top of Project Bow.<br />
                        This bot's main name is Artemis.
                      </td>
                    </tr>
                    <tr>
                      <td style="color: black; padding: 0px; height: 20%;">
                        <button class="projectsButton" onclick="goToSite('gitArrow', true);">
                          Visit Project Arrow GitHub
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="margin-bottom: 1vh; width: 100%; height: 20vh; border: none; border-collapse: collapse; background: linear-gradient( to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100% ); box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);">
          <tbody>
            <tr>
              <td style="padding: 0px;">
                <table style="width: 100%; height: 100%; border: none; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); font-size: 1.5em; color: black; padding: 0px; height: 10%; text-align: right; padding-right: 5vw;">
                        Linux Mint Community Server
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: rgba(255, 255, 255, 0.5); color: black; padding: 0px; height: 70%; text-align: right; padding-right: 5vw;">
                        A supportive Discord server for Linux Mint.<br />
                        Also found on the linuxmint.com main website, but also credited here, because I run the server.
                      </td>
                    </tr>
                    <tr>
                      <td style="color: black; padding: 0px; height: 20%;">
                        <button class="projectsButton" onclick="goToSite('mintDiscord', true);">
                          Visit the Linux Mint Community Discord
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="padding: 0px; width: 20vh; background-image: url('../images/assets/mintBack.png'); background-position: center; background-repeat: no-repeat; background-size: cover; box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);"></td>
            </tr>
          </tbody>
        </table>
      </div>
		</div>
		
		<!--Support page-->
		<div class="boxFourthBg"></div>
		<div class="boxFourth" id="support">
      <div class="boxContent">
        <div class="buttonHoldInvite">
          <button class="inviteButton" onclick="goToSite('patreon', true);">
            <img src='../images/icons/patreon.svg' style="border-radius: 25px 0px 25px 0px; width: 90%;" />
          </button>
          <button class="inviteButton" onclick="goToSite('paypal', true);">
            <img src='../images/icons/paypal.svg' style="border-radius: 25px 0px 25px 0px; width: 90%;" />
          </button>
        </div>
      </div>
		</div>
		
		<!-- Panel -->
		<?php print $panelCreate; ?>
    
    <!--Main menu-->
    <div class="menuHome">
      <button class="menuButton" onclick="document.getElementById('home').scrollIntoView();">HOME</button>
      <button class="menuButton" onclick="document.getElementById('invite').scrollIntoView();">INVITE</button>
      <button class="menuButton" onclick="document.getElementById('project').scrollIntoView();">PROJECTS</button>
      <button class="menuButton" onclick="document.getElementById('support').scrollIntoView();">SUPPORT ME</button>
    </div>
    
    <!--Side bar-->
    <div class="secondaryMenuHome">
      <?php print $userLoggedIn; ?>
      <button class="secondaryMenuButton" onclick="goToSite('emailLink', true);">EMAIL</button>
      <button class="secondaryMenuButton" onclick="goToSite('githubLink', true);">GITHUB</button>
      <button class="secondaryMenuButton" onclick="goToSite('discordLink', true);">DISCORD</button>
    </div>
		
		<!--Alerts-->
    <div class="alerts">
      <?php include './error/handleError.php'; ?>
    </div>

		<!--Scripts-->
		<script>      
      function versionSelect(version) {
        if(version == 'beta') document.getElementById("artemisVersion").innerHTML = document.getElementById("artemisVersionBeta").innerHTML;
        if(version == 'main') document.getElementById("artemisVersion").innerHTML = document.getElementById("artemisVersionMain").innerHTML;
      }
      
      function goToSite(siteText, out, gId) {
        let linkTo;
        let outText = 'This link will open in the same tab/window';
        if(out) outText = 'This link will open in a new tab/window';
        if(siteText == 'controlPane') linkTo = `https://artemis.rest/control.d.php?guild=${gId}`;
        if(siteText == 'logoutLink') linkTo = 'https://artemis.rest/login.d/logout.d.php';
        if(siteText == 'patreon') linkTo = 'https://www.patreon.com/projectartemis';
        if(siteText == 'paypal') linkTo = 'https://www.paypal.com/donate/?hosted_button_id=ULQ8N32CLXK4L';
        if(siteText == 'loginLink') linkTo = 'https://discord.com/api/v10/oauth2/authorize?client_id=440892659264126997&redirect_uri=https%3A%2F%2Fartemis.rest%2F&response_type=code&scope=identify%20guilds%20guilds.members.read';
        if(siteText == 'emailLink') linkTo = 'mailto:dorrestijn.r@gmail.com';
        if(siteText == 'githubLink') linkTo = 'https://github.com/UtopicUnicorns/';
        if(siteText == 'gitArtemis') linkTo = 'https://github.com/UtopicUnicorns/Project_Artemis';
        if(siteText == 'gitArrow') linkTo = 'https://github.com/UtopicUnicorns/Project_Arrow';
        if(siteText == 'gitBow') linkTo = 'https://github.com/UtopicUnicorns/Project_Bow';
        if(siteText == 'mintDiscord') linkTo = 'https://discord.com/invite/mint';
        if(siteText == 'discordLink') linkTo = 'https://discord.com/invite/Y6f3XQyuTQ';
        if(siteText == 'betaBotInvite') linkTo = 'https://discord.com/api/oauth2/authorize?client_id=654361253413781537&permissions=8&scope=applications.commands%20bot';
        if(siteText == 'mainBotInvite') linkTo = 'https://discord.com/api/oauth2/authorize?client_id=440892659264126997&permissions=8&scope=applications.commands%20bot';
        if(confirm(`${outText}:\n\n${linkTo}`)) {
          if(out) window.open(linkTo, '_blank');
          if(!out) location.href=linkTo;
        }
      }
      </script>
	</body>

</html>
