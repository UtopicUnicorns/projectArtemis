<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Data -->
    <meta charset="utf-8" />
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Contact">
    <meta name="description" content="Contact information.">
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
    <meta property="og:title" content="Contact">
    <meta property="og:description" content="Contact information.">
    <meta property="og:image" content="https://artemis.rest/img.d/homeBack.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://artemis.rest/">
    <meta property="twitter:title" content="Contact">
    <meta property="twitter:description" content="Contact information.">
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
    <title>Contact</title>
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
            / <a href="index.php">home</a> / <a href="contact.php" style="text-decoration: underline;">here</a>
          </div>
          <div style="font-size: 3em; place-items: center end; padding-right: 1vh;">Contact</div>
        </div>
        <div class="cPaneMain">
          <!-- stat panes -->
        <div class="conPaneHold">
          <a href="https://www.paypal.com/donate/?hosted_button_id=ULQ8N32CLXK4L" target="_blank" class="conPane" style="background: url('https://artemis.rest/img.d/paypal.svg') no-repeat bottom center / contain;">
            <div class="tooltip">Donate &#x1F6C8;
              <span class="tooltiptext" style="float:left;">Using Paypal to donate.<br />No refunds.</span>
            </div>
          </a>
          <a href="mailto:dorrestijn.r@gmail.com" target="_blank" class="conPane" style="background: url('https://artemis.rest/img.d/user.svg') no-repeat bottom center / contain;">
            <div class="tooltip">Send me an email &#x1F6C8;
              <span class="tooltiptext" style="float:left;">Don't spam plox.</span>
            </div>
          </a>
          
        </div>
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
