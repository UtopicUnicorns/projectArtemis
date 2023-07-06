<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Data -->
    <meta charset="utf-8" />
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Invitation">
    <meta name="description" content="Invite the Discord bot.">
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
    <meta property="og:title" content="Invitation">
    <meta property="og:description" content="Invite the Discord bot.">
    <meta property="og:image" content="https://artemis.rest/img.d/homeBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Invitation">
    <meta property="twitter:description" content="Invite the Discord bot.">
    <meta property="twitter:image" content="https://artemis.rest/img.d/homeBack.png">
    
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
    <title>Invitation</title>
  </head>
  
  <body>
    <!-- Background holder -->
    <div class="backgroundHold">
      <!-- Background pattern -->
      <div class="backgroundPatt"></div>
      
      <!-- Background wallpaper -->
      <div class="backgroundWall" style="background: url('https://artemis.rest/img.d/cForestThree.png') no-repeat center / cover;"></div>
      
      <!-- Background vignette -->
      <div class="backgroundVig"></div>
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="contentPane" style="background: url('https://artemis.rest/img.d/tree4t.png') no-repeat bottom right; background-size: 95vh;">
        <div class="cPaneTop">
          <a href="index.php" style="width: 10vh; height: 10vh; background: url('https://artemis.rest/img.d/home.png') no-repeat center / contain;"><img style="width: 10vh; height: 10vh; opacity: 0;" /></a>
          <div style="display: flex; filter: grayscale(0%);">
            / <a href="index.php">home</a> / <a href="invite.php" style="text-decoration: underline;">here</a>
          </div>
          <div style="font-size: 3em; place-items: center end; padding-right: 1vh;">Invitation</div>
        </div>
        <div class="cPaneMain">
          <a class="conPane" href="https://discord.com/api/oauth2/authorize?client_id=440892659264126997&permissions=8&scope=applications.commands%20bot" style="background: url('https://artemis.rest/img.d/2.png') no-repeat center bottom; background-size: 20vh; width: 100%; height: 80vh; margin: 0;">
          <h1>Click to invite bot</h1>
          </a>
          <br />
        </div>
      </div>
    </div>
    
    <!-- Scripts -->
    <?php include './eyes.php'; ?>
    <script>
      const backgroundPatt = document.querySelector('.backgroundPatt');
      const backgroundWall = document.querySelector('.backgroundWall');
      const contentPane = document.querySelector('.contentPane');
      const contentListen = document.querySelector('body');
      const windowWidth = window.innerWidth / 2;
      const windowHeight = window.innerHeight / 2;
      
      contentListen.addEventListener('mousemove', e => {
        const mouseX = e.clientX / windowWidth;
        const mouseY = e.clientY / windowHeight;
        
        //contentPane.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0)`;
        backgroundPatt.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0)`;
        backgroundWall.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
      });
    </script>
  </body>
</html>
