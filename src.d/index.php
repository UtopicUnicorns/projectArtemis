<?php
  session_start();
  include './login.d/flow.d.php';
  include './login.d/index.d.php';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Data -->
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="keywords" content="Discord, Bot, Artemis, Javascript" />
    <meta name="author" content="Richard Dorrestijn" />
    <meta name="copyright" content="Richard Dorrestijn" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://artemis.rest/">
    <meta property="og:title" content="Project Artemis, Your World Depends On It.">
    <meta property="og:description" content="Home of the most clever Discord bot.">
    <meta property="og:image" content="https://artemis.rest/img.d/back.d/homeBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
    <meta property="twitter:description" content="Home of the most clever Discord bot.">
    <meta property="twitter:image" content="https://artemis.rest/img.d/back.d/homeBack.png">
    
    <!-- Favicon, icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="https://artemis.rest/img.d/fav.d/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://artemis.rest/img.d/fav.d/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://artemis.rest/img.d/fav.d/favicon-16x16.png" />
    <link rel="manifest" href="https://artemis.rest/img.d/fav.d/site.webmanifest" />
    <link rel="mask-icon" href="https://artemis.rest/img.d/fav.d/safari-pinned-tab.svg" color="#00FF00" />
    <meta name="msapplication-TileColor" content="#00FF00" />
    <meta name="theme-color" content="#00FF00" />
    
    <!-- Stylesheet -->
    <link rel="stylesheet" href="https://artemis.rest/img.d/styleSheet.css" />
    
    <!-- Title -->
    <title>Project Artemis, Your World Depends On It.</title>
  </head>
  
  <body>
    <!-- Background holder -->
    <div class="backgroundHold">
      <!-- Background pattern -->
      <div class="backgroundPatt"></div>
      
      <!-- Background wallpaper -->
      <div class="backgroundWall" style="background: url('https://artemis.rest/img.d/back.d/1.png') no-repeat center / cover;"></div>
      
      <!-- Background vignette -->
      <div class="backgroundVig"></div>
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="contentPane">
        <div class="cPaneMain" style="background: url('https://artemis.rest/img.d/tree.d/3.png') no-repeat bottom right; background-size: contain;">
          <div class="wrapMainPanes">
            <?php echo $loginField ?>
            <a href="https://artemis.rest/projects.php" style="background-color: rgba(255, 0, 0, 0.1);"><div class="imgBut" style="background-image: url('https://artemis.rest/img.d/icon.d/project.svg');"/>projects</div></a>
            <a href="https://artemis.rest/board.php" style="background-color: rgba(0, 0, 255, 0.1);"><div class="imgBut" style="background-image: url('https://artemis.rest/img.d/icon.d/board.svg');"/>board</div></a>
            <a class="statPane" style="background-color: rgba(0, 255, 255, 0.1); display: flex;">
              <?php
                $getJson = file_get_contents('https://artemis.rest/getInfoOut.json');
                $decodeFetched = json_decode($getJson);
                echo '<p class="statBlock" style="background: -webkit-linear-gradient(transparent calc(100% - '.$decodeFetched->cpuUse.'%), rgba(0, 255, 255, 0.5) 100%); background: -moz-linear-gradient(transparent calc(100% - '.$decodeFetched->cpuUse.'%), rgba(0, 255, 255, 0.5) 100%); background: -o-linear-gradient(transparent calc(100% - '.$decodeFetched->cpuUse.'%), rgba(0, 255, 255, 0.5) 100%); background: -ms-linear-gradient(transparent calc(100% - '.$decodeFetched->cpuUse.'%), rgba(0, 255, 255, 0.5) 100%); background: linear-gradient(transparent calc(100% - '.$decodeFetched->cpuUse.'%), rgba(0, 255, 255, 0.5) 100%);">
                        CPU<br />
                        '.$decodeFetched->cpuUse.'%
                      </p>';
                echo '<p class="statBlock" style="background: -webkit-linear-gradient(transparent calc(100% - '.$decodeFetched->memUsePerc.'%), rgba(255, 255, 0, 0.5) 100%); background: -moz-linear-gradient(transparent calc(100% - '.$decodeFetched->memUsePerc.'%), rgba(255, 255, 0, 0.5) 100%); background: -o-linear-gradient(transparent calc(100% - '.$decodeFetched->memUsePerc.'%), rgba(255, 255, 0, 0.5) 100%); background: -ms-linear-gradient(transparent calc(100% - '.$decodeFetched->memUsePerc.'%), rgba(255, 255, 0, 0.5) 100%); background: linear-gradient(transparent calc(100% - '.$decodeFetched->memUsePerc.'%), rgba(255, 255, 0, 0.5) 100%);">
                        Memory<br />
                        '.$decodeFetched->memUsePerc.'%
                      </p>';
                echo '<p class="statBlock" style="background: -webkit-linear-gradient(transparent calc(100% - '.$decodeFetched->diskUse.'), rgba(255, 0, 255, 0.5) 100%); background: -moz-linear-gradient(transparent calc(100% - '.$decodeFetched->diskUse.'), rgba(255, 0, 255, 0.5) 100%); background: -o-linear-gradient(transparent calc(100% - '.$decodeFetched->diskUse.'), rgba(255, 0, 255, 0.5) 100%); background: -ms-linear-gradient(transparent calc(100% - '.$decodeFetched->diskUse.'), rgba(255, 0, 255, 0.5) 100%); background: linear-gradient(transparent calc(100% - '.$decodeFetched->diskUse.'), rgba(255, 0, 255, 0.5) 100%);">
                        Disk<br />
                        '.$decodeFetched->diskUse.'
                      </p>';
                echo '<p class="statBlockTwo" style="text-align: left;background: -webkit-linear-gradient(transparent calc(100% - 100%), rgba(255, 255, 255, 0.5) 100%); background: -moz-linear-gradient(transparent calc(100% - 100%), rgba(255, 255, 255, 0.5) 100%); background: -o-linear-gradient(transparent calc(100% - 100%), rgba(255, 255, 255, 0.5) 100%); background: -ms-linear-gradient(transparent calc(100% - 100%), rgba(255, 255, 255, 0.5) 100%); background: linear-gradient(transparent calc(100% - 100%), rgba(255, 255, 255, 0.5) 100%);">
                        Total ram: '.$decodeFetched->totMem.'Mb<br />
                        In-use ram: '.$decodeFetched->usedMem.'Mb<br />
                        Free ram: '.$decodeFetched->freeMem.'Mb<br />
                        System uptime: '.$decodeFetched->upTime.'<br />
                        System OS: '.$decodeFetched->fetchSpec.'<br />
                        Web server: '.$_SERVER['SERVER_SOFTWARE'].'<br />
                        <br /><br />This site uses a single cookie
                      </p>';
              ?>
            </a>
            <a href="https://artemis.rest/invite.php" style="background-color: rgba(255, 255, 0, 0.1);"><div class="imgBut" style="background-image: url('https://artemis.rest/img.d/icon.d/invite.svg');"/>invite</div></a>
            <a href="https://artemis.rest/docs.php" style="background-color: rgba(0, 255, 0, 0.1);"><div class="imgBut" style="background-image: url('https://artemis.rest/img.d/icon.d/docs.svg');"/>docs</div></a>
            <a href="https://artemis.rest/contact.php" style="background-color: rgba(255, 0, 255, 0.1);"><div class="imgBut" style="background-image: url('https://artemis.rest/img.d/icon.d/contact.svg');"/>contact</div></a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scripts -->
    <?php include './eyes.php'; ?>
  </body>
</html>
