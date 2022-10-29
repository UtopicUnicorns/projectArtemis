<?php include './panel.d/paneld.php' ?>
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
    <meta property="og:image" content="https://artemis.rest/images/assets/project_artemis_background2.png">
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
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
		<!--Title-->
		<title>Project Artemis, Your World Depends On It.</title>
		<!--Stylesheet-->
		<link rel="stylesheet" href="./styles/sheet.css" />
	</head>
	<body>
    <!--Wave Animation-->
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
		<!--Content-->
		<div class="a_box" id="home">
			<div class="docBack">
        <!--User Menu-->
				<div class="docLeftMenu">
          <?php print $userMenu; ?>
				</div>
				<!--User Content-->
				<div class="docRightBox" id="docRightBox">
					<?php print $siteContext; ?>
				</div>
			</div>
		</div>
		
		 <div id="load">
      <div class="loader">Loading...</div>
    </div>
	</body>
</html>
