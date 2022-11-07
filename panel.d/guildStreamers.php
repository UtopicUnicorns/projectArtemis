<?php
  foreach ($guildsWeShare as $guildLoop) {
    if ($_GET["guild"] == $guildLoop->id) {
      $permInt = $guildLoop->permissions;
      $needPerm = 1 << 5;
      $calcPerm = $permInt & $needPerm;
      if($calcPerm == $needPerm) {
        include './panel.d/guildDatabaseGet.php';
        
        $leftContent .=  '
                          <button class="guildStreamerCog" style="font-size: 2rem;">
                            Current Streamers
                          </button>
                          
                          <button class="guildStreamerCog">
                            <table>
                              <tr>
                                <td>
                                  <table>
                                    <tr>
                                      <td style="font-size: 1.5rem;">streamer name</td>
                                    </tr>
                                    <tr>
                                      <td>link</td>
                                    </td>
                                  </table>
                                </td>
                                <td>
                                  <input type="button" class="guildStreamerDelete" onclick="alert(\'Hello World!\')" value="">
                                </td>
                              </tr>
                            </table>
                          </button>
                        ';
        $rightContent = '<button class="guildStreamerCog" style="font-size: 2rem;">
                          Add Streamer
                         </button>
                        
                        <button class="guildStreamerCog">
                          Insert Streamer Name<br>
                          <input type="text" class="guildSettingsSelecting" id="fname" name="fname" value="John">
                        </button>
                        ';  
        
      
      
        if($guildLoop->icon) {
            $guildAvatar = 'https://cdn.discordapp.com/icons/' . $guildLoop->id . '/' .  $guildLoop->icon. '.png?size=256';
          } else {
            $guildAvatar = './images/icons/user.svg';
          }
          
        $guildBanner = './images/backgrounds/2.png';
          
        if($guildLoop->owner == true) {
            $ownedGuild =  '<div style="background-color: rgba(255, 255, 255, 0.7); transform: rotate(45deg); position: relative; top: 0px; right: 0px; display: grid; place-items: center; height: 20%; width: 100%;">
                              <a id="nameInUserPanel">YOUR GUILD</a>
                            </div>';
          } else {
            $ownedGuild = '';
          }
          
        $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                          <img src="' . $guildAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $guildLoop->name . '<br />' . $guildLoop->id . '</h1>
                          '. $ownedGuild .'
                        </div>
                        <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: flex; place-items: center;">
                          <form id="guildSettings" action="?">
                            <input type="hidden" id="page" name="page" value="guildSettings">
                            <input type="hidden" id="guild" name="guild" value="' . $guildLoop->id . '">
                          </form>
                          <div style="width: 50%; height: 100%; overflow: auto;">' .  $leftContent .  '</div>
                          <div style="width: 50%; height: 100%; overflow: auto;">' .  $rightContent .  '</div>
                          <div class="showSubmit" id="showSubmit">
                            <input form="guildSettings" class="submitButtonChannelView" type="submit" value="">
                          </div>
                        </div>
                        <div style="width: 100%; height: 10%; background-size: cover; background-repeat: no-repeat; background-position: center; background-image: url(\'./images/assets/project_artemis_background.svg\'); background-color: rgba(255, 255, 255, 0.7); display: grid; place-items: center;">
                          <!--Just a footer-->
                        </div>
                        <script type="text/javascript">
                            function submitButton() {
                              document.getElementById("showSubmit").style.width = "100px";
                              document.getElementById("showSubmit").style.height = "100px";
                              document.getElementById("showSubmit").style.opacity = "1";
                            }
                        </script>';
      } else {
        echo '<script type="text/javascript">
                window.location = "https://artemis.rest/panel.php";
              </script>';
      }
    }
  }
?>
