<?php
  if($sharedGuildsArray[$_GET["guild"]]) {
    include './panel.d/guildDatabaseGet.php';
    $rightContent =  '<button class="guildStreamerCog" style="font-size: 2rem;">
                        Add Streamer
                      </button>
                      <button class="guildStreamerCog">
                        Insert Streamer Name<br>
                        <input type="text" class="guildSettingsSelecting" id="fname" name="fname" value="John">
                      </button>';    
    $leftContent = '<button class="guildStreamerCog" style="font-size: 2rem;">
                      Current Streamers
                    </button>
                    ';
    foreach($testTableFour as $streamerSelect) {
      $leftContent .= '<button class="guildStreamerCog">
                        <table>
                          <tr>
                            <td>
                              <table>
                                <tr>
                                  <td style="font-size: 1.5rem;">
                                    '.$streamerSelect['id'].'
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="https://www.twitch.tv/'.$streamerSelect['id'].'" target="_blank">Streamer Page</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td>
                              <input type="button" class="guildStreamerDelete" onclick="deleteStreamer(`'.$streamerSelect['id'].'`)" value="">
                            </td>
                          </tr>
                        </table>
                      </button>';
    }
    if($sharedGuildsArray[$_GET["guild"]]["icon"]) $guildAvatar = 'https://cdn.discordapp.com/icons/' . $sharedGuildsArray[$_GET["guild"]]["id"] . '/' .  $sharedGuildsArray[$_GET["guild"]]["icon"] . '.png?size=2048';
    if(!$sharedGuildsArray[$_GET["guild"]]["id"]) $guildAvatar = './images/icons/user.svg';
    
    $guildBanner = './images/backgrounds/2.png';
    
    $siteContext = '<div style="width: 100%; height: 25%; background-size: cover; background-repeat: no-repeat; overflow: hidden; background-position: center; background-image: url(\'' . $guildBanner . '\'); display: flex; place-items: center left;">
                      <img src="' . $guildAvatar . '" style="height: 25vh; border-radius: 500px; margin-left: 50px; box-shadow: 5px 5px 2px black;" /><h1 style="margin-left: 20px;" id="nameInUserPanel"> ' . $sharedGuildsArray[$_GET["guild"]]["name"] . '<br />' . $sharedGuildsArray[$_GET["guild"]]["id"] . '</h1>
                    </div>
                    <div style="width: 100%; height: 65%; background-color: rgba(255, 255, 255, 0.5); display: flex; place-items: center;">
                      <form id="guildSettings" action="?">
                        <input type="hidden" id="page" name="page" value="guildSettings">
                        <input type="hidden" id="guild" name="guild" value="' . $sharedGuildsArray[$_GET["guild"]]["id"] . '">
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
                      function deleteStreamer(val) {
                        if (confirm(`Are you sure you want to remove ${val}?`)) {
                          alert(`Removed ${val}.`);
                        }
                      }
                      function submitButton() {
                        document.getElementById("showSubmit").style.width = "100px";
                        document.getElementById("showSubmit").style.height = "100px";
                        document.getElementById("showSubmit").style.opacity = "1";
                      }
                    </script>';
  } else {
    echo '<script type="text/javascript"> window.location = "https://artemis.rest/panel.php"; </script>';
  }
?>
