<?php
  session_start();
  include './login.d/flow.d.php';
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
    <meta property="og:image" content="https://artemis.rest/img.d/homeBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Project Artemis, Your World Depends On It.">
    <meta property="twitter:description" content="Home of the most clever Discord bot.">
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
    <title>Project Artemis, Your World Depends On It.</title>
  </head>
  
  <body>
    <!-- Background holder -->
    <div class="backgroundHold">
      <!-- Background pattern -->
      <div class="backgroundPatt"></div>
      
      <!-- Background wallpaper -->
      <div class="backgroundWall" style="background: url('https://artemis.rest/img.d/cForestTwo.png') no-repeat center / cover;"></div>
      
      <!-- Background vignette -->
      <div class="backgroundVig"></div>
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="contentPane">
        <div class="cPaneMain" style="background: url('https://artemis.rest/img.d/tree5.png') no-repeat bottom right; background-size: contain;">
          <div class="wrapMainPanes">
            <a style="background: url('https://artemis.rest/img.d/logo.png') no-repeat center; background-size: contain;"></a>
            <a href="https://discord.com/api/v10/oauth2/authorize?client_id=440892659264126997&redirect_uri=https%3A%2F%2Fartemis.rest%2F&response_type=code&scope=identify%20guilds%20guilds.members.read" class="mainPane" style="background-color: rgba(255, 255, 255, 0.1); background: url('https://artemis.rest/img.d/user.svg') bottom left / cover;">login</a>
            <a href="projects.php" class="mainPane" style="background-color: rgba(255, 0, 0, 0.1);">projects</a>
            <a href="about.php" class="mainPane" style="background-color: rgba(0, 0, 255, 0.1);">about</a>
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
                        
                      </p>';
              ?>
            </a>
            <a href="invite.php" class="mainPane" style="background-color: rgba(255, 255, 0, 0.1);">invite</a>
            <a href="docs.php" class="mainPane" style="background-color: rgba(0, 255, 0, 0.1);">docs</a>
            <a href="contact.php" class="mainPane" style="background-color: rgba(255, 0, 255, 0.1);">contact</a>
          </div>
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
        
        contentPane.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0)`;
        backgroundPatt.style.transform = `translate3d(-${mouseY}%, -${mouseX}%, 0)`;
        backgroundWall.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
      });
  
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
        if(siteText == 'gitArtemis') linkTo = 'https://github.com/UtopicUnicorns/projectArtemis';
        if(siteText == 'gitArrow') linkTo = 'https://github.com/UtopicUnicorns/projectArrow';
        if(siteText == 'gitBow') linkTo = 'https://github.com/UtopicUnicorns/projectBow';
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
