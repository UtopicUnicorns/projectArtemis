<?php
  include './login.d/board.d.php';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Data -->
    <meta charset="utf-8" />
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Leaderboard">
    <meta name="description" content="Guild leaderboards.">
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
    <meta property="og:title" content="Leaderboard">
    <meta property="og:description" content="Guild leaderboards.">
    <meta property="og:image" content="https://artemis.rest/img.d/back.d/homeBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Leaderboard">
    <meta property="twitter:description" content="Guild leaderboards.">
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
    <title>Leaderboard</title>
  </head>
  
  <body>
    <!-- Background holder -->
    <div class="backgroundHold">
      <!-- Background pattern -->
      <div class="backgroundPatt"></div>
      
      <!-- Background wallpaper -->
      <div class="backgroundWall" style="background: url('https://artemis.rest/img.d/back.d/6.png') no-repeat center / cover;"></div>
      
      <!-- Background vignette -->
      <div class="backgroundVig"></div>
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="contentPane">
        <div class="cPaneMain" style="background: url('https://artemis.rest/img.d/tree.d/3.png') no-repeat bottom right; background-size: contain;">
          <div class="wrapSecondPanes">
            <a class="contentBoxed" style="background-color: rgba(255, 0, 0, 0.1);"><?php echo $hugeDong ?></a>
            <?php echo $smollDong ?>
            
            <a class="secondPane" style="background-color: rgba(255, 0, 0, 0.1);"></a>
            <a class="secondPane" style="background-color: rgba(0, 255, 0, 0.1);"></a>
            <a class="secondPane" style="background-color: rgba(0, 0, 255, 0.1);"></a>
            <a class="secondPane" style="background-color: rgba(0, 255, 255, 0.1);"></a>
            <a class="secondPane" style="background-color: rgba(255, 0, 255, 0.1);"></a>
            <a href="https://artemis.rest/index.php" class="secondPane" style="background-color: rgba(255, 255, 255, 0.1);">home</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scripts -->
    <?php include './eyes.php'; ?>
  </body>
</html>
