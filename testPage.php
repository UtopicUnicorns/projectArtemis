<?php include './login.d/watch.d.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<!--Meta Data -->
		<meta charset="utf-8" />
		<!-- Primary Meta Tags -->
    <title>Project Artemis, Your World Depends On It.</title>
    <meta name="title" content="Project Artemis, Your World Depends On It.">
    <meta name="description" content="Project Artemis is a collection of sub-projects, mainly known for the Discord bot called Artemis.">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://artemis.rest/">
    <meta property="og:title" content="Project Artemis, Your World Depends On It.">
    <meta property="og:description" content="Project Artemis is a collection of sub-projects, mainly known for the Discord bot called Artemis.">
    <meta property="og:image" content="https://artemis.rest/images/assets/project_artemis_background.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
    <meta property="twitter:description" content="Project Artemis is a collection of sub-projects, mainly known for the Discord bot called Artemis.">
    <meta property="twitter:image" content="https://artemis.rest/images/assets/project_artemis_background.png">

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
		<link rel="mask-icon" href="./favicon/safari-pinned-tab.svg" color="#000" />
		<meta name="msapplication-TileColor" content="#000" />
		<meta name="theme-color" content="#000" />

		<!--Title-->
		<title>Project Artemis, Your World Depends On It.</title>

		<!--Stylesheet-->
		<link rel="stylesheet" href="./styles/style.css" />
	</head>

	<body>

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
    
    
		<div class="boxFirstBg"></div>
		<div class="boxFirst" id="home">
      
		</div>
		
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
          <pre>The main version of this bot.
          It has custom commands, action logs, anti raid functions and more.
          The bot still uses prefixes, but will be changed in near future.
          Hop by in the discord server if you want.</pre>
          <br />
          <button class="secondaryMenuButton" onclick="goToSite('mainBotInvite', true);">Invite Bot</button>
        </div>
      </div>
		</div>
		
		<div class="boxThirdBg"></div>
		<div class="boxThird" id="status">
      <div class="boxContent">
        hi
      </div>
		</div>
		
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
    
    <div class="menuHome">
      <button class="menuButton" onclick="document.getElementById('home').scrollIntoView();">HOME</button>
      <button class="menuButton" onclick="document.getElementById('invite').scrollIntoView();">INVITE</button>
      <button class="menuButton" onclick="document.getElementById('status').scrollIntoView();">STATUS</button>
      <button class="menuButton" onclick="document.getElementById('support').scrollIntoView();">SUPPORT ME</button>
    </div>
    
    <div class="secondaryMenuHome">
      <?php print $userLoggedIn; ?>
      <br /><br />
      <button class="secondaryMenuButton" onclick="goToSite('emailLink', true);">EMAIL</button>
      <button class="secondaryMenuButton" onclick="goToSite('githubLink', true);">GITHUB</button>
      <button class="secondaryMenuButton" onclick="goToSite('discordLink', true);">DISCORD</button>
    </div>
		
    <div class="alerts">
      <!--
      <div class="danger" onclick="this.style.display='none';">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <strong>Error!</strong> Bad job izma.
      </div>
      -->
      <div class="notification" onclick="this.style.display='none';">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Notice!</strong> This site will place a single cookie on login
      </div>
      
      <div class="warning" onclick="this.style.display='none';">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Notice!</strong> This website does not represent the live version of Artemis yet
      </div>
      <!--
      <div class="success" onclick="this.style.display='none';">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Success!</strong> good job cronk.
      </div>
      -->
    </div>
    
    
    
    <div id="load">
      <div class="loader">Loading...</div>
    </div>

		<!--Scripts-->
		<script>
      function versionSelect(version) {
        if(version == 'beta') document.getElementById("artemisVersion").innerHTML = document.getElementById("artemisVersionBeta").innerHTML;
        if(version == 'main') document.getElementById("artemisVersion").innerHTML = document.getElementById("artemisVersionMain").innerHTML;
      }
      
      function goToSite(siteText, out) {
        let linkTo;
        let outText = 'This link will open in the same tab/window';
        if(out) outText = 'This link will open in a new tab/window';
        if(siteText == 'controlPane') linkTo = 'https://artemis.rest/login.d/control.d.php'
        if(siteText == 'logoutLink') linkTo = 'https://artemis.rest/login.d/logout.d.php'
        if(siteText == 'patreon') linkTo = 'https://www.patreon.com/projectartemis';
        if(siteText == 'paypal') linkTo = 'https://www.paypal.com/donate/?hosted_button_id=ULQ8N32CLXK4L';
        if(siteText == 'loginLink') linkTo = 'https://discord.com/api/v10/oauth2/authorize?client_id=440892659264126997&redirect_uri=https%3A%2F%2Fartemis.rest%2FtestPage.php&response_type=code&scope=identify%20guilds%20guilds.members.read';
        if(siteText == 'emailLink') linkTo = 'mailto:dorrestijn.r@gmail.com';
        if(siteText == 'githubLink') linkTo = 'https://github.com/UtopicUnicorns/';
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
