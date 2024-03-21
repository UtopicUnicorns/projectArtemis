<?php 
  if(isset($_GET["page"])) {
    $urlMe = $_GET["page"];
  } else {
    $urlMe = "./code.d/readme.md";
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"><!-- standard characterset -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- standard viewport -->
    <title>Documentation</title><!-- set title -->
    <link rel="shortcut icon" type="image/jpg" href="./include.d/icon.d/favicon.png"/> <!-- favicon icon -->
    <link rel="stylesheet" href="./include.d/primary.css"><!-- load css -->
    <link rel="stylesheet" href="./include.d/secondary.css"><!-- phone css -->
    <link href="./include.d/prism.css" rel="stylesheet" /><!-- prism sheet -->
  </head>
  <body>
    <div class="eHold bgImage" style="background: center / cover no-repeat url('./include.d/back.d/2.jpg');"></div><!-- image background -->
    <div class="eHold bgPattern"></div><!-- pattern background -->
    <div class="eHold bgGradient"></div><!-- gradient background -->
    
    <div class="eHold dPanes"><!-- main panes -->
      <div class="dpOne dPane" id="contentTarget" draggable="false" style="background-color: rgba(0, 255, 0, 0.1)"><!-- main pane one -->
        <pre class="line-numbers" data-src="<?php echo $urlMe ?>" id="codeBlock" style="min-width: 70vw; min-height: 100vh;"></pre> <!-- load code -->
      </div>
      <div class="dpTwo dPane" draggable="true" style="background-color: rgba(255, 255, 0, 0.1)"><!-- main pane two -->
        <div class="mContent"><!-- main content -->
          <?php
            function show_files($start) {
              $contents = scandir($start);
              array_splice($contents, 0,2);
              
              foreach ( $contents as $item ) {
                if ( is_dir("$start/$item") && (substr($item, 0,1) != '.') ) {
                  echo "<details open><summary>📁$item</summary><ul class=\"filePane\">";
                  show_files("$start/$item");
                  echo "</ul></details>";
                } else {
                  if("$start/$item" == $_GET["page"]) {
                    echo "<li><a class=\"fileLink\" style=\"color: rgba(0, 255, 255, 1); padding-left: 20px;\" href=\"docs.php?page=$start/$item\">📋$item</a></li>";
                  } else {
                    echo "<li><a class=\"fileLink\" href=\"docs.php?page=$start/$item\">📋$item</a></li>";
                  }

                }
              }
              
            }

            show_files('./code.d');
          ?>
         </div>
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
    <script src="./include.d/prism.js"></script><!-- load prism -->
  </body>
</html>

