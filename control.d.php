<?php include './login.d/watch.d.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<!--Meta Data -->
		<meta charset="utf-8" />
		<!-- Primary Meta Tags -->
    <meta name="title" content="Project Artemis, Your World Depends On It.">
    <meta name="description" content="Control panel.">
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
    <meta property="og:description" content="Control panel.">
    <meta property="og:image" content="https://artemis.rest/images/assets/pBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
    <meta property="twitter:description" content="Control panel.">
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
		<div class="boxFirst" id="home"></div>
    
    	<!--Info page-->
		<div class="boxSecondBg"></div>
		<div class="boxSecond" id="info">
      <div class="boxContent">
        - 
      </div>
		</div>
		
		<!--Settings page-->
		<div class="boxThirdBg"></div>
		<div class="boxThird" id="setting">
      <div class="boxContent">
        - 
      </div>
		</div>
		
		<!--Channel page-->
		<div class="boxFourthBg"></div>
		<div class="boxFourth" id="channels">
      <div class="boxContent">
        -
      </div>
		</div>
    
    <!-- Panel -->
		<?php print $panelCreate; ?>
		
    <!--Main menu-->
    <div class="menuHome">
      <button class="menuButton" onclick="document.getElementById('home').scrollIntoView();">HOME</button>
      <button class="menuButton" onclick="document.getElementById('info').scrollIntoView();">INFO</button>
      <button class="menuButton" onclick="document.getElementById('setting').scrollIntoView();">SETTINGS</button>
      <button class="menuButton" onclick="document.getElementById('channels').scrollIntoView();">CHANNELS</button>
    </div>
    
    <!--Side bar-->
    <div class="secondaryMenuHome">
      <?php print $userLoggedIn; ?>
      <button class="secondaryMenuButton" onclick="goToSite('homePage', false);">GO HOME</button>
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
        if(siteText == 'homePage') linkTo = 'https://artemis.rest/';
        if(siteText == 'patreon') linkTo = 'https://www.patreon.com/projectartemis';
        if(siteText == 'paypal') linkTo = 'https://www.paypal.com/donate/?hosted_button_id=ULQ8N32CLXK4L';
        if(siteText == 'loginLink') linkTo = 'https://discord.com/api/v10/oauth2/authorize?client_id=440892659264126997&redirect_uri=https%3A%2F%2Fartemis.rest%2F&response_type=code&scope=identify%20guilds%20guilds.members.read';
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
