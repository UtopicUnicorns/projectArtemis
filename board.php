<?php
  include './panel.d/configd.php';
  $guildConn = new mysqli('localhost', $sqlUser, $sqlPass);
  $infoGuild = $guildConn->query("USE g{$_GET["guild"]}");
  if($infoGuild) {
    $selectShit = $guildConn->query("SELECT * FROM User ORDER BY points DESC");
    $hugeDong = '';
    $counter = 0;
    foreach($selectShit as $qSelected) {
      $counter++;
      if($qSelected["avatar"]) $avatar = 'https://cdn.discordapp.com/avatars/' . $qSelected["id"] . '/' . $qSelected["avatar"] . '.png?size=128';
      
      if(!$qSelected["avatar"]) $avatar = "data:image/svg+xml,%3Csvg style='color: white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--! Font Awesome Free 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0  Fonts: SIL OFL 1.1  Code: MIT License) Copyright 2022 Fonticons  Inc. --%3E%3Cpath d='M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z' fill='white'%3E%3C/path%3E%3C/svg%3E";
      
      $hugeDong .= '<button class="userBoardButton" style="background-image: url(\''. $avatar .'\')">
                      <table style="width: 100%;">
                        <tr style="width: 10%;">
                          <td style="text-align: left; padding-left: 10%; font-size: 4rem;">
                            '.$qSelected["points"].'
                          </td>
                          <td>
                            <table style="width: 100%;">
                              <tr>
                                <td style="font-size: 2rem; text-align: right;">
                                  '.$qSelected["username"].'#'.$qSelected["discriminator"].'
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 1rem; text-align: right;">
                                  Rank: #'.$counter.'
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </button>';
    }
  }
?>
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
			<div class="boardBack">
				<div class="boardBox">
          <?php
            echo $hugeDong;
          ?>
				</div>
			</div>
		</div>
		
		<div id="load">
      <div class="loader">Loading...</div>
    </div>
	</body>
</html>
