<?php include './login.d/botCheck.d.php'; ?>
<?php include './login.d/board.d.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<!--Meta Data -->
		<meta charset="utf-8" />
		<!-- Primary Meta Tags -->
    <title>Project Artemis, Your World Depends On It.</title>
    <meta name="title" content="Project Artemis, Your World Depends On It.">
    <meta name="description" content="Leader board page.">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://artemis.rest/">
    <meta property="og:title" content="Project Artemis, Your World Depends On It.">
    <meta property="og:description" content="Leader board page.">
    <meta property="og:image" content="https://artemis.rest/images/assets/project_artemis_background.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
    <meta property="twitter:description" content="Leader board page.">
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
		<link rel="stylesheet" href="./style.css" />
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
		<div class="boxFirst" id="home" style="background-image: url(''); width: 100vw; height: 100vh; overflow: auto;">
        <?php
          echo $hugeDong;
        ?>
		</div>
		
	</body>
</html>
