<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"><!-- standard characterset -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- standard viewport -->
    <title>Error</title><!-- set title -->
    <link rel="shortcut icon" type="image/jpg" href="https://artemis.rest/include.d/icon.d/favicon.png"/> <!-- favicon icon -->
    <link rel="stylesheet" href="https://artemis.rest/include.d/primary.css"><!-- load css -->
    <link rel="stylesheet" href="https://artemis.rest/include.d/secondary.css"><!-- phone css -->
  </head>
  <body>
    <div class="eHold bgImage" style="background: center / cover no-repeat url('https://artemis.rest/include.d/back.d/3.jpg');"></div><!-- image background -->
    <div class="eHold bgPattern"></div><!-- pattern background -->
    <div class="eHold bgGradient"></div><!-- gradient background -->
    
    <div class="eHold oPanes"><!-- main panes -->
      <div class="oOne oPane" draggable="true" style="background-color: rgba(0, 255, 0, 0.1); display: grid; place-items: center;"><!-- main pane one -->
        <div class="mContent" style="display: grid; place-items: center; height: auto;"><!-- main content -->
          <div class="mHead" style="background-color: rgba(0,255,255,0.1); height: 10vh;">This page does not exist</div><!-- main header -->
          <p class="mType"><!-- main text -->
            The requested page: <a class="fileLink" style="text-decoration: underline;"><?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?></a><br />
          is not available or not for your eyes.<br />
          Recheck if the link you clicked should lead to somewhere else.<br /><br />
          Your options for what to do now:
          <ul class="mUl">
            <li><a class="fileLink" href="javascript:history.go(-1)">Go to the previous page</a></li>
            <li><a class="fileLink" href="https://artemis.rest">Go back to the homepage</a></li>
          </ul>
          </p></br>
          
          
        </div>
      </div>
    </div>
    
    <script src="https://artemis.rest/include.d/secondary.js"></script><!-- load javascript -->
  </body>
</html>

