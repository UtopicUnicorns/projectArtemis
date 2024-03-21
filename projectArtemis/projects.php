<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"><!-- standard characterset -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- standard viewport -->
    <title>Projects</title><!-- set title -->
    <link rel="shortcut icon" type="image/jpg" href="./include.d/icon.d/favicon.png"/> <!-- favicon icon -->
    <link rel="stylesheet" href="./include.d/primary.css"><!-- load css -->
    <link rel="stylesheet" href="./include.d/secondary.css"><!-- phone css -->
  </head>
  <body>
    <div class="eHold bgImage" style="background: center / cover no-repeat url('./include.d/back.d/4.jpg');"></div><!-- image background -->
    <div class="eHold bgPattern"></div><!-- pattern background -->
    <div class="eHold bgGradient"></div><!-- gradient background -->
    
    <div class="eHold dPanes"><!-- main panes -->
      <div class="dpOne dPane" id="contentTarget" draggable="true" style="background-color: rgba(0, 255, 0, 0.1)"><!-- main pane one -->
        <div class="mContent"><!-- main content -->
          <!---->
        </div>
      </div>
      <div class="dpTwo dPane" draggable="true" style="background-color: rgba(255, 255, 0, 0.1)"><!-- main pane two -->
        <!---->
      </div>
      <div class="dpThree dPane" draggable="true" style="background-color: rgba(0, 255, 255, 0.1)"><!-- main pane three -->
        <div class="cmP"><!-- controls pane -->
          <div class="cO dPane" draggable="true" style="background-color: rgba(255, 255, 0, 0.1)"><a id="zoomIn" class="pLink" style="display: grid; place-items: center; width: 100%; height: 100%; background: center / 50% no-repeat url('./include.d/icon.d/zoomIn.svg');">zoom in</a></div><!-- Zoomin button -->
          <div class="cT dPane" draggable="true" style="background-color: rgba(255, 0, 255, 0.1)"><a id="zoomOut" class="pLink" style="display: grid; place-items: center; width: 100%; height: 100%; background: center / 50% no-repeat url('./include.d/icon.d/zoomOut.svg');">zoom out</a></div><!-- Zoomout button -->
          <div class="cTh dPane" draggable="true" style="background-color: rgba(0, 255, 255, 0.1)"><a id="dimLights" class="pLink" style="display: grid; place-items: center; width: 100%; height: 100%; background: center / 50% no-repeat url('./include.d/icon.d/light.svg');">lights</a></div><!-- Dim lights -->
          <div class="cF dPane" draggable="true" style="background-color: rgba(255, 0, 0, 0.1)"><a href="./index.php" class="pLink" style="display: grid; place-items: center; width: 100%; height: 100%; background: center / 50% no-repeat url('./include.d/icon.d/home.svg');">home</a></div><!-- back home -->
        </div>
      </div>
    </div>
    
    <script src="./include.d/secondary.js"></script><!-- load javascript -->
  </body>
</html>

